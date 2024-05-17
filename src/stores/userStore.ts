import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import type { User } from "@/types/dbTypes";
import { useOrgStore } from "./organizationStore";


export const useUserStore = defineStore("user", () => {
  const orgStore = useOrgStore()
  const dbUser = ref<User | null>(null);

  async function registerNewUser(
    email: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      console.log("we gonna register the new user");
      const { data } = await axios.post(`${apiUrl}/user`, {
        user: {
          name: firstName + " " + lastName,
          email: email,
        },
      });
      dbUser.value = { ...dbUser.value, ...data.user };

      if (data.user.organizationId) {
        await orgStore.getOrg(data.user.organizationId)
      }

      console.log("it completed successfully");
    } catch (error: any) {
      console.error("Error registering user in database:", error);
      throw error;
    }
  }

  async function fetchUserDetailsByEmail(email: string) {
    console.log("I got triggered")
    try {
      console.log("email is", email);
      console.log("I am about to fetch user by email")
      const resp = await axios.get(`${apiUrl}/user/email/${email}`);
      console.log("I fetched user successfully")
      dbUser.value = { ...resp.data.user };
      console.log("we got the user: ", resp.data.user)
      if (resp.data.user.organizationId) {
        await orgStore.getOrg(resp.data.user.organizationId)
      }
      return;
    } catch (error) {
      console.error("Error fetching user details by email:", error);
      throw error;
    }
  }

  async function updateUser(
    {
      id,
      organizationId
    }: {
      id: string,
      organizationId?: string,
    }
  ) {
    try {
      const { data } = await axios.put(`${apiUrl}/user/${id}`, {
        user: {
          organizationId: organizationId
        },
      });
      if (!data) {
        throw "server responed with empty object"
      }
      dbUser.value = { ...dbUser.value, ...data.user };
    } catch (error) {
      console.error("Error fetching user details by email:", error);
      throw error;
    }

  }

  return { dbUser, registerNewUser, fetchUserDetailsByEmail, updateUser };
});
