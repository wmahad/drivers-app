<script setup lang="ts">
import { titleCase } from "@/utils";
import { OrderType } from "@/store";
defineProps<{
  title: string;
  type: number;
  size: number;
}>();
</script>

<template>
  <v-card-item>
    <div class="d-flex justify-space-between">
      <div>
        <div>
          <span class="text-h6">{{ titleCase(title) }}</span>
          <span class="text-body-1 pl-1">{{ size }}L</span>
        </div>
        <span class="text-caption">Adjust quantity (if needed)</span>
      </div>
      <h5 class="text-h6">
        {{ type === OrderType.pickup ? "PICKUP" : "PLACEMENT" }}
      </h5>
    </div>
  </v-card-item>
</template>
