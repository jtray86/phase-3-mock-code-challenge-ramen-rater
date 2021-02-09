const menuBar = document.querySelector('#ramen-menu')
const url = "http://localhost:3000/ramens"
const menuDetail = document.querySelector('#ramen-detail')

function fetchMenuItems(){
    fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(item => displayMenu(item)))
}
fetchMenuItems()

function displayMenu(item){
    const menuImg = document.createElement("img")
    menuImg.setAttribute("src", item.image)
    // menuImg.setAttribute("data-id", item.id)
    menuImg.dataset.id = item.id
    // console.log(menuImg)

    menuBar.append(menuImg)
}

menuBar.addEventListener('click', itemClick)
function itemClick(event){
    // console.log(event.target.dataset.id)
    const itemId = event.target.dataset.id
    fetch (`${url}/${itemId}`)
    .then(res => res.json())
    .then(data => displayMenuItem(data))
}

function displayMenuItem(data){
    // console.log(data)
    menuDetail.dataset.id = data.id
    menuDetail.innerHTML = `
    <img class="detail-image" src=${data.image} alt=${data.name} />
    <h2 class="name">${data.name}</h2>
    <h3 class="restaurant"> ${data.restaurant} </h3>
    `
    formDisplayInputs(data)
}

const form = document.querySelector('#ramen-rating')

function formDisplayInputs(data){
    // console.log(data)
    form.dataset.id = data.id
    form.innerHTML = `
    <label for="rating">Rating: </label>
      <input type="text" name="rating" id="rating" value="${data.rating}" />
      <label for="comment">Comment: </label>
      <textarea name="comment" id="comment">${data.comment}</textarea>
      <input type="submit" value="Update" />
    `
}

form.addEventListener('submit', newRating)

function newRating(event){
    event.preventDefault()
//    console.log(event.target.dataset.id)
    const itemId = event.target.dataset.id
    const rating = event.target.rating.value
    const comment = event.target.comment.value
    // console.log(comment)
    const updatedInfo = {rating, comment}
    newInfo(updatedInfo, itemId)

}
function newInfo(updatedInfo, itemId){
    fetch (`${url}/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            Accept: "application/json" 
        },
        body: JSON.stringify(updatedInfo)
      })
    //   .then(response => response.json())
    //   .then(item => console.log(item))
   
}



