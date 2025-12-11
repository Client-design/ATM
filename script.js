// ==========================================
// 1. FIREBASE CONFIGURATION & IMPORTS
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
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
const analytics = getAnalytics(app);
const db = getFirestore(app); // Database Connection

// ==========================================
// 2. PRODUCT DATA (The Shop Inventory)
// ==========================================
const products = [
    {
        id: 1,
        name: "Ultra Watch Series 9 (AMOLED)",
        price: 2499,
        oldPrice: 8999,
        desc: "Experience the ultimate smart wearable. Features a 2.0-inch infinite display, Bluetooth calling, health tracking (SpO2, Heart Rate), and 5-day battery life. IP68 Water Resistant.",
        // Different images for different colors
        colorImages: {
            "Midnight Black": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
            "Sunset Orange": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
            "Starlight Silver": "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80"
        },
        // Default Main Image
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
        name: "Pro ANC Wireless Earbuds",
        price: 1299,
        oldPrice: 3999,
        desc: "Immerse yourself in music with Active Noise Cancellation. Transparency mode, sweat resistance, and 30-hour playback with the case. 10mm Drivers for deep bass.",
        colorImages: {
            "Pure White": "https://images.unsplash.com/photo-1603351154351-5cf99bc75403?auto=format&fit=crop&w=600&q=80",
            "Matte Black": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1603351154351-5cf99bc75403?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1603351154351-5cf99bc75403?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1629367494173-c78a56567877?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
        ],
        colors: ["#ffffff", "#000000"],
        colorNames: ["Pure White", "Matte Black"]
    },
    {
        id: 3,
        name: "RGB Mechanical Keyboard",
        price: 1899,
        oldPrice: 4500,
        desc: "Pro-level gaming keyboard with blue mechanical switches. Customizable RGB lighting effects and durable aluminum build. Anti-ghosting keys.",
        colorImages: {
             "Black Base": "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=600&q=80",
             "White Base": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
        ],
        colors: ["#000000", "#ffffff"],
        colorNames: ["Black Base", "White Base"]
    },
    {
        id: 4,
        name: "Sony Style Over-Ear Headphones",
        price: 999,
        oldPrice: 2499,
        desc: "Deep Bass sound profile. Comfortable ear cushions for long listening sessions. Bluetooth 5.0 connectivity and built-in microphone.",
        colorImages: {
            "Black": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            "Blue": "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80"
        },
        mainImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1524678606372-987d7e66c451?auto=format&fit=crop&w=600&q=80"
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
// 3. CORE FUNCTIONS (Attached to Window)
// ==========================================

// --- Initialize Page ---
document.addEventListener("DOMContentLoaded", () => {
    console.log("App Started...");
    renderProductGrid();
    // Initialize Swiper Carousel
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
});

// --- Render Grid ---
function renderProductGrid() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = products.map(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        return `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <img src="${product.mainImg}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="price-box">
                    <span class="current-price">₹${product.price}</span>
                    <span class="old-price">₹${product.oldPrice}</span>
                    <span style="color:#cc0c39; font-size:0.75rem; font-weight:bold;">${discount}% OFF</span>
                </div>
                <button class="btn-view">View Details</button>
            </div>
        </div>
        `;
    }).join("");
}

// --- Open Modal Logic ---
window.openProductModal = function(id) {
    currentProduct = products.find(p => p.id === id);
    selectedColorName = currentProduct.colorNames[0];

    // Text Data
    document.getElementById("modal-title").innerText = currentProduct.name;
    document.getElementById("modal-price").innerText = "₹" + currentProduct.price;
    document.getElementById("modal-old-price").innerText = "₹" + currentProduct.oldPrice;
    document.getElementById("modal-desc").innerText = currentProduct.desc;
    document.getElementById("selected-color-name").innerText = selectedColorName;

    // Image Data (Use the image corresponding to the default color)
    document.getElementById("main-view-img").src = currentProduct.colorImages[selectedColorName];

    // Thumbnails
    const thumbContainer = document.getElementById("thumbnail-container");
    thumbContainer.innerHTML = currentProduct.gallery.map(img => 
        `<img src="${img}" class="thumb-img" onclick="changeMainImg('${img}', this)">`
    ).join("");
    if(thumbContainer.firstChild) thumbContainer.firstChild.classList.add("active-thumb");

    // Colors
    const colorContainer = document.getElementById("color-options");
    colorContainer.innerHTML = currentProduct.colors.map((colorCode, index) => 
        `<div class="color-circle" 
              style="background-color: ${colorCode}" 
              onclick="selectColor(this, '${currentProduct.colorNames[index]}')"
              title="${currentProduct.colorNames[index]}">
         </div>`
    ).join("");
    if(colorContainer.firstChild) colorContainer.firstChild.classList.add("selected");

    document.getElementById("product-modal").style.display = "flex";
};

