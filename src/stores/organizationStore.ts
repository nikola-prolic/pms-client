import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import type { Organization } from "@/types/dbTypes";

interface CreateOrgInput {
  orgName: string,
  adminId: string,
}

export const useOrgStore = defineStore("organazition", () => {
  const org = ref<Organization | null>(null);

  async function createOrg({ orgName, adminId }: CreateOrgInput) {
    try {
      const { data } = await axios.post(`${apiUrl}/organization`, {
        user: {
          name: orgName,
          adminId: adminId
        },
      });
      org.value = { ...org.value, ...data.user };


      console.log("it completed successfully");
    } catch (error: any) {
      console.error("Error registering user in database:", error);
      throw error;
    }
  }

  async function getOrg(id: string) {
    try {
      console.log("organizationStore | id is", id);
      const resp = await axios.get(`${apiUrl}/organization/${id}`);
      console.log("organizationStore | resp body is ", resp.data)
      org.value = { ...resp.data.organization };
      return;
    } catch (error) {
      console.error("Error fetching user details by email:", error);
      throw error;
    }
  }

  async function updateOrg(
    {
      id,
      adminId
    }: {
      id: string,
      adminId?: string,
    }
  ) {
    try {
      const { data } = await axios.put(`${apiUrl}/organization/${id}`, {
        user: {
          adminId: adminId
        },
      });
      if (!data) {
        throw "server responed with empty object"
      }
      org.value = { ...org.value, ...data.user };
    } catch (error) {
      console.error("Error fetching user details by email:", error);
      throw error;
    }

  }

  return { org, createOrg, getOrg, updateOrg };
});
