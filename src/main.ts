import "./style.css";
import App from "./App.vue";
import Routes from "./routes";
import {createApp} from "vue";

createApp(App).use(Routes).mount("#app");
