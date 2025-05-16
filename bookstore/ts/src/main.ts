
type BookType = {
  title: string;
  description: string;
  pages: number;
  isRead: boolean;
}

class Book implements BookType {
  #id = 0;
  title: string;
  description: string;
  pages: number;
  isRead: boolean;

  constructor({ title, description, pages, isRead = false }: BookType) {
    this.title = title
    this.description = description
    this.pages = pages
    this.isRead = isRead
    this.#id++;
  }
  get id() {
    return this.#id
  }

  update(title?: string, description?: string, pages?: number, isRead?: boolean) {
    if (title) {
      this.title = title
    }
    if (description) {
      this.description = description
    }
    if (pages) {
      this.pages = pages
    }
    if (isRead) {
      this.isRead = isRead
    }
  }
  setIsRead() {
    this.isRead = this.isRead ? false : true
    return this.isRead

  }


  createCard(): HTMLDivElement {
    const readBook = '<div id="read">\n<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n<title>read</title>\n<path\nd="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" />\n</svg>\n</div>\n'
    const deleteBook = '<div id="delete">\n<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n<title>delete-outline</title>\n<path\nd="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />\n</svg>\n</div>\n'

    const cardMenu = document.createElement("div")
    cardMenu.classList.add("card__menu")
    cardMenu.innerHTML += readBook + deleteBook

    const mainCard = document.createElement("div")
    mainCard.classList.add("card")
    mainCard.id = this.id.toString()
    if (this.isRead) {
      mainCard.classList.add("read")
    }
    const aref = document.createElement("a")
    aref.classList.add("card__read")
    const title = document.createElement("h2")
    title.classList.add("card__title")
    title.textContent = this.title
    const description = document.createElement("p")
    description.textContent = this.description
    description.classList.add("card__description")
    aref.appendChild(title)
    aref.appendChild(description)
    mainCard.appendChild(aref)
    mainCard.appendChild(cardMenu)
    return mainCard
  }
}



class Books {
  #books: Book[]
  constructor() {
    this.#books = []
  }
  getBooks() {
    return this.#books
  }
  addBook(bookData: FormData | Book): Book {

    if ("id" in bookData && "createCard" in bookData) {

      this.#books.push(bookData as Book)
      return bookData
    } else {

      const formObj = Object.fromEntries(bookData as FormData)
      const book = new Book({
        title: formObj.title as string,
        description: formObj.description as string,
        pages: Number(formObj.pages),
        isRead: formObj?.isRead === 'on' ? true : false
      })

      this.#books.push(book)
      return book
    }
  }
  removeBook(id: number | string | undefined): boolean {

    if (typeof id === "string" || id) {
      this.#books = this.#books.filter((book) => book.id !== Number(id))
      return true
    }
    return false
  }
  getBook(id: string | number | undefined): Book | undefined {
    if (id === "string" || id) {
      return this.#books.filter(book => book.id === Number(id))[0]
    } else {
      return
    }
  }

}


function main() {
  let books = new Books()
  const cardContainer = document.querySelector(".book__layout")
  const form = document.querySelector(".form")! as HTMLFormElement
  const modalClose = document.querySelector(".modal__close")
  const createBook = document.getElementById("create__book")
  const mobydick = new Book({ title: "Moby-Dick", description: "Moby-Dick; or, The Whale is an 1851 epic novel by American writer Herman Melville.", pages: 682, isRead: false, })

  cardContainer?.addEventListener("click", (e) => {
    const targ = e.target as Element


    //somethime maybe we hit the outline of icon 
    //so i add this to check the action
    const action = targ.parentElement?.hasAttribute("id")
      ? targ.parentElement : targ.parentElement?.parentElement;

    const parrent = action?.parentElement?.parentElement


    if (action?.id === "delete") {
      if (books.removeBook(parrent?.id))
        parrent?.remove()
    }

    if (targ.parentElement?.id === "read") {
      const isUpdatedSuccesfully = books.getBook(parrent?.id)?.setIsRead()

      if (isUpdatedSuccesfully) {
        parrent?.classList.add("read")

      } else {
        parrent?.classList.remove("read")

      }
    }

  })



  createBook?.addEventListener("click", () => {

    form.reset()
    document.getElementsByClassName("modal")[0].classList.toggle("modal__hide")
  })

  modalClose?.addEventListener("click", () => {
    form.reset()
    document.getElementsByClassName("modal")[0].classList.toggle("modal__hide")
  })


  form.addEventListener("submit", (e: Event) => {
    e.preventDefault()
    const formData = new FormData(form)

    const newBook = books.addBook(formData)
    newBook.createCard()
    document.getElementsByClassName("modal")[0].classList.toggle("modal__hide")
  })
  books.addBook(mobydick)

  for (const book of books.getBooks()) {
    cardContainer?.appendChild(book.createCard())
  }

  return { books }// WARN: only for debug

}


const m = main() // WARN: only for debug

