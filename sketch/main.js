"use strict"
function drawContent() {
  const container = document.querySelector(".main-container");
  for (let j = 0; j < 15; j++) {

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("collumn")
    for (let i = 0; i < 15; i++) {
      const div = document.createElement("div");
      div.classList.add("collumn-item")

      mainDiv.appendChild(div)

    }
    container.appendChild(mainDiv)
  }
}


drawContent()
const select = document.querySelector(".main-container")
select.addEventListener("click", (e) => {
  console.log(e.target)

})
