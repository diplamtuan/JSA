let emailInput = document.querySelector("#email");
let passwordInput = document.querySelector("#pass");
let btnLogin = document.querySelector(".btnLogin");
let errorMessages = document.querySelectorAll(".errorMessage");
let errorMessageEmail = errorMessages[0];
let errorMessagePassword = errorMessages[1];

// Bien chua tai khoan he thong
const account = {
  email: "khang123@gmail.com",
  pass: "123123",
};

// Đặt sự kiện click vào nút login
btnLogin.addEventListener("click", function () {
  let emailValue = emailInput.value;
  let passValue = passwordInput.value;

  // Kiểm tra mật khẩu và tài khoản đã rỗng chưa
  if (emailValue !== "" && passValue !== "") {
    // email và mật khẩu đều không rỗng
    // Reset CSS và text khi không rỗng
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");
    errorMessageEmail.innerText = "";
    errorMessagePassword.innerText = "";

    // Kiểm tra tiếp email không rỗng và pass không rỗng
    // Kiểm tra email và pass có đúng hay không ?
    if (emailValue == account.email && passValue == account.pass) {
      // EMAIL VÀ MẬT KHẨU CHÍNH XÁC
      // Đăng nhập thành công
      alert("Đăng nhập thành công");
      localStorage.setItem("dangnhap", account.email);
      location.href = "index.html";
    } else if (emailValue == account.email && passValue !== account.pass) {
      emailInput.classList.remove("error");
      passwordInput.classList.add("error");
      errorMessageEmail.innerText = "";
      errorMessagePassword.innerText = "Sai mật khẩu";
    } else if (emailValue !== account.email && passValue == account.pass) {
      emailInput.classList.add("error");
      passwordInput.classList.remove("error");
      errorMessageEmail.innerText = "Sai tài khoản";
      errorMessagePassword.innerText = "";
    } else {
      emailInput.classList.add("error");
      passwordInput.classList.add("error");
      errorMessageEmail.innerText = "Sai tài khoản";
      errorMessagePassword.innerText = "Sai mật khẩu";
    }
  } else if (emailValue == "" && passValue !== "") {
    // Email rỗng và pass không rỗng
    emailInput.classList.add("error");
    passwordInput.classList.remove("error");
    errorMessageEmail.innerText = "Tài khoản rỗng";
    errorMessagePassword.innerText = "";
  } else if (emailValue !== "" && passValue == "") {
    // Email không rỗng và pass lại rỗng
    emailInput.classList.remove("error");
    passwordInput.classList.add("error");
    errorMessageEmail.innerText = "";
    errorMessagePassword.innerText = "Mật khẩu rỗng";
  } else {
    // Email và pass đều rỗng
    emailInput.classList.add("error");
    passwordInput.classList.add("error");
    errorMessageEmail.innerText = "Tài khoản rỗng";
    errorMessagePassword.innerText = "Mật khẩu rỗng";
  }
});
