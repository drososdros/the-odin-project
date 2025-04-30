"use strict"
function createButtons() {
  /*
   here i create the buttons dynamicaly for the keyboard
   i have reserve order to use the pop and append method
   i use it dynamicaly so i can modify from here the classes they need
   
   */
  const buttonList = ["=", "+", "-", "x", "/", "%", "3", "6", "9", ")", ".", "2", "5", "8", "(", "0", "1", "4", "7", "c"]
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

createButtons()
