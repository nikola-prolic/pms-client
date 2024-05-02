import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { apiUrl } from "@/main";
import type { User } from "@/types/dbTypes";

export const useUserStore = defineStore("user", () => {
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
      dbUser.value = { ...dbUser.value, ...data.user }; // Update dbUser ref with new data

      console.log("it completed successfully");
    } catch (error: any) {
      console.error("Error registering user in database:", error);
      throw error;
    }
  }

  async function fetchUserDetailsByEmail(email: string) {
    try {
      console.log("email is", email);
      const resp = await axios.get(`${apiUrl}/user/email/${email}`);
      console.log("data from fetching user by email is:", resp);
      dbUser.value = { ...resp.data.user };
      return;
    } catch (error) {
      console.error("Error fetching user details by email:", error);
      throw error;
    }
  }

  return { dbUser, registerNewUser, fetchUserDetailsByEmail };
});
