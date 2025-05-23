import { TODOTASKDATA } from "./randomDataTasks"

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomTaskData(): string {
  return TODOTASKDATA[Math.floor(Math.random() * TODOTASKDATA.length)]
}
