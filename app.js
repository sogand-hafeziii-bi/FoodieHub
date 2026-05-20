//scroll animation


  AOS.init({
    duration: 1000, // مدت زمان انیمیشن (میلی‌ثانیه)
    once: false, // فقط یک بار اجرا نشود
  });

 




//search

document.getElementById("search-box").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const products = document.querySelectorAll(".card");

    products.forEach(card => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        if (title.includes(searchText)) {
            card.style.display = "block";  // نمایش محصول
        } else {
            card.style.display = "none";  // مخفی کردن محصول
        }
    });
});

//search animation

document.getElementById("search-box").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const products = document.querySelectorAll(".card");

    products.forEach(card => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        
        if (title.includes(searchText)) {
            card.classList.remove("hide"); // نمایش محصول با افکت
        } else {
            card.classList.add("hide"); // مخفی کردن محصول با افکت
        }
    });
});


//add to cart

let cart = [];

function toggleCart() {
    document.querySelector(".cart-dropdown").classList.toggle("active");
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} تومان</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
        `;

        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = cart.length;
}

function addToCart(event) {
    let card = event.target.closest(".card");
    let name = card.getAttribute("data-name");
    let price = parseInt(card.getAttribute("data-price"));
    let image = card.getAttribute("data-image");

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    updateCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
});


//notification
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const card = this.closest(".card");
            const foodName = card.getAttribute("data-name");
            const price = card.getAttribute("data-price");

            Toastify({
                text: `${foodName} (${price} تومان) به سبد خرید اضافه شد!`,
                duration: 3000,
                gravity: "bottom",
                position: "left",
                backgroundColor: "#4CAF50",
                stopOnFocus: true
            }).showToast();
        });
    });
});



//comment section slider


$(document).ready(function(){
    if ($.fn.slick) {
        $('.comments-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2000,
            rtl: true
        });
    } else {
        console.error("Slick Slider بارگذاری نشده است.");
    }
});