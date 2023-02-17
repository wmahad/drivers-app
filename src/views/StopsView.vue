<template>
  <Layout :name="routeName" :value="progress">
    <v-row class="mt-7">
      <v-col cols="12">
        <v-card>
          <v-card-item class="card-header" :title="titleCase(stop.name)">
            <template v-slot:subtitle v-if="stop.telephone">
              <v-icon icon="mdi-phone-outline" /> {{ stop.telephone }}
            </template>
            <div class="d-flex align-center py-3 text-body-2">
              <v-icon
                icon="mdi-map-marker"
                size="20"
                class="me-1 pb-1"
              ></v-icon>
              <span>
                {{ stopAdrress }} <br />
                {{ stopLocality }}
              </span>
            </div>
            <div class="duration rounded pa-3">
              <v-icon icon="mdi-clock-outline" size="20" />
              {{ getTime(stop.time_start) }} - {{ getTime(stop.time_end) }}
            </div>
          </v-card-item>
          <v-card-text>
            <v-row align="center" no-gutters>
              <v-col>
                <h6 class="text-h6 mt-3 sub-heading">
                  {{ upperCase("Orders") }}
                  <v-badge
                    :content="orders.length"
                    class="mb-1"
                    inline
                    color="grey-lighten-4"
                  />
                </h6>
                <div>
                  <v-chip
                    class="ma-2"
                    label
                    v-for="order in orders"
                    :key="order.order_id"
                  >
                    <v-icon
                      start
                      icon="mdi-arrow-down-bold-box-outline"
                    ></v-icon>
                    {{ order.quantity }} x {{ order.size }}L
                    {{ titleCase(order.stream_type) }}
                  </v-chip>

                  <div v-if="stop.comment">
                    <p>{{ stop.comment }}</p>
                  </div>
                </div>

                <div class="d-flex flex-column flex-sm-row pt-12">
                  <v-btn
                    size="x-large"
                    rounded="lg"
                    color="primary"
                    class="mr-sm-6 mb-5 text-white-color"
                    append-icon="mdi-arrow-right-top-bold"
                    @click="navigateToOrders(stop.stop_id)"
                    >itinerary</v-btn
                  >
                  <v-btn
                    size="x-large"
                    rounded="lg"
                    color="primary"
                    append-icon="mdi-check-bold"
                    class="text-white-color"
                    @click="store.completeOrder(stop.stop_id)"
                    >proceed</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="lastStop.stop_id !== stop.stop_id">
      <v-col>
        <p class="text-subtitle-1 heading">
          {{
            upperCase(
              `${count} stop(s) out of ${uncompletedStops.length} left, here's the last stop:`
            )
          }}
        </p>
        <v-card variant="tonal" class="pa-6 text-body-2">
          <v-icon icon="mdi-map-marker" size="20" class="me-1 pb-1"></v-icon>
          {{ lastStopAddress }}
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRouteStore } from "@/store";
import { getTime, upperCase, titleCase } from "@/utils";
import Layout from "@/components/LayoutComp.vue";

const router = useRouter();
const store = useRouteStore();

const {
  stop,
  count,
  orders,
  routeName,
  stopLocality,
  stopAdrress,
  lastStop,
  lastStopAddress,
  uncompletedStops,
  progress,
} = storeToRefs(store);

function navigateToOrders(id: number) {
  router.push({
    name: "orders",
    params: { id },
  });
}
</script>

<style scoped>
.card-header {
  background-color: #46607f;
  color: #fff;
  position: relative;
}

.sub-heading {
  display: flex;
  align-items: center;
}

.heading {
  text-transform: uppercase;
}

.text-white-color {
  color: #fff !important;
}

.duration {
  position: absolute;
  right: 16px;
  bottom: -24px;
  background: #fff;
  color: #000;
  border: 1px solid #e5e7eb;
}
</style>
