// ==========================================
// 1. FIREBASE CONFIGURATION & IMPORTS
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Credential Details
const firebaseConfig = {
    apiKey: "AIzaSyByG-z3SoQtpQVbTUqDilACQmAu4IozgT0",
    authDomain: "anuj-tech-mart.firebaseapp.com",
    projectId: "anuj-tech-mart",
    storageBucket: "anuj-tech-mart.firebasestorage.app",
    messagingSenderId: "1002969372812",
    appId: "1:1002969372812:web:a1d05661c3151e5f8f43a9",
    measurementId: "G-RHQLSBYNZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 2. PRODUCT INVENTORY (Data)
// ==========================================
const products = [
    {
        id: 1,
        name: "Ultra Watch Series 9 (Original)",
        price: 2499,
        oldPrice: 8999,
        desc: "100% Authentic Unit. AMOLED Display, Bluetooth Calling, 45mm Dial. Comes with Brand Warranty card inside box. IP68 Water Resistant.",
        colorImages: {
            "Midnight Black": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
            "Sunset Orange": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
            "Starlight Silver": "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80"
        ],
        colors: ["#000000", "#ff7f50", "#c0c0c0"],
        colorNames: ["Midnight Black", "Sunset Orange", "Starlight Silver"]
    },
    {
        id: 2,
        name: "Pro ANC Earbuds (Verified)",
        price: 1299,
        oldPrice: 3999,
        desc: "Genuine Active Noise Cancellation. Verified Serial Number. 30 Hrs Battery. Pure Bass Sound. Sweat Proof.",
        colorImages: {
             "Pure White": "https://images.unsplash.com/photo-1603351154351-5cf99bc75403?auto=format&fit=crop&w=600&q=80",
             "Matte Black": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1603351154351-5cf99bc75403?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1603351154351-5cf99bc75403?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
        ],
        colors: ["#ffffff", "#000000"],
        colorNames: ["Pure White", "Matte Black"]
    },
    {
        id: 3,
        name: "Mechanical Keyboard RGB",
        price: 1899,
        oldPrice: 4500,
        desc: "Authentic Blue Switches. Metal Body. Customizable RGB Lighting modes. High durability keys rated for 50 million clicks.",
        colorImages: {
            "Black Base": "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=600&q=80",
            "White Base": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
        ],
        colors: ["#000000", "#ffffff"],
        colorNames: ["Black Base", "White Base"]
    },
    {
        id: 4,
        name: "Sony Style Headphones",
        price: 999,
        oldPrice: 2499,
        desc: "Deep Bass. Wireless Bluetooth 5.0. Soft Cushions. 100% QC Passed. Built-in Mic for clear calls.",
        colorImages: {
            "Black": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            "Blue": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80"
        ],
        colors: ["#000000", "#0000FF"],
        colorNames: ["Black", "Blue"]
    }
];

// App State
let cart = [];
let currentProduct = null;
let selectedColorName = "";

// ==========================================
// 3. PAGE INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Products
    renderProductGrid();
    
    // 2. Init Swiper Carousel
    try {
        new Swiper(".mySwiper", {
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    } catch (e) {
        console.log("Swiper loading...", e);
    }
});

// ==========================================
// 4. DISPLAY FUNCTIONS
// ==========================================

// Render Product Grid
function renderProductGrid() {
    const grid = document.getElementById("product-grid");
    if(!grid) return;

    grid.innerHTML = products.map(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        return `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.mainImg}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="price-box">
                    <span>₹${product.price}</span>
                    <span class="old-price">₹${product.oldPrice}</span>
                    <span class="discount-tag">${discount}% OFF</span>
                </div>
                <button class="btn-view">View Details</button>
            </div>
        </div>
        `;
    }).join("");
}

// ==========================================
// 5. GLOBAL WINDOW FUNCTIONS
// ==========================================

// --- Open Product Popup ---
window.openProductModal = function(id) {
    currentProduct = products.find(p => p.id === id);
    selectedColorName = currentProduct.colorNames[0];

    // Populate Modal Text
    document.getElementById("modal-title").innerText = currentProduct.name;
    document.getElementById("modal-price").innerText = "₹" + currentProduct.price;
    document.getElementById("modal-old-price").innerText = "₹" + currentProduct.oldPrice;
    document.getElementById("modal-desc").innerText = currentProduct.desc;
    document.getElementById("selected-color-name").innerText = selectedColorName;
    
    // Set Image based on default color
    document.getElementById("main-view-img").src = currentProduct.colorImages[selectedColorName];

    // Render Color Options
    document.getElementById("color-options").innerHTML = currentProduct.colors.map((colorCode, index) => `
        <div class="color-circle ${index === 0 ? 'selected' : ''}" 
             style="background-color: ${colorCode}" 
             onclick="selectColor(this, '${currentProduct.colorNames[index]}')"
             title="${currentProduct.colorNames[index]}">
        </div>
    `).join("");

    // Render Thumbnails
    document.getElementById("thumbnail-container").innerHTML = currentProduct.gallery.map(img => `
        <img src="${img}" class="thumb-img" onclick="changeMainImg('${img}', this)">
    `).join("");

    // Highlight first thumbnail
    const thumbs = document.getElementsByClassName("thumb-img");
    if(thumbs.length > 0) thumbs[0].classList.add("active-thumb");

    document.getElementById("product-modal").style.display = "flex";
};

