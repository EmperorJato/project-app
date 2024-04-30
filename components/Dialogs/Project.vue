<template>
    <VDialog :model-value="props.modelValue" persistent max-width="500">
      <VCard class="text-h5" title="Project">
        <template v-slot:append>
          <div class="me-n2">
            <VBtn
              icon="$close"
              density="comfortable"
              variant="plain"
              @click="close"
            ></VBtn>
          </div>
        </template>
        <VCardText>
          <VContainer>
            <VTextField
              clearable
              label="Title"
              variant="outlined"
              v-model="projectForm.title"
                      :rules="titleRules"
            ></VTextField>
            <VTextarea
                      v-model="projectForm.description"
                      :rules="descriptionRules"
                      label="Description"
                      variant="outlined"
                      color="primary"
                      density="comfortable"
                    ></VTextarea>
            <VCheckbox label="Active" color="success"></VCheckbox>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn prepend-icon="mdi-file-check" color="blue-darken-1" @click="close"> Save </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </template>
  
  <script setup>
  
  const props = defineProps({ modelValue: Boolean, project: Object });
  const emit = defineEmits(["update:modelValue"]);
  
  
  const projectForm = ref({
      ...props.project
  })
  
  
  function close() {
    emit("update:modelValue", false);
  }
  
  </script>