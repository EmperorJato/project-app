<template>
  <VApp>
    <NavBar />
    <AppBar />
    <VMain>
      <slot />
    </VMain>
    <AlertSnackbar />
  </VApp>
</template>

<style>

.v-table > .v-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}

.v-data-table-footer {
  border-top: 1px solid #9E9E9E;
  padding-top: 4px !important;
}

.v-navigation-drawer {
  
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #b1b1b1;
  }

  ::-webkit-scrollbar-thumb {
    background: #007ACC;
    border-radius: 7px;
  }
}
</style>
