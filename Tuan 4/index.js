let btn = document.querySelectorAll(".btn");
let quantity = document.querySelector(".quantity");
let content = document.querySelector(".content");
// let cartArray = JSON.parse(localStorage.getItem("cart")) || [];
let cartArray = [];

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
      localStorage.removeItem("cart");
      loadCart();
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
    <div class="content-item" id=${data[i].id}>
            <img src="${imageItem}" alt="">
            <h3> ${nameItem}...</h3>
            <p>${priceItem}$</p>
            <button class="btn" id=${data[i].id}>
                <i class="fa-solid fa-cart-shopping"></i>
                Add to cart</button>
        </div>
    `;
  }

  // Lay nut mua hang
  let btnAddItems = document.querySelectorAll(".btn");
  for (let i = 0; i < btnAddItems.length; i++) {
    let btnItem = btnAddItems[i];
    btnItem.addEventListener("click", function (e) {
      e.stopPropagation();
      let idItem = btnItem.id;
      addCart(idItem);
    });
  }

  // Them su kien click vao content-item
  let contentItems = document.querySelectorAll(".content-item");
  for (let i = 0; i < contentItems.length; i++) {
    let contentItem = contentItems[i];
    contentItem.addEventListener("click", function () {
      let idItem = contentItem.id;
      localStorage.setItem("idchitiet", idItem);
      location.href = "chitietsanpham.html";
    });
  }
}

// Kiểm tra localStorage nếu có thì đặt số lượng vào quantity Nếu không có thì set bằng 0

function addCart(id) {
  const dataItem = findData(id);
  console.log(dataItem);
  let cartLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartLocalStorage.length > 0) {
    let isCheckedCart = false;
    for (let i = 0; i < cartLocalStorage.length; i++) {
      if (dataItem.id == cartLocalStorage[i].id) {
        isCheckedCart = true;
      }
    }
    if (isCheckedCart) {
      alert("Bạn đã chọn sản phẩm này rồi");
    } else {
      cartLocalStorage.push(dataItem);
      localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
      loadCart();
    }
  } else {
    cartLocalStorage.push(dataItem);
    localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
    loadCart();
  }
}

function findData(id) {
  for (let i = 0; i < data.length; i++) {
    if (id == data[i].id) {
      return data[i];
    }
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

function checkLocalStorageCart() {
  if (localStorage.getItem("cart")) {
    return true;
  } else {
    return false;
  }
}

function loadCart() {
  loadQuantity();
  // khi mà hàm này được gọi
  // lấy thằng element cart-product-wrapper = "cart-wrapper"
  let cartWrapper = document.querySelector(".cart-product-wrapper");
  let cartArrayInner = JSON.parse(localStorage.getItem("cart")) || [];
  let cartArray = JSON.parse(localStorage.getItem("cart"));
  let html = "";
  // Nó sẽ kiểm tra trên localstorage có key cart hay không ?
  if (cartArrayInner.length > 0) {
    // Nếu có
    // Thì nó sẽ ...
    // cart-wrapper.innerHTML = `ul danh sach`
    html += `<ul class="cart-products">`;
    for (let i = 0; i < cartArray.length; i++) {
      let image = cartArray[i].img;
      let name = cartArray[i].name;
      let price = cartArray[i].price;
      let id = cartArray[i].id;
      html += `
            <li class="product-item">
            <img src=${image} alt="sanpham1">
            <div class="product-body">
                <p class="product-name">${name}</p>
                <div class="productQuantityPrice">
                    <p class="price">${price}$</p>
                    <p class="quantityProductCart">x 1</p>
                </div>
            </div>
            <i onclick="deleteCart(${id})"class="fa-solid fa-trash deleteCart"></i>
        </li>
      `;
    }
    html += `</ul>
<p class="totalprice">
    Tổng tiền : ${sumPrice()}$
</p>
<button class="pay" onclick="payment()">
    Thanh toán
</button> `;
    cartWrapper.innerHTML = html;
  } else {
    // Không có
    // Thì nó sẽ
    // Cart-wrapper.innerHTML =<img />
    html += `
    <img class="no-product-image" src="https://www.tharagold.in/assets/img/no-product-found.png"/>
    `;
    cartWrapper.innerHTML = html;
  }
}

// Ham chay

loadDanhSachSanPham();
checkLogin();
loadCart();

// Xoa san pham
//  1 Dau tien tao mảng []
//  2. Lấy được id cần xóa (id:1)
// 3. Dùng vòng for để lập qua từng phần tử trong giỏ hàng
// 4. if(!id:1 == id cua phan tu thu i){
// push phan tu thu i vao [ư]
// }
//

function deleteCart(id) {
  let newCart = [];
  let oldCart = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < oldCart.length; i++) {
    if (id !== oldCart[i].id) {
      newCart.push(oldCart[i]);
    }
  }
  // Mat du lieu
  localStorage.setItem("cart", JSON.stringify(newCart));
  // Mat giao dien
  loadCart();
}

function sumPrice() {
  let cartLocal = JSON.parse(localStorage.getItem("cart"));
  let sum = 0;
  for (let i = 0; i < cartLocal.length; i++) {
    let price = cartLocal[i].price;
    sum += price;
  }
  return sum;
}

// function thanh toán
function payment() {
  if (localStorage.getItem("dangnhap")) {
    alert("Thanh toán thành công");
    localStorage.removeItem("cart");
    location.href = "index.html";
  } else {
    alert("Mời bạn đăng nhập trước khi thanh toán");
    location.href = "dangnhap.html";
  }
}
