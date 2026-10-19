    let container = document.querySelector(".product-container")
    let search = document.querySelector("#Search")
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let btn = document.querySelector(".btn")

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

    btn.addEventListener("click" , (e) => {
        let image = document.querySelector("#img").value
        let name = document.querySelector("#name").value
        let price = document.querySelector("#price").value
        let off = document.querySelector("#off").value
        let desc = document.querySelector("#des").value
        let imgError = document.querySelector("#img-error")
        let nameError = document.querySelector("#name-error")
        let priceError = document.querySelector("#price-error")

        let allowedExt = /\.(jpg|jpeg|png|webp)$/i;

        if(image.trim() === ""){
            imgError.innerText = "image is required*"
            imgError.style.color = "red"
            return 
        }else if(!allowedExt.test(image)){
            imgError.innerText = "Enter valid Extension*"
            imgError.style.color = "red"
            return 
        }else{
            imgError.innerText = ""
        }

        if(name.trim() === ""){
            nameError.innerText = "name is required*"
            nameError.style.color = "red"
            return 
        }else{
            nameError.innerText = ""
        }
        
        if(price.trim() === ""){
            priceError.innerText = "Price is required*"
            priceError.style.color = "red"
            return 
        }else{
            priceError.innerText = ""
        }

        let newProduct = {
            id: Date.now(),
            image,
            name,
            price : Number(price),
            off,
            desc
        }
        products.push(newProduct)
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts()  
    })

    products.sort((a , b) => b.price - a.price)
    renderProducts()

    function renderProducts(){
        container.innerHTML = ""

        products.forEach(p => {
        let card = document.createElement("div")
        card.classList.add("card")

        let image = document.createElement("img")
        image.src = p.image
        image.classList.add("card-img")

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

        let delBtn = document.createElement("button")
        delBtn.innerText = "Del"
        delBtn.classList.add("button")



        delBtn.addEventListener("click" , () => {
            products = products.filter(item => item.id !== p.id);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts();
        })


        rate.append(price , off)
        card.append(image , name , rate , delBtn)
        container.appendChild(card)
        });
        document.querySelector("#img").value = "";
        document.querySelector("#name").value = "";
        document.querySelector("#price").value = "";
        document.querySelector("#off").value = "";
    }
    renderProducts()