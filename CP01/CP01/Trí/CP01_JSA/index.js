localStorage.setItem('dangnhap', true)
// localStorage.removeItem('dangnhap')
let btn = document.querySelectorAll('.btn')
let quantity = document.querySelector('.quantity')
let currentQuantity = +quantity.innerText



for (let i = 0; i < btn.length; i++) {
    let btnItem = btn[i]
    btnItem.addEventListener('click', function () {
        if (localStorage.getItem('dangnhap')) {
            currentQuantity += 1;
            quantity.innerText = currentQuantity
        } else {
            alert('Bạn chưa đăng nhập')
            location.href = 'dangnhap.html'
        }
    })
    console.log(btnItem)
}

function checkLogin() {
    if (localStorage.getItem('dangnhap')) {
        let rightHeader = document.querySelector('.rightHeader')
        rightHeader.innerHTML = `
        <i class="fa-solid fa-user"></i>
            <span>
                manhtri@gmail.com

            </span>
            <ul>
                <li>Thông tin tài khoản</li>
                <li class="logout">Đăng xuất</li>
            </ul>
        `
        let btnLogout = document.querySelector('.logout')
        btnLogout.addEventListener('click', function () {
            localStorage.removeItem('dangnhap')
            checkLogin()
        })
    } else {
        let rightHeader = document.querySelector('.rightHeader');
        rightHeader.innerHTML = `
        <a href="login.html">Login</a>
            <a href="signin.html">SignIn</a>
        `
    }
}
checkLogin()