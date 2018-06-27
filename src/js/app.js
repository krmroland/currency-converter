import "../sass/app.scss";

import MainApp from "./MainApp";

import CurrencyDom from "./CurrencyDom";

import { registerServiceWorker } from "./sw/registerServiceWorker";

const app = new MainApp();

new CurrencyDom(document.getElementById("app"), app).render();

//register service worker

registerServiceWorker();
