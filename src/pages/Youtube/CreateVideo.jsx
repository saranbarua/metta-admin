import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CreateVideo({ onCreated, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const reset = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setErr("");
  };

  const submit = async () => {
    setErr("");
    if (!title.trim()) return setErr("Title is required.");
    if (!url.trim() || !/^https?:\/\//.test(url))
      return setErr("Valid YouTube URL is required.");
    try {
      setBusy(true);
      await onCreated({
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || undefined,
      });
      reset();
      setOpen(false);
      onRefresh?.();
    } catch (e) {
      setErr(e?.message || "Failed to create.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        className="bg-[#1D267D] text-white px-3 py-2 mt-2 rounded hover:opacity-90 flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Video
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-lg">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="font-semibold">Add YouTube Video</h3>
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
                  placeholder="e.g., How to use MYTRAMS"
                />
              </div>
              <div>
                <label className="text-sm font-medium">YouTube URL</label>
                <input
                  className="mt-1 w-full border p-2 rounded outline-none"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
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
                  placeholder="Short summary…"
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
                {busy ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
