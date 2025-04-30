"use strict"
const buttonList = ["=", "+", "-", "*", "/", "%", "3", "6", "9", ")", ".", "2", "5", "8", "(", "0", "1", "4", "7", "c"]
function createButtons() {
  /*
   here i create the buttons dynamicaly for the keyboard
   i have reserve order to use the pop and append method
   i use it dynamicaly so i can modify from here the classes they need
   this app use eval so be carefull only do a basic check
   
   */
  const buttons = buttonList.map((btn) => {
    const button = document.createElement("button")
    button.classList.add("btn")
    if (!isNaN(btn)) {
      button.classList.add("number")
    }
    button.textContent = btn
    return button

  })
  const mainKeyboard = document.querySelector(".keyboard")
  while (buttons.length !== 0) {
    const keyRow = document.createElement("div")
    keyRow.classList.add("row")

    for (let col = 0; col < 5; col++) {
      let ele = buttons.pop()
      keyRow.appendChild(ele)

    }
    mainKeyboard.appendChild(keyRow)

  }
}
function displayeResult(operation, result) {
  const divContainer = document.createElement("div")
  const divOperation = document.createElement("div")
  divOperation.classList.add("operation")
  divOperation.textContent = operation

  const divAssignment = document.createElement("div")
  divAssignment.textContent = "="
  divAssignment.classList.add("assingment")
  const divResult = document.createElement("div")
  divResult.classList.add("result")
  divResult.textContent = result
  divContainer.classList.add("result-container")
  divContainer.appendChild(divOperation)
  divContainer.appendChild(divAssignment)
  divContainer.appendChild(divResult)

  return divContainer


}
function main() {
  const allData = document.querySelector("body")
  const input = document.querySelector(".calculate")
  const keyboard = document.querySelector(".keyboard")
  const errorMessage = document.querySelector(".error-message")
  const passResult = document.querySelector(".past-results")
  allData.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const operation = input.value
      const result = evaluate(input.value, errorMessage)
      if (result) {
        input.value = ""
        input.value += result
        passResult.appendChild(displayeResult(operation, result))

      }

    }
  })
  // input.addEventListener("input", () => errorMessage.textContent = "")
  passResult.addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains("result-container")) {
      input.value = ""
      input.value = e.target.parentNode.firstChild.textContent

    }

  })
  keyboard.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      errorMessage.textContent = ""
      if (e.target.textContent === "c") {
        input.value = ""

      } else if (e.target.textContent === "=") {

        const operation = input.value
        const result = evaluate(input.value, errorMessage)
        if (result) {
          input.value = ""
          input.value += result
          passResult.appendChild(displayeResult(operation, result))

        }
      }
      else {
        input.value += e.target.textContent
      }

    }
  })
}
function checkExpresion(s) {

  let strArr = s.split("")
  for (const letter of strArr) {
    if (!buttonList.includes(letter) || letter === "=") {
      throw new Error("not valid expression")
    }
  }
  return s







}

function evaluate(s, errorMessage) {
  try {
    s = checkExpresion(s)
    return eval(s)

  } catch (e) {
    errorMessage.textContent = "Malformed expression"
    return

  }




}


createButtons()
main()

