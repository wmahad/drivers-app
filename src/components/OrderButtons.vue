<script setup lang="ts">
import { useRouteStore, StatusType } from "@/store";

const store = useRouteStore();
defineProps<{
  id: string;
  status: number;
  issue?: number;
}>();

function isCompleted(orderStatus: number) {
  return orderStatus === StatusType.completed;
}
</script>

<template>
  <v-col cols="3">
    <div class="d-flex flex-column justify-space-between">
      <div class="d-flex justify-end">
        <v-btn
          :class="issue ? 'outline-btn' : 'text-white-color'"
          :color="issue ? 'background' : 'info'"
          icon="mdi-alert-outline"
          data-testid="report-issue"
          @click="$emit('report-issue', id)"
        />
        <v-btn
          :color="isCompleted(status) ? 'background' : 'primary'"
          :icon="isCompleted(status) ? 'mdi-close' : 'mdi-check'"
          :class="[
            'ml-2',
            isCompleted(status) ? 'cancel-btn' : 'text-white-color',
          ]"
          data-testid="complete-btn"
          @click="store.modifyOrderStatus(id)"
        />
      </div>
    </div>
  </v-col>
</template>

<style scoped>
.outline-btn {
  border: 1px solid #ffbf58;
  color: #ffbf58 !important;
}

.text-white-color {
  color: #fff !important;
}

.cancel-btn {
  color: #bdbdbd !important;
}
</style>
