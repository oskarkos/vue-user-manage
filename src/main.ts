import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

library.add(faRightToBracket);

const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);
app.use(store);
app.use(router);
app.mount("#app");
