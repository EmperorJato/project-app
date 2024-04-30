import { defineStore } from "pinia";

export const useAuthAxiosStore = defineStore("auth-axios", () => {
  const axios = useNuxtApp().$axios;

  const userDetails = ref(null);
  const isLoggedIn = computed(() => !!userDetails.value);
  const getUserDetails = computed(() => userDetails.value);

  async function profile(payload){
    const userProfile = await axios.get("/api/user/profile", payload);
    userDetails.value = userProfile.data.data;
    return userProfile;
  }


  async function loginUser(payload) {
    const login = await axios.post("/api/login", payload);

    const accessToken = login.data.data.access_token;
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }

    await profile();

    return login;
  }
  async function registerUser(payload) {
    const register = await axios.post("/api/register", payload);

    return register;
  }

  function $reset() {
    userDetails.value = null
  }

  return { isLoggedIn, userDetails, getUserDetails, loginUser, registerUser, profile, $reset};

}, {
  persist: true
});



