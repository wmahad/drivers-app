<template>
  <v-app>
    <v-layout>
      <router-view />
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import { useRouteStore } from "@/store";

const store = useRouteStore();

store.fill();
</script>
