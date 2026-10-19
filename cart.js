let container = document.querySelector(".cart-container");
let search = document.querySelector("#Search")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let modal = document.querySelector("#imgModal")
let modalImage = document.querySelector("#modalImage")
let modalTitle = document.querySelector("#modalTitle")
let modalDesc = document.querySelector("#modalDesc")
let modalPrice = document.querySelector("#modalPrice")
let closeModal = document.querySelector("#closeModal")

search.addEventListener("input" , () => {
    let value = search.value.toLowerCase()
    let allPro = document.querySelectorAll(".container")
    allPro.forEach(card => {
        let name = card.querySelector(".name").innerText.toLowerCase()
        if(name.includes(value)){
            card.style.display = "flex"
        }else{
            card.style.display = "none"
        }
    })
})

function renderCart() {
    container.innerHTML = "";

    cart.forEach((p) => {
        let div = document.createElement("div");
        div.classList.add("container")

        let image = document.createElement("img");
        image.src = p.image
        image.classList.add("image")

        image.addEventListener("click" , (e) => {
            e.stopPropagation()

            modalOpen(p)
        })

        let name = document.createElement("p");
        name.innerText = p.name
        name.classList.add("name")

        let quantity = document.createElement("div")
        quantity.classList.add("qty-container")

        let add = document.createElement("button")
        add.innerText = "+"
        add.classList.add("add")

        let qtyy = document.createElement("p")
        qtyy.innerText = p.qty
        qtyy.classList.add("qty")

        let sub = document.createElement("button")
        sub.innerText = "-"
        sub.classList.add("sub")

       let pcon = document.createElement("div")
       pcon.classList.add("pcon")

        let Tprice = document.createElement("p")
        Tprice.innerText = "Rs." + (p.price * p.qty)
        Tprice.classList.add("price")

        let off = document.createElement("p")
        off.innerText = p.off
        off.classList.add("off")

        let remove = document.createElement("button")
        remove.innerText = "Del"
        remove.classList.add("remove")

        add.addEventListener("click" , () => {
            p.qty++;

            saveAndRender()
        })


        sub.addEventListener("click" , () => {
            if(p.qty > 1){
                p.qty--;
            }else{
                cart = cart.filter(i => i.id !== p.id)
            }
            saveAndRender()
        })

        remove.addEventListener("click" , () => {
            cart = cart.filter(i => i.id !== p.id)
            saveAndRender()
        })

        quantity.append(add, qtyy , sub)
        pcon.append(Tprice , off)
        div.append(image , name , quantity , pcon , remove)
        container.appendChild(div)

    });
}

function saveAndRender(){
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
 
renderCart();

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