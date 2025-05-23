import { TODOTASKDATA } from "./randomDataTasks"

export function randInt(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomTaskData(): string {
  return TODOTASKDATA[Math.floor(Math.random() * TODOTASKDATA.length)]
}
