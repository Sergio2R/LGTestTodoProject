import React from "react";
import type { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onEdit, onDelete }) => (
  <ul className="w-full max-w-xl space-y-2">
    {tasks.map((task) => (
      <li
        key={task.id}
        className="flex items-center bg-white p-3 rounded shadow border"
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          className="mr-3 accent-blue-600"
        />
        <span
          className={`flex-1 break-all ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          <strong>{task.title}</strong>
          {task.description ? `: ${task.description}` : ""}
        </span>
        <button
          onClick={() => onEdit(task)}
          className="ml-2 text-blue-500 hover:text-blue-700 transition cursor-pointer"
          title="Edit"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task)}
          className="ml-4 text-red-500 hover:text-red-700 transition cursor-pointer"
          title="Delete"
        >
          🗑️
        </button>
      </li>
    ))}
  </ul>
);

export default TaskList;