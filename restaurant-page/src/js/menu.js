import { CATALOGUE } from "./catalogue";

export function menu() {
  const container = document.createElement("section");
  container.classList.add("card-grid");

  for (const item of CATALOGUE) {
    const card = document.createElement("div");
    const title = document.createElement("h5");
    const description = document.createElement("p");
    const price = document.createElement("p");
    card.classList.add("card");
    title.classList.add("title");
    description.classList.add("description");
    price.classList.add("price");
    title.textContent = item.title;
    description.textContent = item.description;
    price.textContent = item.price;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    container.appendChild(card);
  }
  return container;
}
