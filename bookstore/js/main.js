"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Book_id, _Books_books;
class Book {
    constructor({ title, description, pages, isRead = false }) {
        var _a;
        _Book_id.set(this, 0);
        this.title = title;
        this.description = description;
        this.pages = pages;
        this.isRead = isRead;
        __classPrivateFieldSet(this, _Book_id, (_a = __classPrivateFieldGet(this, _Book_id, "f"), _a++, _a), "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Book_id, "f");
    }
    update(title, description, pages, isRead) {
        if (title) {
            this.title = title;
        }
        if (description) {
            this.description = description;
        }
        if (pages) {
            this.pages = pages;
        }
        if (isRead) {
            this.isRead = isRead;
        }
    }
    setIsRead() {
        this.isRead = this.isRead ? false : true;
        return this.isRead;
    }
    createCard() {
        const readBook = '<div id="read">\n<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n<title>read</title>\n<path\nd="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" />\n</svg>\n</div>\n';
        const deleteBook = '<div id="delete">\n<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n<title>delete-outline</title>\n<path\nd="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />\n</svg>\n</div>\n';
        const cardMenu = document.createElement("div");
        cardMenu.classList.add("card__menu");
        cardMenu.innerHTML += readBook + deleteBook;
        const mainCard = document.createElement("div");
        mainCard.classList.add("card");
        mainCard.id = this.id.toString();
        if (this.isRead) {
            mainCard.classList.add("read");
        }
        const aref = document.createElement("a");
        aref.classList.add("card__read");
        const title = document.createElement("h2");
        title.classList.add("card__title");
        title.textContent = this.title;
        const description = document.createElement("p");
        description.textContent = this.description;
        description.classList.add("card__description");
        aref.appendChild(title);
        aref.appendChild(description);
        mainCard.appendChild(aref);
        mainCard.appendChild(cardMenu);
        return mainCard;
    }
}
_Book_id = new WeakMap();
class Books {
    constructor() {
        _Books_books.set(this, void 0);
        __classPrivateFieldSet(this, _Books_books, [], "f");
    }
    getBooks() {
        return __classPrivateFieldGet(this, _Books_books, "f");
    }
    addBook(bookData) {
        if ("id" in bookData && "createCard" in bookData) {
            __classPrivateFieldGet(this, _Books_books, "f").push(bookData);
            return bookData;
        }
        else {
            const formObj = Object.fromEntries(bookData);
            const book = new Book({
                title: formObj.title,
                description: formObj.description,
                pages: Number(formObj.pages),
                isRead: formObj?.isRead === 'on' ? true : false
            });
            __classPrivateFieldGet(this, _Books_books, "f").push(book);
            return book;
        }
    }
    removeBook(id) {
        if (typeof id === "string" || id) {
            __classPrivateFieldSet(this, _Books_books, __classPrivateFieldGet(this, _Books_books, "f").filter((book) => book.id !== Number(id)), "f");
            return true;
        }
        return false;
    }
    getBook(id) {
        if (id === "string" || id) {
            return __classPrivateFieldGet(this, _Books_books, "f").filter(book => book.id === Number(id))[0];
        }
        else {
            return;
        }
    }
}
_Books_books = new WeakMap();
function main() {
    let books = new Books();
    const cardContainer = document.querySelector(".book__layout");
    const form = document.querySelector(".form");
    const modalClose = document.querySelector(".modal__close");
    const createBook = document.getElementById("create__book");
    const mobydick = new Book({ title: "Moby-Dick", description: "Moby-Dick; or, The Whale is an 1851 epic novel by American writer Herman Melville.", pages: 682, isRead: false, });
    cardContainer?.addEventListener("click", (e) => {
        const targ = e.target;
        //somethime maybe we hit the outline of icon 
        //so i add this to check the action
        const action = targ.parentElement?.hasAttribute("id")
            ? targ.parentElement : targ.parentElement?.parentElement;
        const parrent = action?.parentElement?.parentElement;
        if (action?.id === "delete") {
            if (books.removeBook(parrent?.id))
                parrent?.remove();
        }
        if (targ.parentElement?.id === "read") {
            const isUpdatedSuccesfully = books.getBook(parrent?.id)?.setIsRead();
            if (isUpdatedSuccesfully) {
                parrent?.classList.add("read");
            }
            else {
                parrent?.classList.remove("read");
            }
        }
    });
    createBook?.addEventListener("click", () => {
        form.reset();
        document.getElementsByClassName("modal")[0].classList.toggle("modal__hide");
    });
    modalClose?.addEventListener("click", () => {
        form.reset();
        document.getElementsByClassName("modal")[0].classList.toggle("modal__hide");
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const newBook = books.addBook(formData);
        newBook.createCard();
        document.getElementsByClassName("modal")[0].classList.toggle("modal__hide");
    });
    books.addBook(mobydick);
    for (const book of books.getBooks()) {
        cardContainer?.appendChild(book.createCard());
    }
    return { books }; // WARN: only for debug
}
const m = main(); // WARN: only for debug
