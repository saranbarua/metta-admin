import { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateBlog({ onCreate, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [content, setContent] = useState(""); // RTE value
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const reset = () => {
    setTitle("");
    setSubHeading("");
    setContent("");
    setTags("");
    setAuthor("");
    setIsPublished(false);
    setImageFile(null);
    setErr("");
    setPreview(null);
  };

  const handleSubmit = async () => {
    setErr("");
    if (!title.trim()) return setErr("Title is required.");
    if (!content.trim()) return setErr("Content is required.");

    try {
      setBusy(true);
      const tagsArr = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      if (imageFile) {
        const fd = new FormData();
        fd.append("title", title.trim());
        fd.append("subHeading", subHeading.trim());
        fd.append("content", content); // RTE html
        fd.append("author", author.trim());
        fd.append("isPublished", String(isPublished));
        fd.append("tags", JSON.stringify(tagsArr));
        fd.append("image", imageFile);
        await onCreate(fd, true);
      } else {
        await onCreate(
          {
            title: title.trim(),
            subHeading: subHeading.trim(),
            content,
            author: author.trim(),
            tags: tagsArr,
            isPublished,
          },
          false
        );
      }

      reset();
      setOpen(false);
      onRefresh?.();
    } catch (e) {
      toast.error(e?.message || "Failed to create blog");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        className="bg-[#1D267D] text-white px-3 py-2 rounded hover:opacity-90"
        onClick={() => setOpen(true)}
      >
        Add Blog
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] pt-20 overflow-auto bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="font-semibold">Create Blog</h3>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3">
              {err && <p className="text-red-600 text-sm">{err}</p>}

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input
                    className="mt-1 w-full border p-2 rounded outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Sub Heading</label>
                  <input
                    className="mt-1 w-full border p-2 rounded outline-none"
                    value={subHeading}
                    onChange={(e) => setSubHeading(e.target.value)}
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-auto">
                <label className="text-sm font-medium">
                  Content (Rich Text)
                </label>
                <ReactQuill value={content} onChange={setContent} />
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium">Author</label>
                  <input
                    className="mt-1 w-full border p-2 rounded outline-none"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Tags (comma separated)
                  </label>
                  <input
                    className="mt-1 w-full border p-2 rounded outline-none"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <label className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <span>Publish</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="text-sm font-medium">
                    Featured Image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-1 w-full border p-2 rounded"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      if (file) {
                        setPreview(URL.createObjectURL(file)); // 👈 প্রিভিউ এর state
                      } else {
                        setPreview(null);
                      }
                    }}
                  />
                </div>

                {/* Preview section */}
                {preview && (
                  <div className="">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-40  object-contain rounded border"
                    />
                  </div>
                )}
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
                onClick={handleSubmit}
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
