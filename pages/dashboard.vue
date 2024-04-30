<template>
  <div>
    <VCard flatclass="pb-1">
      <VDataTable
        :headers="projectHeader"
        :items="projectItems"
        :search="search"
        density="comfortable"
        :loading="loadingTable"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Project</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props"> New Project </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.title"
                          label="Title"
                          variant="outlined"
                          :rules="titleRules"
                          :error-messages="titleErrors"
                        ></v-text-field>
                        <v-textarea
                          v-model="editedItem.description"
                          label="Description"
                          variant="outlined"
                          class="mt-2"
                        ></v-textarea>
                        <VCheckbox
                          v-bind:false-value="0"
                          v-bind:true-value="1"
                          label="Active"
                          v-model="editedItem.is_active"
                          color="success"
                        ></VCheckbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                    :loading="loadingSave"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="deleteItemConfirm"
                    :loading="loadingSave"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.is_active`]="{ item }">
          <div>
            <VChip
              :color="item.is_active ? 'green' : 'red'"
              :text="item.is_active ? 'Active' : 'Inactive'"
              class="text-uppercase"
              label
              size="small"
            ></VChip>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="small" class="me-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </VDataTable>
    </VCard>
    <!-- <DialogsProject v-model="showProjectDialog" :project="storeProject.getProject" /> -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

import { useAlertSnackbarStore } from "~/stores/alert-snackbar";

const useAlert = useAlertSnackbarStore();

const axios = useNuxtApp().$axios;

const dialog = ref(false);
const dialogDelete = ref(false);
const search = ref("");
const loadingTable = ref(false);
const loadingSave = ref(false);

const projectHeader = [
  {
    align: "start",
    key: "title",
    sortable: false,
    title: "Title",
  },
  { key: "description", title: "Description", sortable: false },
  { key: "is_active", title: "Status", sortable: false },
  { key: "actions", title: "Action", sortable: false, align: "end" },
];

const projectItems = ref([]);

const titleRules = ref([
  (v) => !!v || "Title is required",
  (v) => {
    if (v?.length <= 50) return true;
    return "Title should not be greater than 50 characters";
  },
]);
const titleErrors = ref('');

const editedIndex = ref(-1);
const editedItem = ref({
  id: "",
  title: "",
  description: "",
  is_active: 0,
});

const defaultItem = ref({
  id: "",
  title: "",
  description: "",
  is_active: 0,
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Project" : "Edit Project";
});

const initialize = async () => {
  await axios.get("/api/project").then((res) => {
    console.log("response", res);
    projectItems.value = res.data.data.records;

    const alert = {
      show: true,
      type: "success",
      title: "Success",
      description: res.data.message,
      timeout: 5000,
    };

    useAlert.setAlertSnackbar(alert);
  });
};

async function save() {
  let alert = {};
  loadingSave.value = true;

  if (editedIndex.value > -1) {
    await axios
      .put(`/api/project/update?id=${editedItem.value.id}`, editedItem.value)
      .then((res) => {
        alert = {
          show: true,
          type: "success",
          title: "Success",
          description: res.data.message,
          timeout: 5000,
        };
        
        Object.assign(projectItems.value[editedIndex.value], editedItem.value);
        close();
      })
      .catch((err) => {

        alert = {
          show: true,
          type: "error",
          title: "Error",
          description: err.response.data.message,
          timeout: 5000,
        };

        loadingSave.value = false;

        titleErrors.value = err.response.data.message
      });

  } else {
    await axios
      .post("/api/project/create", editedItem.value)
      .then((res) => {
        projectItems.value.push(editedItem.value);
        alert = {
          show: true,
          type: "success",
          title: "Success",
          description: res.data.message,
          timeout: 5000,
        };
        close();
      })
      .catch((err) => {

        alert = {
          show: true,
          type: "error",
          title: "Error",
          description: err.response.data.message,
          timeout: 5000,
        };

        loadingSave.value = false;

        titleErrors.value = err.response.data.message
      });
  }
  useAlert.setAlertSnackbar(alert);
}

function editItem(item) {
  editedIndex.value = projectItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

const deleteItem = (item) => {
  editedIndex.value = projectItems.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  let alert = {};
  loadingSave.value = true;
  await axios
    .delete(`/api/project/delete?id=${editedItem.value.id}`)
    .then((res) => {
      projectItems.value.splice(editedIndex.value, 1);
      alert = {
        show: true,
        type: "success",
        title: "Success",
        description: res.data.message,
        timeout: 5000,
      };
    })
    .catch((err) => {
      alert = {
        show: true,
        type: "error",
        title: "Server Error",
        description: err,
        timeout: 5000,
      };
    })
    .then(() => {
      useAlert.setAlertSnackbar(alert);
      closeDelete();
    });
};

function close() {
  dialogDelete.value = false;
  loadingSave.value = false;
  dialog.value = false;
  nextTick(() => {
    titleErrors.value = null
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

function closeDelete() {
  dialogDelete.value = false;
  loadingSave.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

watch(dialog, (val) => {
  val || close();
});

watch(dialogDelete, (val) => {
  val || closeDelete();
});

initialize();
</script>
