import { Todo } from "../todo/todo";
import { Task } from "../todo/task";
import { randInt, randomTaskData } from "./helpers";
import { Priority } from "../todo/types";





export function generateTodo(todoCount: number) {

  const todoList: Todo[] = []

  for (let i = 0; i < todoCount; i++) {
    let title = `Day ${i + 1}`
    let date = new Date()
    date.setDate(date.getDate() + i)

    const todo = new Todo(title, date)
    const randomTaskNumber = randInt(3, 10)

    for (let i = 0; i < randomTaskNumber; i++) {
      const randomTask = new Task({ name: randomTaskData(), isCompleted: false, priority: randInt(1, 3) as Priority })


      todo.add(randomTask)

    }
    todoList.push(todo)




  }
  return todoList


}
