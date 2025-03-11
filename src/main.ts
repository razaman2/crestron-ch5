import "./style.css";
import "@crestron/ch5-theme/output/themes/dark-theme.css";
import App from "./App.vue";
import Routes from "./routes";
import {createApp} from "vue";

createApp(App).use(Routes).mount("#app");
