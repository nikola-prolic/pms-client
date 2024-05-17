import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import { Status, type Project } from "@/types/dbTypes";

interface CreateProjectInput {
  name: string;
  organizationId: string;
  estimatedHours: number;
  deadline: Date;
  projectOwnerId: string;
  stakeHolders: string[];
}

interface UpdateProjectInput {
  id: string;
  name?: string;
  deadline?: Date;
  status?: Status;
  projectOwnerId?: string;
  stakeHolders?: string[];
}

export const useProjectStore = defineStore("project", () => {
  const currentProject = ref<Project | null>(null);
  const projectStatusEnum = ref<Status[]>(Object.values(Status))
  const loading = ref(false);
  const error = ref<string | null>(null);

  // CREATE Project
  async function createProject(projectData: CreateProjectInput) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.post(`${apiUrl}/project`, projectData);
      currentProject.value = data.project;
    } catch (err: any) {
      error.value = err.message;
      console.log("we have a huuuuge error", err)
    } finally {
      loading.value = false;
    }
  }

  // GET Project by ID
  async function getProject(id: string) {
    loading.value = true;
    error.value = null;

    try {
      console.log("I got triggered")
      const { data } = await axios.get(`${apiUrl}/project/${id}`);
      console.log("from ProjectStore | response data is", data)
      currentProject.value = data.project;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // UPDATE Project
  async function updateProject(projectData: UpdateProjectInput) {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put(`${apiUrl}/project/${projectData.id}`, projectData);
      currentProject.value = { ...currentProject.value, ...data.project };
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // DELETE Project
  async function deleteProject(id: string) {
    loading.value = true;
    error.value = null;

    try {
      await axios.delete(`${apiUrl}/project/${id}`);
      currentProject.value = null;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return {
    currentProject,
    loading,
    error,
    createProject,
    projectStatusEnum,
    getProject,
    updateProject,
    deleteProject
  };
});
