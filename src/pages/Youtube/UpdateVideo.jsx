import { useEffect, useState } from "react";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpdateVideo({ onUpdated, onRefresh, row }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(row?.title || "");
  const [url, setUrl] = useState(row?.url || "");
  const [description, setDescription] = useState(row?.description || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(row?.title || "");
      setUrl(row?.url || "");
      setDescription(row?.description || "");
      setErr("");
    }
  }, [open, row]);

  const submit = async () => {
    setErr("");
    if (!title.trim()) return setErr("Title is required.");
    if (!url.trim() || !/^https?:\/\//.test(url))
      return setErr("Valid YouTube URL is required.");
    try {
      setBusy(true);
      await onUpdated(row?._id, {
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || undefined,
      });
      setOpen(false);
      onRefresh?.();
    } catch (e) {
      setErr(e?.message || "Failed to update.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        className="px-2 py-1 rounded border text-sm hover:bg-gray-50"
        onClick={() => setOpen(true)}
        title="Edit"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="font-semibold">Update Video</h3>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => setOpen(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {err && <p className="text-red-600 text-sm">{err}</p>}
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  className="mt-1 w-full border p-2 rounded outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">YouTube URL</label>
                <input
                  className="mt-1 w-full border p-2 rounded outline-none"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Description (optional)
                </label>
                <textarea
                  className="mt-1 w-full border p-2 rounded outline-none min-h-24"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t p-3">
              <button
                className="px-3 py-2 rounded border"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                disabled={busy}
                className="px-3 py-2 rounded bg-[#1D267D] text-white disabled:opacity-60"
                onClick={submit}
              >
                {busy ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
