"use strict";
function createCard(doc, book) {
    const readBook = '<div id="read">\n<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n<title>read</title>\n<path\nd="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" />\n</svg>\n</div>\n';
    const deleteBook = '<div id="delete">\n<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n<title>delete-outline</title>\n<path\nd="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />\n</svg>\n</div>\n';
    const cardMenu = doc.createElement("div");
    cardMenu.classList.add("card__menu");
    cardMenu.innerHTML += readBook + deleteBook;
    const mainCard = doc.createElement("div");
    mainCard.classList.add("card");
    if (book.isRead) {
        mainCard.classList.add("read");
    }
    const aref = doc.createElement("a");
    aref.classList.add("card__read");
    const title = doc.createElement("h2");
    title.classList.add("card__title");
    title.textContent = book.title;
    const description = doc.createElement("p");
    description.textContent = book.description;
    description.classList.add("card__description");
    aref.appendChild(title);
    aref.appendChild(description);
    mainCard.appendChild(aref);
    mainCard.appendChild(cardMenu);
    cardContainer?.appendChild(mainCard);
}
const mobydick = {
    title: "Moby-Dick",
    description: "Moby-Dick; or, The Whale is an 1851 epic novel by American writer Herman Melville.",
    pages: 682,
    isRead: false,
};
const cardContainer = document.querySelector(".book__layout");
const form = document.querySelector(".form");
const modalClose = document.querySelector(".modal__close");
const createBook = document.getElementById("create__book");
let books = [];
cardContainer?.addEventListener("click", (e) => {
    const targ = e.target;
    if (targ.parentElement?.id === "delete") {
        const parrent = targ.parentElement.parentElement?.parentElement;
        const title = parrent?.firstChild?.firstChild?.textContent;
        books = books.filter((book) => book.title !== title);
        parrent?.remove();
    }
    if (targ.parentElement?.id === "read") {
        const parrent = targ.parentElement.parentElement?.parentElement;
        const title = parrent?.firstChild?.firstChild?.textContent;
        parrent?.classList.toggle("read");
        books.map((book) => book.title === title ? book.isRead = true : null);
    }
    console.log(books);
});
createBook?.addEventListener("click", () => {
    document.getElementsByClassName("modal")[0].classList.toggle("modal__hide");
});
modalClose?.addEventListener("click", () => {
    form.reset();
    document.getElementsByClassName("modal")[0].classList.toggle("modal__hide");
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const book = {
        title: data.title,
        description: data.description,
        pages: Number(data.pages),
        isRead: data?.isRead === 'on' ? true : false
    };
    books.push(book);
    createCard(document, book);
    document.getElementsByClassName("modal")[0].classList.toggle("modal__hide");
});
books.push(mobydick);
for (const book of books) {
    createCard(document, book);
}
// for (let i = 0; i < 25; i++) {
//   createCard(mobydick)
// }
