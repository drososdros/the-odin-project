"use strict"
function drawContent(value) {
  const container = document.querySelector(".main-container");
  for (let j = 0; j <= value; j++) {

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("collumn")
    for (let i = 0; i <= value; i++) {
      const div = document.createElement("div");
      div.classList.add("collumn-item")

      mainDiv.appendChild(div)

    }
    container.appendChild(mainDiv)
  }
}

function resetGrid(gridSelector) {

  while (select.hasChildNodes()) {
    select.firstChild.remove()

  }
  drawContent(gridSelector.value)
}



drawContent(8)
const select = document.querySelector(".main-container")
const color = document.querySelector("#color")
const resetBtn = document.querySelector(".reset-btn")
const gridSelector = document.querySelector("#grid-selector")
const gridValue = document.getElementById("grid-value")
gridSelector.value = 8
gridValue.textContent = "8x8"

select.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("collumn") && !e.target.classList.contains("main-container")) {
    e.target.style.backgroundColor = color.value
    e.target.style.border = `.1px solid ${color.value}`

  }

})

resetBtn.addEventListener("click", () => {
  if (resetBtn.textContent !== "reset") {
    resetBtn.textContent = "reset"

  }
  resetGrid(gridSelector)
})

gridSelector.addEventListener("input", (e) => {

  gridValue.textContent = `${e.target.value}x${e.target.value}`
  resetBtn.textContent = "Change grid"

})
