import { generateTodo } from "../randomData/createRandomTodos";
import { Task } from "../todo/task";
import { Todo } from "../todo/todo";
import { TodoList } from "../todo/todoList";
import { TodoType } from "../todo/types";

export class TodoListToDom {
  root: Element
  todoList: TodoList

  constructor() {
    this.root = document.querySelector("#root")!
    this.todoList = new TodoList()
    //WARN: this is only to generate random data
    this.todoList.add(generateTodo(100))
  }


  renderGridToDom() {
    const grid = document.createElement("div")
    grid.classList.add("grid-all")

    for (const todo of this.todoList.todoList) {

      grid.appendChild(this.renderTodoToDom(todo))
    }
    this.root.appendChild(grid)

  }

  renderTodoToDom(todo: Todo) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.appendChild(this.renderTodoHeader(todo))
    card.appendChild(this.renderTasksToDom(todo.tasks))
    return card
  }

  renderTodoHeader(todo: Partial<TodoType>) {

    const title = document.createElement("p")
    title.classList.add("card__header__title")
    title.textContent = todo.title!


    const cardHead = document.createElement("div")
    cardHead.classList.add("card__head")
    const cardHeader = document.createElement("div")
    cardHeader.classList.add("card__header")

    const cardHeaderDate = document.createElement("p")
    cardHeaderDate.classList.add("card__header__date")
    cardHeaderDate.textContent = todo.date!.toLocaleDateString()
    const cardHeaderMenu = document.createElement("div")
    cardHeaderMenu.classList.add("card__header__menu")
    cardHeaderMenu.textContent = "..."
    cardHeader.appendChild(cardHeaderDate)
    cardHeader.appendChild(cardHeaderMenu)

    cardHead.appendChild(title)
    cardHead.appendChild(cardHeader)
    return cardHead


  }




  renderTasksToDom(tasks: Task[]) {
    const cardList = document.createElement("ul")
    cardList.classList.add("card__list")

    for (const task of tasks) {
      const cardItem = document.createElement("li")
      cardItem.classList.add("card__item")
      cardItem.id = task.id.toString()
      cardItem.textContent = task.name
      cardList.appendChild(cardItem)
    }
    return cardList
  }



}


