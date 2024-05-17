import { defineStore } from "pinia";
import axios from "axios";
import { apiUrl } from "@/main";
import { useOrgStore } from "./organizationStore";
import { useUserStore } from "./userStore";


interface CreateInviteInput {
  userEmail: string;
  organizationId: string;
}

export const useInviteStore = defineStore("invite", () => {
  const orgStore = useOrgStore();
  const userStore = useUserStore();
  async function createInvite({ userEmail, organizationId }: CreateInviteInput) {
    try {
      await axios.post(`${apiUrl}/invite`, {
        // Update the API endpoint for creating invites
        userEmail: userEmail,
        organizationId: organizationId,
      });

      // Assuming API call updates relevant data, refetch user and org details
      await orgStore.getOrg(organizationId);

      console.log("Invite sent successfully");
    } catch (error: any) {
      console.error("Error sending invite:", error);
      throw error;
    }
  }
  async function acceptInvite(id: string) {
    try {
      const resp = await axios.post(`${apiUrl}/invite/accept/${id}`,);

      // Assuming API call updates relevant data, refetch user and org details
      await orgStore.getOrg(resp.data.invite.organizationId);
      await userStore.fetchUserDetailsByEmail(resp.data.invite.userEmail);

      console.log("Invite sent successfully");
    } catch (error: any) {
      console.error("Error sending invite:", error);
      throw error;
    }
  }

  return { createInvite, acceptInvite };
});
