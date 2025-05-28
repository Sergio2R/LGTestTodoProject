import "./App.css";
import { useTaskContext } from "./context/TaskContext";
import React, { useState, useEffect } from "react";
import * as api from "./api/todoApi";
import type { Task } from "./types/task";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditModal from "./components/EditModal";

function App() {
  // STATES
  const { state, dispatch } = useTaskContext();

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // task states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Dark mode effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // fetch on mount
  useEffect(() => {
    setLoading(true);
    api
      .getTasks()
      .then((res) => {
        dispatch({ type: "SET_TASKS", payload: res.data });
      })
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, [dispatch]);

  // filter by state
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "all") return true;
    if (state.filter === "completed") return task.completed;
    if (state.filter === "pending") return !task.completed;
  });

  // add task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const res = await api.addTask({ title, description, completed });
      dispatch({ type: "ADD_TASK", payload: res.data });
      setTitle("");
      setDescription("");
      setCompleted(false);
    } catch {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  // call update
  const handleToggle = async (task: Task) => {
    setLoading(true);
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await api.updateTask(task.id!, updatedTask);
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...updatedTask, id: task.id! },
      });
    } catch {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // prepare edit modal
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // call edit
  const handleSaveEdit = async () => {
    if (!editingTask) return;
    setLoading(true);
    try {
      await api.updateTask(editingTask.id!, {
        ...editingTask,
        title: editTitle,
        description: editDescription || "",
      });
      dispatch({
        type: "UPDATE_TASK",
        payload: {
          ...editingTask,
          id: editingTask.id!,
          title: editTitle,
          description: editDescription,
        },
      });
      setEditingTask(null);
    } catch {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // call delete
  const handleDelete = async (task: Task) => {
    setLoading(true);
    try {
      if (task.id !== undefined) {
        await api.deleteTask(task.id);
        dispatch({ type: "DELETE_TASK", payload: task.id });
      } else {
        setError("Task ID is undefined. Cannot delete task.");
      }
    } catch {
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8">
      {/* Edit Modal */}
      <EditModal
        editingTask={editingTask}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        onCancel={() => setEditingTask(null)}
        onSave={handleSaveEdit}
      />

      <div className="w-full max-w-xl mx-4 md:mx-auto">
        {loading && <div className="text-blue-600 mb-4">Loading...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}

        {/* Dark TODO*/}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-sm tracking-tight">
            To-Do List
          </h1>
          <p className="text-gray-600 text-center max-w-md block md:hidden">
            Stay productive!
          </p>
          <p className="text-gray-600 text-center max-w-md hidden md:block">
            Organize your tasks efficiently 🗂️. Add ➕, mark as completed ✅,
            and filter 🔍 your 'TODOs' to stay productive! 🚀
          </p>
        </div>

        {/* Show/hide form button (mobile) */}
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="md:hidden mb-4 w-12 h-12 rounded-full bg-green-600 text-white shadow flex items-center justify-center text-3xl hover:bg-blue-700 transition"
          aria-label={showForm ? "Hide Add Task" : "Show Add Task"}
        >
          <span className="font-bold">{showForm ? "−" : "+"}</span>
        </button>

        {/* Add Task Form */}
        <TaskForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          completed={completed}
          setCompleted={setCompleted}
          handleAddTask={handleAddTask}
          showForm={showForm}
        />

        {/* Filter buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}
            className={`px-3 py-1 rounded ${
              state.filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() =>
              dispatch({ type: "SET_FILTER", payload: "completed" })
            }
            className={`px-3 py-1 rounded ${
              state.filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => dispatch({ type: "SET_FILTER", payload: "pending" })}
            className={`px-3 py-1 rounded ${
              state.filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            Pending
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
