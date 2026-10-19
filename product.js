let container = document.querySelector("#card-container");
let search = document.querySelector("#Search")
let products = JSON.parse(localStorage.getItem("products")) || [];
let modal = document.querySelector("#imgModal")
let modalImage = document.querySelector("#modalImage")
let modalTitle = document.querySelector("#modalTitle")
let modalDesc = document.querySelector("#modalDesc")
let modalPrice = document.querySelector("#modalPrice")
let closeModal = document.querySelector("#closeModal")

products.forEach((p) => {
    let card = document.createElement("div")
    card.classList.add("card")

    let image = document.createElement("img")
    image.src = p.image
    image.classList.add("card-img")

    image.addEventListener("click" , (e) => {
        e.stopPropagation()

        modalOpen(p)
    })

    let name = document.createElement("span");
    name.innerText = p.name
    name.classList.add("name")

    let rate = document.createElement("div")
    rate.classList.add("rate")

    let price = document.createElement("p")
    price.innerText = "Rs." + p.price
    price.classList.add("price")

    let off = document.createElement("p")
    off.innerText = p.off
    off.classList.add("off")

    let addToCart = document.createElement("button")
    addToCart.innerText = "Add to Cart"
    addToCart.classList.add("button")

    addToCart.addEventListener("click", () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    alert("Add to Cart")
    let exist = cart.find(item => item.id === p.id);
    if(exist){
        exist.qty += 1;
    }else{
        cart.push({
            ...p,
            qty: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
});

    rate.append(price , off)
    card.append(image , name , rate , addToCart)
    container.appendChild(card)

})

search.addEventListener("input" , () => {
    let value = search.value.toLowerCase()
    let allPro = document.querySelectorAll(".card")
    allPro.forEach(card => {
        let name = card.querySelector(".name").innerText.toLowerCase()
        if(name.includes(value)){
            card.style.display = "flex"
        }else{
            card.style.display = "none"
        }
    })
})



function modalOpen(product){
    modal.style.display = "flex"

    modalImage.src = product.image
    modalTitle.innerText = product.name
    modalDesc.innerText = product.desc
    modalPrice.innerText = `Rs. ${product.price}`

}

closeModal.addEventListener("click" , () => {
    modal.style.display = "none"
})