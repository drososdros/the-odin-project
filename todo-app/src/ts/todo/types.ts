
export type Priority = 1 | 2 | 3

export interface TaskType {
  name: string
  isCompleted: boolean
  priority: Priority
}

export interface TodoType {
  title: string
  date: Date
  isCompleted: boolean
  tasks: TaskType[]
}
