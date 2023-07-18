// 상품 데이터 객체 생성
const productData = [
  { id: 1, name: "Product 1", price: 1000 },
  { id: 2, name: "Product 2", price: 2500 },
  { id: 3, name: "Product 3", price: 1200 },
];

// 장바구니 배열
const cartItems = [];

// 상품 목록 보여주는 함수
function displayProducts() {
  const productContainer = document.querySelector(".products");
  productContainer.innerHTML = "";

  productData.forEach((item) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price : $${item.price}</p>
      <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
  });
}

// 장바구니 목록 보여주는 함수
function displayCart() {
  const cartContainer = document.querySelector(".cart ul");
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${item.name} - $${item.price}`;
    cartContainer.appendChild(cartItem);
  });
}

// 장바구니에 상품 추가하는 함수
function addToCart(productId) {
  const product = productsData.find((product) => product.id === productId);
  if (product) {
    cartItems.push({ ...product });
    displayCart();
  }
}

// Checkout 버튼 클릭 시 처리하는 함수
function handleCheckout() {
  alert("Thank you for your purchase!");
  cartItems = [];
  displayCart();
}

// 이벤트 핸들러 설정
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  displayCart();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = Number(event.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });

  const checkoutButton = document.getElementById("checkout");
  checkoutButton.addEventListener("click", handleCheckout);
});
