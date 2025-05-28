import React from "react";

interface TaskFormProps {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  completed: boolean;
  setCompleted: (v: boolean) => void;
  handleAddTask: (e: React.FormEvent) => void;
  showForm: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  completed,
  setCompleted,
  handleAddTask,
  showForm,
}) => (
  <form
    onSubmit={handleAddTask}
    className={`flex flex-col gap-3 mb-6 w-full max-w-xl border-2 border-blue-400 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-lg p-6
    ${showForm ? "block" : "hidden"} md:block`}
  >
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title"
      required
      maxLength={15}
      className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-gray-100 dark:bg-gray-800"
    />
    <div className="text-right text-xs text-gray-500 mt-1">
      {title.length}/15 characters
    </div>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      maxLength={100}
      className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y min-h-[48px] text-gray-900 dark:text-gray-100 dark:bg-gray-800"
    />
    <div className="text-right text-xs text-gray-500 mt-1">
      {description.length}/100 characters
    </div>
    <div className="flex flex-col md:flex-row items-center gap-3">
      <label className="flex items-center gap-2 px-3 py-2 bg-white rounded border border-gray-300 shadow-sm hover:shadow-md transition cursor-pointer w-full md:w-auto">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-5 h-5 accent-blue-600 rounded focus:ring-2 focus:ring-blue-400 transition cursor-pointer"
        />
        <span className="text-gray-700 font-medium select-none">
          Completed
        </span>
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-10 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 font-semibold flex items-center justify-center gap-2 min-w-[150px] cursor-pointer w-full md:flex-1"
      >
        <span className="text-xl font-bold">+</span>
        Add Task
      </button>
    </div>
  </form>
);

export default TaskForm;