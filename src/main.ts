import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { VuesticPluginsWithoutComponents } from "vuestic-ui";

createApp(App)
  .use(VuesticPluginsWithoutComponents)
  .use(store)
  .use(router)
  .mount("#app");
