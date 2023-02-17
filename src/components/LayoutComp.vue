<template>
  <slot name="appbar-header">
    <v-app-bar class="appbar-header">
      <v-app-bar-title class="d-flex justify-center center-text">{{
        name
      }}</v-app-bar-title>
    </v-app-bar>
    <v-row class="elevation-2 progress">
      <v-col cols="12">
        <div class="d-flex align-center">
          <div class="progress-container">
            <v-progress-linear rounded :model-value="value" />
          </div>
          <span class="text-caption ml-2">{{ value }}%</span>
        </div>
      </v-col>
    </v-row>
  </slot>

  <v-container fluid class="mt-16">
    <slot />
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  name?: string;
  value?: number;
}>();
</script>

<style scopped>
.appbar-header {
  box-shadow: none !important;
}
.progress-container {
  flex: 1;
}
.progress {
  display: flex;
  padding: 0 20px;
  border-top: 1px solid #e0e0e0;
  position: absolute;
  left: 0;
  right: 0;
  top: 77px;
}
</style>
