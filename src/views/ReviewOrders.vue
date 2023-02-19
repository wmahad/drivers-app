<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useRouteStore, OrderType, IssueType } from "@/store";
import LayoutComp from "@/components/LayoutComp.vue";
import QuantitySection from "@/components/QuantitySection.vue";
import OrderButtons from "@/components/OrderButtons.vue";
import OrderHeader from "@/components/OrderHeader.vue";

const store = useRouteStore();
const toggle = ref();

const router = useRouter();
const { params } = useRoute();
const { orders, stopId, lastStop, completedOrders, count } = storeToRefs(store);

function goToNextStop() {
  store.nextStop(+params.id);
  router.push({ name: "stop" });
}

function reportIssue(issue: string, id: string) {
  toggle.value = null;
  store.reportOrderIssues(id, issue);
}

function getOrderClass(type: number) {
  return type === OrderType.pickup ? "pick-up" : "drop-off";
}
</script>

<template>
  <LayoutComp>
    <template #appbar-header>
      <v-app-bar color="secondary">
        <template v-slot:prepend>
          <router-link class="router-link" to="/">
            <v-icon size="18" icon="mdi-arrow-left"></v-icon>
          </router-link>
        </template>

        <v-app-bar-title class="d-flex justify-center center-text py-2">
          <h6 class="text-h6">Review orders</h6>
          {{ completedOrders.length }}/{{ orders.length }}
        </v-app-bar-title>

        <template v-slot:append> STOP #{{ count }} </template>
      </v-app-bar>
    </template>

    <v-card
      class="elevation-2 mb-5"
      v-for="order in orders"
      :key="order.order_id"
      :data-testid="order.stream_type"
    >
      <div class="d-flex">
        <div :class="['order-icon', getOrderClass(order.type)]">
          <div :class="['curve-border', getOrderClass(order.type)]">
            <v-img contain height="20" src="@/assets/logo.svg" />
          </div>
        </div>
        <div class="flex-container">
          <div class="d-flex flex-column flex-container">
            <OrderHeader
              :type="order.type"
              :size="order.size"
              :title="order.stream_type"
            />

            <v-card-text>
              <v-row>
                <QuantitySection
                  :id="order.order_id"
                  :quantity="order.quantity"
                />
                <OrderButtons
                  :id="order.order_id"
                  :issue="order.issue"
                  :status="order.status"
                  @report-issue="(id) => (toggle = toggle === id ? null : id)"
                />
              </v-row>
            </v-card-text>
          </div>
          <v-card-item v-if="toggle === order.order_id">
            <h5>Please report an issue with this order</h5>
            <div>
              <v-radio-group
                inline
                @update:model-value="reportIssue($event, order.order_id)"
                v-model="order.issue"
              >
                <v-radio
                  label="Wrong quantity ordered"
                  :value="IssueType.wrong_quantity_ordered"
                ></v-radio>
                <v-radio
                  label="Wrong container type"
                  :value="IssueType.wrong_container_type"
                ></v-radio>
                <v-radio
                  label="Container not accessible"
                  :value="IssueType.container_not_accessible"
                ></v-radio>
                <v-radio label="Other" :value="IssueType.other"></v-radio>
              </v-radio-group>
            </div>
          </v-card-item>
        </div>
      </div>
    </v-card>

    <v-btn
      v-if="stopId !== lastStop?.stop_id"
      size="x-large"
      rounded="lg"
      color="primary"
      class="mt-6 text-white-color"
      @click="goToNextStop"
      >Next stop</v-btn
    >
  </LayoutComp>
</template>

<style scoped>
.flex-container {
  flex: 1;
}
.order-icon {
  position: relative;
  width: 24px;
}

.curve-border {
  position: absolute;
  left: 7px;
  top: 18px;
  width: 25px;
  height: 25px;
  padding-right: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  border-top-right-radius: 69%;
  border-bottom-right-radius: 68%;
}

.pick-up {
  background: #14a500;
}

.drop-off {
  background: #ff9a24;
}

.center-text {
  text-align: center;
}

.text-white-color {
  color: #fff !important;
}

.router-link {
  display: flex;
  text-decoration: none;
  color: black;
  padding: 6px;
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: #fff;
}
</style>
