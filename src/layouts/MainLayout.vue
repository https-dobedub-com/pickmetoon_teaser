<template>
  <q-layout view="lHh Lpr lFf" style="overflow:hidden;">
<!--    <MainHeader/>-->
    <q-page-container class="no-header-padding">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>
<style scoped>
.no-header-padding {
  padding: 0 !important;
}
</style>
