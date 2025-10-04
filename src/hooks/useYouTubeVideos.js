import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import fetchData from "../utils/fetchData";
import postData from "../utils/postData";
import patchData from "../utils/patchData";
import toast from "react-hot-toast";
import apiurl from "../apiurl/apiurl";

function getVideoIdFromUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    const v = u.searchParams.get("v");
    if (v) return v;
    const paths = u.pathname.split("/").filter(Boolean);
    if ((paths[0] === "shorts" || paths[0] === "embed") && paths[1])
      return paths[1];
    return "";
  } catch {
    return "";
  }
}

function toThumb(videoId) {
  return videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : undefined;
}

export default function useYouTubeVideos(
  searchQuery = "",
  limit = 10,
  page = 1
) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 🔁 রিফেচ ট্রিগার করতে reload কাউন্টার
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let aborted = false;
    const controller = new AbortController();

    async function run() {
      setIsLoading(true);
      const token = Cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      };

      const url = `${apiurl.mainUrl}/youtube?search=${encodeURIComponent(
        searchQuery || ""
      )}&limit=${limit}&page=${page}`;

      try {
        const result = await fetchData(url, config); // আপনার ইউটিল
        if (!aborted) {
          if (result?.success) {
            const rows = (result?.data || []).map((v) => {
              const vid = v.videoId || getVideoIdFromUrl(v.url);
              return {
                ...v,
                videoId: vid,
                thumbnail: v.thumbnail || toThumb(vid),
              };
            });
            setData(rows);
            setPagination(result?.pagination || {});
          } else {
            toast.error(result?.message || "Failed to fetch videos");
          }
        }
      } catch (err) {
        if (!aborted && err.name !== "AbortError") {
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
  }, [searchQuery, limit, page, reload]); // ✅ success-ফ্ল্যাগ নেই

  // CREATE
  const handleVideoCreate = async ({ title, url, description }) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const endpoint = `${apiurl.mainUrl}/youtube`;
    const payload = { title, url, description };

    try {
      const result = await postData(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result?.success) {
        toast.success("Video added successfully");
        setReload((n) => n + 1); // ✅ রিফ্রেশ
      } else {
        toast.error(result?.message || "Failed to add video");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE
  const handleVideoUpdate = async (id, { title, url, description }) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const endpoint = `${apiurl.mainUrl}/youtube/update/${id}`;
    const payload = { id, title, url, description };

    try {
      const result = await patchData(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result?.success) {
        toast.success("Video updated successfully");
        setReload((n) => n + 1); // ✅ রিফ্রেশ
      } else {
        toast.error(result?.message || "Failed to update video");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const handleVideoDelete = async (id) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    const endpoint = `${apiurl.mainUrl}/youtube/delete/${id}`;

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
        toast.success("Video deleted successfully");
        setReload((n) => n + 1); // ✅ রিফ্রেশ
      } else {
        toast.error(result?.message || "Failed to delete video");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // থাম্বনেইল সেফটি
  const withClientThumb = useMemo(
    () =>
      data.map((v) => ({ ...v, thumbnail: v.thumbnail || toThumb(v.videoId) })),
    [data]
  );

  // বাইরে থেকেও রিফ্রেশ দরকার হলে
  const refresh = () => setReload((n) => n + 1);

  return {
    data: withClientThumb,
    isLoading,
    pagination,
    handleVideoCreate,
    handleVideoUpdate,
    handleVideoDelete,
    refresh, // 👈 চাইলে parent থেকে কল করতে পারেন
  };
}
