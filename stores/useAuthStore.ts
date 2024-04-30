import { defineStore } from "pinia";

import { useApiFetch } from "~/composables/useApiFetch";

type User = {
  id: number;
  name: string;
  email: string;
};

type UserCredentials = {
  email: string;
  password: string;
};

type UserRegistration = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  async function logout() {
    await useApiFetch("/api/logout", { method: "POST" });
    user.value = null;
    navigateTo("/login");
  }

  // async function fetchUser() {
  //     const { data }
  // }

  async function loginUser(credentials: UserCredentials) {

    const data = await useApiFetch("/api/login", {
      method: "POST",
      body: credentials,
    }).then(res => {
      const data : any = res.data.value
      const error :any = res.error.value
      if (error) {
        // dealing error
        console.log("error", error.message)
      } else {
        console.log("data", data.data.user as User)
      }
    });
    
    return data
  }

  async function register(userInfo: UserRegistration) {
    await useApiFetch("/sanctum/csrf-cookie");

    const register = await useApiFetch("api/register", {
      method: "POST",
      body: userInfo,
    });

    return register;
  }

  return { loginUser, register, logout };
  
});
