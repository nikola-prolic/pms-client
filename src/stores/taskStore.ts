import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useProjectStore } from "./projectStore";
import { type Task, Status } from "@/types/dbTypes";
import { apiUrl } from "@/main";
import axios from "axios";

interface CreateTaskInput {
  status: String;
  projectId: string;
  name: string;
  estimatedHours: number;
  deadline: Date;
  assignedUserId?: string;
}

interface UpdateTaskInput {
  id: string;
  estimatedHours?: number;
  deadline?: Date;
  assignedUserId?: string;
  status?: Status
}

export const useTaskStore = defineStore("task", () => {
  const projectStore = useProjectStore()
  const { currentProject } = storeToRefs(projectStore)
  const loading = ref(false);
  const error = ref<string | null>(null);
  const taskStatuses = ref<Status[]>(Object.values(Status).filter((s) => {
    return s !== "OVERDUE" && s !== "ON_HOLD" && s !== "CLOSED"
  }))

  async function createTask(taskData: CreateTaskInput) {
    loading.value = true
    if (!currentProject || !currentProject.value?.id) {
      error.value = "No Project Id was provided"
      loading.value = false
      return
    }
    try {
      const newTask = {
        ...taskData,
        projectId: currentProject.value.id,
      };
      await axios.post(`${apiUrl}/task`, newTask)
      await projectStore.getProject(currentProject.value.id)
      loading.value = false

    } catch (err: any) {
      error.value = "we couldn't create task"
      console.log("taskStore | we errored creating tasks", err)
    }
  }

  async function updateTask(data: UpdateTaskInput) {
    loading.value = true
    if (!currentProject || !currentProject.value?.id) {
      error.value = "No Project Id was provided"
      loading.value = false
      return
    }
    try {
      await axios.put(`${apiUrl}/task/${data.id}`, data)
      await projectStore.getProject(currentProject.value.id)
    } catch (err) {
      error.value = "we couldn't update task"
      console.log("taskStore | we errored update tasks", err)
    }
  }

  // DELETE Task
  async function deleteTask(id: string) {
    loading.value = true
    if (!currentProject || !currentProject.value?.id) {
      error.value = "No Project Id was provided"
      loading.value = false
      return
    }
    try {
      await axios.delete(`apiUrl/${id}`)
      await projectStore.getProject(currentProject.value.id)
    } catch (err) {
      error.value = "we couldn't delete task"
      console.log("taskStore | we errored deleting tasks", err)
    }
  }

  return { taskStatuses, createTask, updateTask, deleteTask, loading, error };
});
