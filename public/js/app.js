// Cart State Management
let cart = JSON.parse(localStorage.getItem("ink_cart")) || [];

function saveCart() {
  localStorage.setItem("ink_cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}

function addToCart(id, name, price, image) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart();
  toggleCart(true);
}

function toggleCart(forceOpen = false) {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  if (forceOpen) {
    drawer.classList.remove("translate-x-full");
  } else {
    drawer.classList.toggle("translate-x-full");
  }
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  const totalEl = document.getElementById("cart-total");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-neutral-500 text-center py-8">Your cart is currently empty.</p>`;
    if (totalEl) totalEl.textContent = "$0.00";
    return;
  }

  let html = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    html += `
            <div class="flex items-center justify-between gap-4 py-4 border-b border-black/10">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg border border-black/10" alt="${item.name}">
                <div class="flex-1">
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-xs text-neutral-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 text-xs font-bold">Remove</button>
            </div>
        `;
  });
  container.innerHTML = html;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartItems();
}

// API Inspector Modal
function toggleApiModal() {
  let modal = document.getElementById("api-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "api-modal";
    modal.className =
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4";
    modal.innerHTML =
      `
            <div class="bg-[#FAF9F5] border-2 border-black rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
                <button onclick="toggleApiModal()" class="absolute top-4 right-4 font-black px-3 py-1 bg-neutral-200 rounded-full">✕</button>
                <h3 class="text-xl font-black mb-2 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Backend API Inspector</h3>
                <p class="text-xs text-neutral-600 mb-4">Live payload inspection of endpoints connected to ` +
      `products.json` +
      `.</p>
                <div class="flex gap-2 mb-4">
                    <button onclick="fetchApiData('products')" class="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg">GET /api/products</button>
                    <button onclick="fetchApiData('orders')" class="px-3 py-1.5 bg-neutral-200 text-black text-xs font-bold rounded-lg">GET /api/orders</button>
                </div>
                <pre id="api-output" class="bg-[#1A1A1A] text-[#D4FF00] p-4 rounded-xl text-xs overflow-x-auto h-64 font-mono">Click a button above to load API response...</pre>
            </div>
        `;
    document.body.appendChild(modal);
  } else {
    modal.remove();
  }
}

async function fetchApiData(endpoint) {
  const output = document.getElementById("api-output");
  output.textContent = "Loading data...";
  try {
    const res = await fetch(`/api/${endpoint}`);
    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "Error fetching endpoint: " + err.message;
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

// Tab Switching Logic
function switchTab(tabName) {
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.add("hidden"));
  const target = document.getElementById(`tab-${tabName}`);
  if (target) {
    target.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update active state on nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.tab === tabName) {
      link.classList.add("text-indigo-600", "border-charcoal");
    } else {
      link.classList.remove("text-indigo-600", "border-charcoal");
    }
  });
  window.location.hash = tabName;
}

// FAQ Accordion Toggle
function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector("i");
  answer.classList.toggle("hidden");
  icon.classList.toggle("rotate-180");
}

// Initialize global UI triggers
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
