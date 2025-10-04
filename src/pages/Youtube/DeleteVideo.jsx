import { useState } from "react";
import {
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteVideo({ onDelete, onRefresh, id, title }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const confirm = async () => {
    setErr("");
    try {
      setBusy(true);
      await onDelete(id);
      setOpen(false);
      onRefresh?.();
    } catch (e) {
      setErr(e?.message || "Failed to delete");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        className="px-2 py-1 rounded border text-sm hover:bg-red-50 text-red-600 border-red-200"
        onClick={() => setOpen(true)}
        title="Delete"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-red-500"
              />
              <h3 className="font-semibold">Delete Video?</h3>
            </div>
            <p className="text-sm mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium">“{title}”</span>? This action cannot
              be undone.
            </p>
            {err && <p className="text-sm text-red-600 mt-2">{err}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-2 rounded border"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                disabled={busy}
                className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-60"
                onClick={confirm}
              >
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
