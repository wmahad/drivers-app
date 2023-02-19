import { defineStore } from "pinia";

function updateOrder(stops, stopId, orderId, updates = (o) => ({ ...o })) {
  return stops.map((s) => {
    if (s.stop_id !== stopId) return s;
    return {
      ...s,
      orders: s.orders
        .map((order) => {
          if (order.order_id !== orderId) return order;
          return { ...order, ...updates(order) };
        })
        .filter((order) => !!order.quantity),
    };
  });
}

export enum StatusType {
  new = 0,
  pending,
  scheduled,
  in_progress,
  completed,
}

export enum OrderType {
  pickup = 0,
  dropoff,
}

export enum IssueType {
  other = 0,
  wrong_quantity_ordered,
  wrong_container_type,
  container_not_accessible,
}

export const useRouteStore = defineStore("driverRoute", {
  state: () => ({
    route: {},
    stops: [],
    stopId: null,
    count: 1,
  }),
  getters: {
    routeName: (state) => state.route.name,
    // filter uncompleted stops
    uncompletedStops: (state) =>
      state.stops.filter((s) => s.status !== StatusType.completed),
    stop: (state) => {
      if (state.stopId) {
        return state.uncompletedStops.find((s) => s.stop_id === state.stopId);
      }
      // find one with minimum stop id
      return state.uncompletedStops.reduce(
        (m, x) => (m.stop_id < x.stop_id ? m : x),
        {}
      );
    },

    lastStop: (state) => {
      // find one with maximum stop id
      return state.uncompletedStops.reduce(
        (m, x) => (m.stop_id > x.stop_id ? m : x),
        {}
      );
    },
    progress: (state) => {
      return (
        ((state.stops.length - state.uncompletedStops.length) /
          state.stops.length) *
        100
      );
    },
    lastStopAddress: (state) => {
      const { address } = state.lastStop;
      if (!address) return null;
      return `${address.street} ${address.house_number} ${address.postal_code} ${address.town}`;
    },
    stopAdrress: (state) => {
      const { address } = state.stop;
      if (!address) return null;
      return `${address.street} ${address.house_number}`;
    },
    stopLocality: (state) => {
      const { address } = state.stop;
      if (!address) return null;
      return `${address.postal_code} ${address.town}`;
    },
    orders: (state) => state.stop.orders ?? [],
    completedOrders: (state) =>
      state.orders.filter((o) => o.status === StatusType.completed),
  },
  actions: {
    async fill() {
      const { stops, ...rest } = (await import("@/data/routes.json")).default;
      this.route = rest;
      this.stops = stops;
      this.stopId = null;
    },
    // update quantity
    adjustQuantity(orderId: string, count = 1) {
      this.stops = updateOrder(this.stops, this.stop.stop_id, orderId, (o) => ({
        quantity: o.quantity + count,
      }));
    },

    modifyOrderStatus(orderId: string) {
      this.stops = updateOrder(this.stops, this.stop.stop_id, orderId, (o) => ({
        status:
          o.status === StatusType.completed
            ? StatusType.pending
            : StatusType.completed,
      }));
    },

    reportOrderIssues(orderId: string, issue: string) {
      this.stops = updateOrder(this.stops, this.stop.stop_id, orderId, () => ({
        issue,
      }));
    },

    completeOrder(stopId: number) {
      this.stops = this.stops.map((s) => {
        if (s.stop_id !== stopId) return s;
        return {
          ...s,
          status: StatusType.completed,
          orders: s.orders.map((order) => {
            return { ...order, status: StatusType.completed };
          }),
        };
      });
      this.nextStop(stopId);
    },

    // go to next stop
    nextStop(id) {
      this.stopId = id + 1;
      this.count++;
    },
  },
});
