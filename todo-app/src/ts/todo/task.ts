import { Priority, TaskType } from "./types"



export class Task implements TaskType {
  static #_id = 1
  #id: number
  name: string
  isCompleted: boolean
  priority: Priority
  constructor({ name, isCompleted, priority }: TaskType) {
    this.#id = Task.#_id
    this.name = name
    this.isCompleted = isCompleted
    this.priority = priority
    Task.#_id++
  }
  get id() {
    return this.#id
  }
  setIsCompleted(isCompleted: boolean = true) {
    this.isCompleted = isCompleted
  }
  update({ name, isCompleted, priority }: Partial<TaskType>) {
    if (name) {

      this.name = name
    }
    if (isCompleted) {

      this.isCompleted = isCompleted
    }
    if (priority) {

      this.priority = priority
    }
  }
}


