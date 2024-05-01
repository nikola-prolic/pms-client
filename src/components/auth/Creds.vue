<template>
  <div class="flex justify-center flex-wrap">
    <div v-if="isSignUp">
      <!-- Sign Up Form -->
      <form
        @submit.prevent="handleSignUp"
        class="flex px-2 flex-wrap space-y-2"
      >
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
        <button
          type="submit"
          class="bg-black text-white capitalize px-4 py-2 w-full"
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
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import auth from "@/utils/firebase";

const email = ref("");
const password = ref("");
const isSignUp = ref(false);

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Redirect or handle login success
  } catch (error) {
    alert(error.message); // Consider a better error handling approach
  }
};

const handleSignUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    // Redirect or handle sign up success
  } catch (error) {
    alert(error.message); // Consider a better error handling approach
  }
};

const toggleForm = () => {
  isSignUp.value = !isSignUp.value;
};
</script>