// --- Close Popup ---
window.closeProductModal = function() {
    document.getElementById("product-modal").style.display = "none";
};

// --- Change Main Image from Thumbnail ---
window.changeMainImg = function(src, element) {
    document.getElementById("main-view-img").src = src;
    document.querySelectorAll(".thumb-img").forEach(img => img.classList.remove("active-thumb"));
    element.classList.add("active-thumb");
};

// --- Select Color & Update Image ---
window.selectColor = function(element, name) {
    selectedColorName = name;
    document.getElementById("selected-color-name").innerText = name;
    
    // UI Update
    document.querySelectorAll(".color-circle").forEach(c => c.classList.remove("selected"));
    element.classList.add("selected");

    // Switch Main Image to matched color
    if(currentProduct.colorImages[name]) {
        document.getElementById("main-view-img").src = currentProduct.colorImages[name];
    }
};

// --- Buy Now Button ---
window.buyNowFromModal = function() {
    cart = [{
        ...currentProduct,
        selectedColor: selectedColorName,
        mainImg: currentProduct.colorImages[selectedColorName]
    }];
    updateCartUI();
    closeProductModal();
    toggleCart(); // Open Cart Modal
};

// --- Toggle Cart Modal & Update Dates ---
window.toggleCart = function() {
    const modal = document.getElementById("cart-modal");
    
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
        // Reset View
        document.getElementById("checkout-view").style.display = "block";
        document.getElementById("success-view").style.display = "none";
        
        // --- Calculate Dates ---
        const today = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(today.getDate() + 3); // 3 Days later

        // Date Format: "Mon, 12 Oct"
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        
        // Update Cart Text
        document.getElementById("delivery-date-text").innerText = 
            `Free Delivery by ${deliveryDate.toLocaleDateString('en-US', options)}`;
        
        // Update Tracking Timeline
        document.getElementById("track-date-today").innerText = 
            today.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        
        document.getElementById("track-date-delivery").innerText = 
            deliveryDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    }
};

// --- Scroll Helper ---
window.scrollToProducts = function() {
    document.getElementById("products").scrollIntoView({behavior: 'smooth'});
};

// --- Update Cart HTML ---
function updateCartUI() {
    const list = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const countEl = document.getElementById("cart-count");
    
    let total = 0;
    
    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; color:#777; padding:20px;'>Cart is empty.</p>";
    } else {
        list.innerHTML = cart.map(item => {
            total += item.price;
            return `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <div style="display:flex; gap:10px;">
                    <img src="${item.mainImg}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">
                    <div>
                        <div style="font-weight:bold; font-size:0.9rem;">${item.name}</div>
                        <div style="font-size:0.8rem; color:#555;">Color: ${item.selectedColor}</div>
                    </div>
                </div>
                <div style="font-weight:bold;">₹${item.price}</div>
            </div>`;
        }).join("");
    }
    totalEl.innerText = "₹" + total;
    countEl.innerText = cart.length;
}

// ==========================================
// 6. INSTANT ORDER SUBMISSION LOGIC
// ==========================================
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop Page Reload

        if (cart.length === 0) {
            alert("Cart is empty.");
            return;
        }

        // --- 1. INSTANT SUCCESS (Optimistic UI) ---
        document.getElementById("checkout-view").style.display = "none";
        document.getElementById("success-view").style.display = "block";
        document.getElementById("success-order-id").innerText = "Generating ID..."; // Placeholder

        // --- 2. Calculate Delivery Date for Backend ---
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        // --- 3. Prepare Data ---
        const orderData = {
            customerName: document.getElementById("cust-name").value,
            customerPhone: document.getElementById("cust-phone").value,
            customerAddress: document.getElementById("cust-address").value,
            items: cart,
            totalAmount: document.getElementById("cart-total").innerText,
            paymentMode: "COD",
            orderDate: new Date().toISOString(),
            expectedDelivery: deliveryDate.toDateString(),
            status: "Order Placed"
        };

        // --- 4. Send to Firebase (Background) ---
        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);
            
            // Update UI with real ID
            document.getElementById("success-order-id").innerText = docRef.id;
            console.log("Order Synced:", docRef.id);
            
            // Clear Cart Data
            cart = [];
            document.getElementById("cart-count").innerText = "0";
            checkoutForm.reset();

        } catch (error) {
            console.error("Order Error:", error);
            document.getElementById("success-order-id").innerText = "Offline-Pending";
        }
    });
}
