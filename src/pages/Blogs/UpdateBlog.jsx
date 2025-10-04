import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";

export default function UpdateBlog({ row, onUpdate, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(row?.title || "");
  const [subHeading, setSubHeading] = useState(row?.subHeading || "");
  const [content, setContent] = useState(row?.content || "");
  const [tags, setTags] = useState((row?.tags || []).join(", "));
  const [author, setAuthor] = useState(row?.author || "");
  const [isPublished, setIsPublished] = useState(!!row?.isPublished);
  const [imageFile, setImageFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(row?.title || "");
      setSubHeading(row?.subHeading || "");
      setContent(row?.content || "");
      setTags((row?.tags || []).join(", "));
      setAuthor(row?.author || "");
      setIsPublished(!!row?.isPublished);
      setImageFile(null);
      setErr("");
    }
  }, [open, row]);

  const submit = async () => {
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
        fd.append("content", content);
        fd.append("author", author.trim());
        fd.append("isPublished", String(isPublished));
        fd.append("tags", JSON.stringify(tagsArr));
        fd.append("image", imageFile);
        await onUpdate(row?._id, fd, true);
      } else {
        await onUpdate(
          row?._id,
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

      setOpen(false);
      onRefresh?.();
    } catch (e) {
      toast.error(e?.message || "Failed to update blog");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        className="px-2 py-1 rounded border text-sm hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center  p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="font-semibold">Update Blog</h3>
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

              <div>
                <label className="text-sm font-medium">
                  Content (Rich Text)
                </label>

                <ReactQuill
                  className="min-h-40"
                  value={content}
                  onChange={setContent}
                />
                {/* <textarea
                  className="mt-1 w-full border p-2 rounded outline-none min-h-40"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                /> */}
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
                  <label className="text-sm font-medium">Tags</label>
                  <input
                    className="mt-1 w-full border p-2 rounded outline-none"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="tag1, tag2"
                  />
                </div>
                <label className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <span>Published</span>
                </label>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Replace Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 w-full border p-2 rounded"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
