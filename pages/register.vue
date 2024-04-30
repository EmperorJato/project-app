<template>
  <VContainer class="fill-height pa-0" fluid>
    <v-btn
      position="fixed"
      color="primary"
      prepend-icon="$vuetify"
      location="top right"
      class="ma-5"
      router-link
      to="/login"
      >Login</v-btn
    >
    <VRow class="h-100">
      <VCol
        cols="12"
        md="6"
        class="rounded-br-xl d-flex justify-center align-center"
      >
        <VImg src="#" max-height="400" />
      </VCol>
      <VCol cols="12" md="6">
        <VRow class="h-100 ma-0 pa-0" justify="center" align="center">
          <VCol cols="12" md="8">
            <VForm
              validate-on="submit lazy"
              id="registerForm"
              ref="registerForm"
              @submit.prevent="handleRegister"
            >
              <VImg src="#" max-height="150" />
              <h1 class="text-center font-weight-black my-2">SIGN UP</h1>

              <VTextField
                v-model="form.name"
                class="my-4"
                label="Name"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                color="primary"
                density="compact"
                :rules="nameRules"
                :error-messages="nameErrors"
              />
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
              <VTextField
                v-model="form.password_confirmation"
                class="mt-4"
                label="Confirm Password"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                color="primary"
                density="compact"
                :rules="passwordConfirmationRules"
              />
              <v-btn
              :loading="loading"
                block
                type="submit"
                form="registerForm"
                class="mt-8"
                color="primary"
                size="large"
                rounded=""
              >
                Register
              </v-btn>
            </VForm>
          </VCol>
        </VRow>
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
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const form = ref({
  ...initialForm,
});

const nameRules = ref([
  (v) => !!v || "Name is required",
  (v) => {
    if (v?.length <= 255) return true;
    return "Email should not be greater than 255 characters";
  },
]);
const nameErrors = ref("");

const emailRules = ref([
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  (v) => {
    if (v?.length <= 150) return true;
    return "Email should not be greater than 255 characters";
  },
]);
const emailErrors = ref("");

const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) => {
    if (v?.length <= 255) return true;
    return "Password should not be greater than 255 characters";
  },
]);
const passwordErrors = ref("");

const passwordConfirmationRules = ref([
  (v) => !!v || "Password Confirmation is required",
  (v) => {
    if (v?.length <= 255) return true;
    return "Password should not be greater than 255 characters";
  },
]);

async function handleRegister() {
  try {
    loading.value = true;
    const login = await storeAuth
      .registerUser(form.value)
      .then((res) => {
        navigateTo("/login");
      })
      .catch((err) => {
        nameErrors.value = err.response.data.errors.name
        emailErrors.value = err.response.data.errors.email
        passwordErrors.value = err.response.data.errors.password
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
