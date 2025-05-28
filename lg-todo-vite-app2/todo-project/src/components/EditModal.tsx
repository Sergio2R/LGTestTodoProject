import React from "react";
import type { Task } from "../types/task";

interface EditModalProps {
  editingTask: Task | null;
  editTitle: string;
  setEditTitle: (v: string) => void;
  editDescription: string;
  setEditDescription: (v: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  editingTask,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  onCancel,
  onSave,
}) =>
  editingTask ? (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-gray-100"
          maxLength={15}
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-gray-100"
          maxLength={100}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;

export default EditModal;