<template>
  <VContainer class="fill-height pa-0" fluid>
    <VBtn
      position="fixed"
      color="primary"
      prepend-icon="$vuetify"
      location="top right"
      class="ma-5"
      router-link
      to="/register"
      >Register</VBtn
    >
    <VRow class="h-100">
      <VCol cols="12" md="6">
        <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
          <VCol cols="12" md="8">
            <VForm
              validate-on="submit lazy"
              id="loginForm"
              ref="loginForm"
              @submit.prevent="handleLogin"
            >
              <VImg src="#" max-height="150" />
              <h1 class="text-center font-weight-black my-2">SIGN IN</h1>
              <VTextField
                v-model="form.email"
                class="my-4"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                color="primary"
                density="compact"
                :rules="emailRules"
                :error-messages="emailErrors"
              />

              <VTextField
                v-model="form.password"
                class="mt-4"
                label="Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                color="primary"
                density="compact"
                :rules="passwordRules"
                :error-messages="passwordErrors"
              />
              <VBtn
                :loading="loading"
                block
                class="mt-4"
                color="primary"
                size="large"
                rounded
                type="submit"
                form="loginForm"
              >
                LogIn
              </VBtn>
            </VForm>
          </VCol>
        </VRow>
      </VCol>
      <VCol
        cols="12"
        md="6"
        class="rounded-bl-xl d-flex justify-center align-center"
      >
        <VImg src="#" max-height="400" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});

import { useAuthAxiosStore } from "~/stores/auth";

const storeAuth = useAuthAxiosStore();

const loading = ref(false);

const initialForm = {
  email: "",
  password: "",
};

const form = ref({
  ...initialForm,
});

const emailErrors = ref("");
const emailRules = ref([
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  (v) => {
    if (v?.length <= 255) return true;
    return "Email should not be greater than 100 characters";
  },
]);
const passwordErrors = ref("");
const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) => {
    if (v?.length <= 255) return true;
    return "Password should not be greater than 255 characters";
  },
]);

async function handleLogin() {
  try {
    loading.value = true;
    const login = await storeAuth
      .loginUser(form.value)
      .then((res) => {
        navigateTo("/dashboard");
      })
      .catch((err) => {
        emailErrors.value = err.response.data.message;
      })
      .finally(() => {
        loading.value = false;
      });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.rounded-bl-xl {
  background-color: #007acc;
  border-bottom-left-radius: 750px !important;
}
.rounded-br-xl {
  background-color: #007acc;
  border-bottom-right-radius: 750px !important;
}
</style>
