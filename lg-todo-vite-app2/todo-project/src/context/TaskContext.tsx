import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

export type Task = {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
};

type Action =
  | { type: "ADD_TASK"; payload: Omit<Task, "id"> } //C
  | { type: "TOGGLE_TASK"; payload: number } //U
  | { type: "SET_FILTER"; payload: State["filter"] } //TODO
  | { type: "SET_TASKS"; payload: Task[] } //R
  | { type: "DELETE_TASK"; payload: number } //D
  | { type: "UPDATE_TASK"; payload: Task }; //U

const initialState: State = {
  tasks: [],
  filter: "all",
};

//Reducer
function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TASKS": //R
      return { ...state, tasks: action.payload };
    case "ADD_TASK": //C
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "TOGGLE_TASK": //U
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "UPDATE_TASK": //U
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TASK": //D
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const TaskContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within TaskProvider");
  return context;
}
