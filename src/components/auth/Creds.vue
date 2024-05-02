<template>
  <div class="flex justify-center flex-wrap">
    <div v-if="isSignUp">
      <!-- Sign Up Form -->
      <form
        @submit.prevent="handleSignUp"
        class="flex px-2 flex-wrap space-y-2"
      >
        <input
          type="text"
          v-model="firstName"
          placeholder="First Name"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <input
          type="text"
          v-model="lastName"
          placeholder="Last Name"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          :disabled="!passwordsMatch"
          class="bg-black text-white capitalize px-4 py-2 w-full disabled:bg-gray-500 disabled:text-gray-800"
        >
          Sign Up
        </button>
      </form>
    </div>
    <div v-else>
      <!-- Sign In Form -->
      <form @submit.prevent="handleLogin" class="flex px-2 flex-wrap space-y-2">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="w-full border border-black rounded-sm px-4 py-2"
        />
        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="bg-black text-white capitalize px-4 py-2 w-full"
        >
          Sign In
        </button>
      </form>
    </div>
    <button @click="toggleForm" class="mt-4 text-blue-800 text-xs">
      {{ isSignUp ? "Switch to Sign In" : "Switch to Sign Up" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "@/utils/firebase";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSignUp = ref(false);
const errorMessage = ref("");

const passwordsMatch = computed(() => password.value === confirmPassword.value);

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    await userStore.fetchUserDetailsByEmail(email.value);
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const handleSignUp = async () => {
  if (!passwordsMatch.value) {
    alert("Passwords do not match");
    return;
  }
  try {
    const resp = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    );
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const toggleForm = () => {
  isSignUp.value = !isSignUp.value;
};
</script>
