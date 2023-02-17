// Plugins
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import router from "../router";

// Types
import type { App } from "vue";

const pinia = createPinia();

export function registerPlugins(app: App) {
  loadFonts();
  app.use(VueQueryPlugin).use(pinia).use(vuetify).use(router);
}