// --- Close Modal ---
window.closeProductModal = function() {
    document.getElementById("product-modal").style.display = "none";
};

// --- Gallery Interaction ---
window.changeMainImg = function(src, element) {
    document.getElementById("main-view-img").src = src;
    document.querySelectorAll(".thumb-img").forEach(img => img.classList.remove("active-thumb"));
    element.classList.add("active-thumb");
};

// --- Color Selection (Updates Main Image) ---
window.selectColor = function(element, name) {
    selectedColorName = name;
    document.getElementById("selected-color-name").innerText = name;
    document.querySelectorAll(".color-circle").forEach(c => c.classList.remove("selected"));
    element.classList.add("selected");

    // Change main image based on selected color
    if (currentProduct.colorImages && currentProduct.colorImages[name]) {
        document.getElementById("main-view-img").src = currentProduct.colorImages[name];
        // Reset active thumbnail
        document.querySelectorAll(".thumb-img").forEach(img => img.classList.remove("active-thumb"));
    }
};

// --- Buy Now ---
window.buyNowFromModal = function() {
    cart = [{ ...currentProduct, selectedColor: selectedColorName, 
              // Ensure cart uses the correct image for the selected color
              mainImg: currentProduct.colorImages[selectedColorName] 
            }];
    updateCartUI();
    closeProductModal();
    toggleCart();
};

// --- Toggle Cart ---
window.toggleCart = function() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
    updateCartUI();
};

// Scroll function for Hero buttons
window.scrollToProducts = function() {
    document.getElementById("products").scrollIntoView({behavior: 'smooth'});
}

// --- Update Cart UI ---
function updateCartUI() {
    const list = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    const countEl = document.getElementById("cart-count");
    
    let total = 0;
    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding:20px; color:#777;'>Cart is empty.</p>";
    } else {
        list.innerHTML = cart.map(item => {
            total += item.price;
            return `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.mainImg}" style="width:60px; height:60px; object-fit:cover; border-radius:4px; border:1px solid #eee;">
                    <div>
                        <div style="font-weight:bold; font-size:0.95rem; color:#111;">${item.name}</div>
                        <div style="font-size:0.85rem; color:#555;">Color: ${item.selectedColor}</div>
                    </div>
                </div>
                <div style="font-weight:800; font-size:1.1rem;">₹${item.price}</div>
            </div>`;
        }).join("");
    }
    totalEl.innerText = "₹" + total;
    countEl.innerText = cart.length;
}

// ==========================================
// 4. FIREBASE ORDER SUBMISSION (INSTANT)
// ==========================================
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const btn = document.querySelector(".btn-checkout");
        const originalText = btn.innerText;
        
        // 1. Instant UI Feedback
        btn.innerText = "Placing Order...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        const orderData = {
            customerName: document.getElementById("cust-name").value,
            customerPhone: document.getElementById("cust-phone").value,
            customerAddress: document.getElementById("cust-address").value,
            items: cart,
            totalAmount: document.getElementById("cart-total").innerText,
            paymentMode: "COD",
            orderDate: new Date().toISOString(),
            status: "Pending Verification"
        };

        try {
            // 2. Firebase Call (Happens in background while UI shows processing)
            const docRef = await addDoc(collection(db, "orders"), orderData);
            console.log("Order written with ID: ", docRef.id);

            // 3. Success Action (Immediate after Firebase confirms)
            alert(`✅ Order Placed Successfully!\n\nOrder ID: ${docRef.id}\n\nWe will call you at ${orderData.customerPhone} shortly to confirm.`);
            
            cart = [];
            updateCartUI();
            toggleCart();
            checkoutForm.reset();

        } catch (error) {
            console.error("Error adding order: ", error);
            alert("⚠️ Network Error. Please check your connection and try again.");
        } finally {
            // Reset Button State
            btn.innerText = originalText;
            btn.disabled = false;
             btn.style.opacity = "1";
        }
    });
}
