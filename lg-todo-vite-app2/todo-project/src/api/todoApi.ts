import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:8080/api/tasks";//Change this if the API URL is different

//R
export const getTasks = () => axios.get(API_URL);

//C
export const addTask = (task: Omit<Task, "id">) => axios.post<Task>(API_URL, task);
interface TaskUpdates {
    title?: string;
    description?: string;
    completed?: boolean;
}

//U
export const updateTask = (id: number, updates: TaskUpdates) => axios.put<Task>(`${API_URL}/${id}`, updates);

//D
export const deleteTask = (id: number): Promise<import("axios").AxiosResponse<void>> => axios.delete<void>(`${API_URL}/${id}`);
