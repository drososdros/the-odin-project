("use strict");

import "../css/style.css";
import { home } from "./home";
import { menu } from "./menu";
import { about } from "./about";

function main() {
  const navBar = document.querySelector("nav");
  const inject = document.querySelector("#root");
  inject.appendChild(home());
  navBar.addEventListener("click", (e) => {
    const id = e.target.id;
    if (id === "homePage") {
      inject.innerHTML = "";
      inject.appendChild(home());
    } else if (id === "menuPage") {
      inject.innerHTML = "";
      inject.appendChild(menu());
    } else if (id === "aboutPage") {
      inject.innerHTML = "";
      inject.appendChild(about());
    }
  });
}

main();
