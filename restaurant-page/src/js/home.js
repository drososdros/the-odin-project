"use strict";
export function home() {
  const div = document.createElement("div");
  div.id = "home";
  const button = document.createElement("button");
  button.textContent = "order Now";
  div.appendChild(button);
  return div;
}
