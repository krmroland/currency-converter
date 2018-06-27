import "../sass/app.scss";

import MainApp from "./MainApp";

import CurrencyDom from "./CurrencyDom";

const app = new MainApp();

new CurrencyDom(document.getElementById("app"), app).render();
