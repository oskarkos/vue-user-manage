import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import UUID from "vue-uuid";

import {
  faRightToBracket,
  faArrowRightFromBracket,
  faUsers,
  faBars,
  faBarsStaggered,
  faPlus,
  faClose,
  faCheck,
  faListCheck,
  faCheckCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { faCheckCircle as faCheckCircleRegular } from "@fortawesome/free-regular-svg-icons";

library.add(
  faRightToBracket,
  faArrowRightFromBracket,
  faUsers,
  faBars,
  faBarsStaggered,
  faPlus,
  faClose,
  faCheck,
  faListCheck,
  faCheckCircle,
  faCheckCircleRegular,
  faTrashCan
);

const app = createApp(App);
app.component("fa-icon", FontAwesomeIcon);
app.use(UUID);
app.use(store);
app.use(router);
app.mount("#app");
