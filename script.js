
/* =====================================
   KILTA - RESTAURANT MENU & CART SYSTEM
===================================== */

// HOMEPAGE ELEMENTS

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const restaurantCards = document.querySelectorAll(".restaurant-card");
const categoryButtons = document.querySelectorAll(".category");
const noResults = document.getElementById("noResults");

// MENU ELEMENTS

const menuPage = document.getElementById("restaurantMenu");
const menuBanner = document.getElementById("menuBanner");
const menuName = document.getElementById("menuRestaurantName");
const menuDescription = document.getElementById("menuRestaurantDescription");
const menuRating = document.getElementById("menuRating");
const menuTime = document.getElementById("menuTime");
const foodGrid = document.getElementById("foodGrid");
const menuTabs = document.querySelectorAll(".menu-tab");
const emptyFoodMessage = document.getElementById("emptyFoodMessage");

// CART ELEMENTS

const cartBar = document.getElementById("cartBar");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const finalCartTotal = document.getElementById("finalCartTotal");

let selectedCategory = "all";
let selectedMenuCategory = "all";
let currentRestaurant = "";
let cart = [];

// DEMO FOOD DATABASE

const restaurantMenus = {

    "Restaurant Name 1": [
        {
            id: 1,
            name: "Veg Thali",
            category: "main",
            price: 150,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
            description: "Fresh Indian veg thali."
        },
        {
            id: 2,
            name: "Paneer Butter Masala",
            category: "main",
            price: 180,
            image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
            description: "Rich and creamy paneer curry."
        },
        {
            id: 3,
            name: "Samosa",
            category: "snacks",
            price: 20,
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
            description: "Crispy Indian snack."
        },
        {
            id: 4,
            name: "Cold Drink",
            category: "drinks",
            price: 40,
            image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500",
            description: "Chilled refreshing drink."
        }
    ],

    "Restaurant Name 2": [
        {
            id: 5,
            name: "Margherita Pizza",
            category: "main",
            price: 199,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
            description: "Classic cheese pizza."
        },
        {
            id: 6,
            name: "Veg Burger",
            category: "snacks",
            price: 99,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            description: "Fresh and tasty veg burger."
        },
        {
            id: 7,
            name: "French Fries",
            category: "snacks",
            price: 79,
            image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500",
            description: "Golden crispy fries."
        }
    ],

    "Restaurant Name 3": [
        {
            id: 8,
            name: "Classic Burger",
            category: "main",
            price: 129,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            description: "Juicy burger with fresh vegetables."
        },
        {
            id: 9,
            name: "Sandwich",
            category: "snacks",
            price: 89,
            image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
            description: "Freshly prepared sandwich."
        }
    ]

};


// HOMEPAGE SEARCH

function filterRestaurants() {

    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    restaurantCards.forEach(card => {

        const text = card.innerText.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = text.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }

    });

    noResults.hidden = visibleCount !== 0;
}

searchButton.addEventListener("click", filterRestaurants);
searchInput.addEventListener("input", filterRestaurants);


// HOMEPAGE CATEGORY FILTER

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterRestaurants();

    });

});


// OPEN RESTAURANT MENU

restaurantCards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {

        const name = card.querySelector("h3").innerText;
        const image = card.querySelector("img").src;
        const description = card.querySelector("p").innerText;
        const rating = card.querySelector(".card-footer span").innerText;
        const time = card.querySelectorAll(".card-footer span")[1].innerText;

        openRestaurant(name, image, description, rating, time);

    });

});


// RESTAURANT PAGE FUNCTION

function openRestaurant(name, image, description, rating, time) {

    currentRestaurant = name;
    selectedMenuCategory = "all";

    cart = [];
    updateCart();

    menuName.innerText = name;
    menuBanner.src = image;
    menuDescription.innerText = description;
    menuRating.innerText = rating;
    menuTime.innerText = time;

    document.querySelector(".hero").hidden = true;
    document.getElementById("categoriesSection").hidden = true;
    document.getElementById("restaurants").hidden = true;
    document.querySelector(".footer").hidden = true;

    menuPage.hidden = false;

    menuTabs.forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.category === "all"
        );
    });

    renderFood();

    window.scrollTo({ top: 0, behavior: "smooth" });
}


// RENDER FOOD CARDS

function renderFood() {

    const foods = restaurantMenus[currentRestaurant] || [];

    const filteredFoods = foods.filter(food => {

        return selectedMenuCategory === "all" ||
               food.category === selectedMenuCategory;

    });

    foodGrid.innerHTML = "";

    filteredFoods.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">

            <div class="food-details">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="food-price">₹${food.price}</span>

                    <button class="add-food-button">
                        ADD +
                    </button>

                </div>

            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            addToCart(food);
        });

        foodGrid.appendChild(card);

    });

    emptyFoodMessage.hidden = filteredFoods.length !== 0;

}


// MENU CATEGORY FILTER

menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        menuTabs.forEach(button =>
            button.classList.remove("active")
        );

        tab.classList.add("active");

        selectedMenuCategory = tab.dataset.category;

        renderFood();

    });

});


// ADD FOOD TO CART

function addToCart(food) {

    const existingItem = cart.find(item => item.id === food.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();

}


// UPDATE CART

function updateCart() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartCount.innerText = `${totalItems} Items`;

    cartTotal.innerText = `₹${totalPrice}`;

    finalCartTotal.innerText = `₹${totalPrice}`;

    cartBar.hidden = totalItems === 0;

    renderCartItems();

}


// SHOW CART ITEMS

function renderCartItems() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {

        const row = document.createElement("div");

        row.className = "cart-item";

        row.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>₹${item.price} each</small>
            </div>

            <div class="quantity-controls">

                <button class="minus">−</button>

                <strong>${item.quantity}</strong>

                <button class="plus">+</button>

            </div>
        `;

        row.querySelector(".minus").addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        row.querySelector(".plus").addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        cartItems.appendChild(row);

    });

}


// CHANGE QUANTITY

function changeQuantity(id, change) {

    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    updateCart();

}


// OPEN CART

document.getElementById("viewCartButton").addEventListener("click", () => {

    cartModal.hidden = false;

});


// CLOSE CART

document.getElementById("closeCart").addEventListener("click", () => {

    cartModal.hidden = true;

});


// CONTINUE SHOPPING

document.getElementById("continueShopping").addEventListener("click", () => {

    cartModal.hidden = true;

});


// BACK TO RESTAURANTS

document.getElementById("backToRestaurants").addEventListener("click", () => {

    menuPage.hidden = true;

    document.querySelector(".hero").hidden = false;
    document.getElementById("categoriesSection").hidden = false;
    document.getElementById("restaurants").hidden = false;
    document.querySelector(".footer").hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });

});


// LOGIN BUTTON

document.querySelector(".login-btn").addEventListener("click", () => {

    alert("KILTA Customer Login Coming Soon!");

});


console.log("KILTA Restaurant Menu System Loaded!");
