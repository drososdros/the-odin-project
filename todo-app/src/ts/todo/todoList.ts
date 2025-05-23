// import { type TodoType } from "./todo"
import { Todo } from "./todo"

export class TodoList {
  todoList: Todo[]

  constructor() {
    this.todoList = []
  }
  add(todo: Todo | Todo[]) {
    if (Array.isArray(todo)) {

      this.todoList.push(...todo)
    } else {

      this.todoList.push(todo)
    }
  }
  remove(id: number) {
    this.todoList = this.todoList.filter(todo => todo.id !== id)
  }
  getTodo(id: number) {
    return this.todoList.find(todo => todo.id === id)
  }

}



