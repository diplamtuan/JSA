let btn = document.querySelectorAll(".btn");
let quantity = document.querySelector(".quantity");
let content = document.querySelector(".content");
let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

let currentQuantity = +quantity.innerText;

function checkLogin() {
  if (localStorage.getItem("dangnhap")) {
    let rightHeader = document.querySelector(".rightHeader");
    rightHeader.innerHTML = `
        <i class="fa-solid fa-user"></i>
            <span>
                ${localStorage.getItem("dangnhap")}
            </span>
            <ul>
                <li>Thông tin tài khoản</li>
                <li class="logout">Đăng xuất</li>
            </ul>
        `;
    let btnLogout = document.querySelector(".logout");
    btnLogout.addEventListener("click", function () {
      localStorage.removeItem("dangnhap");
      checkLogin();
      quantity.innerText = "0";
    });
  } else {
    let rightHeader = document.querySelector(".rightHeader");
    rightHeader.innerHTML = `
        <a href="dangnhap.html">Login</a>
            <a href="signin.html">SignIn</a>
        `;
  }
}

function loadDanhSachSanPham() {
  for (let i = 0; i < data.length; i++) {
    let nameItem = data[i].name;
    let priceItem = data[i].price;
    let imageItem = data[i].img;
    content.innerHTML += `
    <div class="content-item">
            <img src="${imageItem}" alt="">
            <h3> ${nameItem}...</h3>
            <p>${priceItem}$</p>
            <button class="btn" id=${data[i].id}>
                <i class="fa-solid fa-cart-shopping"></i>
                Add to cart</button>
        </div>
    `;
  }

  let btnAddItems = document.querySelectorAll(".btn");
  for (let i = 0; i < btnAddItems.length; i++) {
    let btnItem = btnAddItems[i];
    btnItem.addEventListener("click", function () {
      let idItem = btnItem.id;
      for (let i = 0; i < data.length; i++) {
        let idData = data[i].id;
        if (idItem == idData) {
          cartArray.push(data[i]);
          quantity.innerText = cartArray.length;
          localStorage.setItem("cart", JSON.stringify(cartArray));
        }
      }
    });
  }
}

function loadQuantity() {
  let quantityArray = JSON.parse(localStorage.getItem("cart"));
  if (quantityArray) {
    quantity.innerText = quantityArray.length;
  } else {
    quantity.innerText = 0;
  }
}
loadQuantity();
loadDanhSachSanPham();
checkLogin();
