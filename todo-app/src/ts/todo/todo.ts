import { TodoType } from "./types"
import { Task } from "./task"


export class Todo implements TodoType {
  static #_id = 1
  #id: number
  title: string
  date: Date
  isCompleted: boolean
  tasks: Task[]
  constructor(
    title: string,
    date: Date,
    tasks: Task[] = [],
  ) {
    this.#id = Todo.#_id
    this.title = title
    this.date = date
    this.isCompleted = false
    this.tasks = tasks
    Todo.#_id++
  }
  get id() {
    return this.#id
  }
  add(todo: Task) {
    this.tasks.push(todo)
  }
  remove(id: number) {
    this.tasks = this.tasks.filter((todo: Task) => todo.id !== id)
  }
  setIsCompleted(isCompleted: boolean = true) {
    this.isCompleted = isCompleted
    for (const task of this.tasks) {
      task.setIsCompleted(isCompleted)
    }
  }
  getTask(id: number) {
    return this.tasks.find(task => task.id === id)
  }

}

