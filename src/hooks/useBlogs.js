import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import patchData from "../utils/patchData";

/**
 * Query params:
 * - search (optional)
 * - published=true|false (optional)
 * - limit, page
 */
export default function useBlogs(
  searchQuery = "",
  limit = 10,
  page = 1,
  published
) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(0); // to refetch safely

  useEffect(() => {
    let aborted = false;
    const controller = new AbortController();

    async function run() {
      setIsLoading(true);
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const qs = new URLSearchParams({
        search: searchQuery || "",
        limit: String(limit),
        page: String(page),
      });
      if (typeof published !== "undefined" && published !== "") {
        qs.set("published", String(published));
      }

      const url = `${apiurl.mainUrl}/blog?${qs.toString()}`;

      try {
        const result = await fetchData(url, {
          headers,
          signal: controller.signal,
        });
        if (!aborted) {
          if (result?.success) {
            setData(result?.data || []);
            setPagination(result?.pagination || {});
          } else {
            toast.error(result?.message || "Failed to fetch blogs");
          }
        }
      } catch (err) {
        if (!aborted && err?.name !== "AbortError") {
          toast.error(err?.message || "An unexpected error occurred");
        }
      } finally {
        if (!aborted) setIsLoading(false);
      }
    }

    run();
    return () => {
      aborted = true;
      controller.abort();
    };
  }, [searchQuery, limit, page, published, reload]);

  // CREATE (supports multipart or JSON depending on hasFile)
  const handleBlogCreate = async (payload, hasFile = false) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const endpoint = `${apiurl.mainUrl}/blog`;

    try {
      let res;
      if (hasFile) {
        // payload is FormData
        res = await fetch(endpoint, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }, // don't set content-type manually
          body: payload,
        });
        const json = await res.json();
        if (res.ok && json?.success) {
          toast.success("Blog created successfully");
          setReload((n) => n + 1);
        } else {
          toast.error(json?.message || "Failed to create blog");
        }
      } else {
        const result = await postData(endpoint, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (result?.success) {
          toast.success("Blog created successfully");
          setReload((n) => n + 1);
        } else {
          toast.error(result?.message || "Failed to create blog");
        }
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE (multipart or JSON)
  const handleBlogUpdate = async (id, payload, hasFile = false) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const endpoint = `${apiurl.mainUrl}/blog/update/${id}`;

    try {
      if (hasFile) {
        const res = await fetch(endpoint, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: payload, // FormData
        });
        const json = await res.json();
        if (res.ok && json?.success) {
          toast.success("Blog updated successfully");
          setReload((n) => n + 1);
        } else {
          toast.error(json?.message || "Failed to update blog");
        }
      } else {
        const result = await patchData(endpoint, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (result?.success) {
          toast.success("Blog updated successfully");
          setReload((n) => n + 1);
        } else {
          toast.error(result?.message || "Failed to update blog");
        }
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const handleBlogDelete = async (id) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const endpoint = `${apiurl.mainUrl}/blog/delete/${id}`;

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (res.ok && result?.success) {
        toast.success("Blog deleted successfully");
        setReload((n) => n + 1);
      } else {
        toast.error(result?.message || "Failed to delete blog");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // small helper to ensure tags is always array of strings
  const rows = useMemo(() => {
    return data.map((b) => ({
      ...b,
      tags: Array.isArray(b?.tags)
        ? b.tags
        : b?.tags
        ? String(b.tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    }));
  }, [data]);

  const refresh = () => setReload((n) => n + 1);

  return {
    data: rows,
    isLoading,
    pagination,
    handleBlogCreate,
    handleBlogUpdate,
    handleBlogDelete,
    refresh,
  };
}
