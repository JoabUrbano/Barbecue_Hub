<script setup lang="ts">
import NavBar from './views/NavBar.vue';
</script>

<template>
  <div id="page" class="flex flex-col h-screen w-screen">
    <NavBar />
  
    <router-view />
  </div>
</template>
