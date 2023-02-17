// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#37ccbe",
          secondary: "#46607f",
          info: "#ffbf58",
          warning: "#ff9a24",
        },
      },
    },
  },
});
