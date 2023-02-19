<script setup lang="ts">
import { useRouteStore } from "@/store";

const store = useRouteStore();
defineProps<{
  id: string;
  quantity: number;
}>();
</script>

<template>
  <v-col class="d-flex align-end">
    <div class="d-flex align-center">
      <v-btn
        size="x-small"
        color="primary"
        icon="mdi-minus"
        class="text-white-color"
        data-testid="reduce-quantity-btn"
        @click="store.adjustQuantity(id, -1)"
      />
      <span data-testid="quantity-view" class="text-h5 px-3">{{
        quantity
      }}</span>
      <v-btn
        class="text-white-color"
        size="x-small"
        color="primary"
        icon="mdi-plus"
        data-testid="increase-quantity-btn"
        @click="store.adjustQuantity(id)"
      />
    </div>
  </v-col>
</template>
