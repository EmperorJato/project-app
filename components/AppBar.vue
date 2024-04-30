<template>
  <VAppBar>
    <v-spacer></v-spacer>
    <template v-slot:append>
      <v-btn @click="handleLogout">Logout</v-btn>
    </template>
  </VAppBar>
</template>

<script setup>
import { useAuthAxiosStore } from "~/stores/auth";

const storeAuth = useAuthAxiosStore();

async function handleLogout() {
  try {
    storeAuth.$reset();
    navigateTo("/login")
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
