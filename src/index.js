const menuBar = document.querySelector('#ramen-menu')
const url = "http://localhost:3000/ramens"

function fetchMenuItems(){
    fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(item => displayMenu(item)))
}
fetchMenuItems()

function displayMenu(item){
    const menuImg = document.createElement("img")
    menuImg.setAttribute("src", item.image)
    menuImg.setAttribute("data-id", item.id)
    console.log(menuImg)

    menuBar.append(menuImg)
}


