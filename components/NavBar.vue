<template>
  <VNavigationDrawer v-model="drawer" permanent>
    <v-list>
      <v-list-item class="text-center">{{getUserDetails.name}}</v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list v-model:opened="open" nav>
      <!-- DASHBOARD -->
      <v-list-item
        title="Dashboard"
        prepend-icon="mdi-view-dashboard"
        value="Dashboard"
        nuxt
        to="/dashboard"
      />
    </v-list>
  </VNavigationDrawer>
</template>

<script setup>
import { useAuthAxiosStore } from "~/stores/auth";

const storeAuth = useAuthAxiosStore();

const { getUserDetails } = storeToRefs(storeAuth)

const drawer = ref(true);
const rail = ref(true);

const open = ref(null);
</script>

<style></style>
