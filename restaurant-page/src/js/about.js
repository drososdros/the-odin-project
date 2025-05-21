export function about() {
  const div = document.createElement("div");
  div.id = "home";
  const message = document.createElement("p");
  message.textContent = "Under Construction";
  div.appendChild(message);

  return div;
}
