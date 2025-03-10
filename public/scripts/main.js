const headerInfo = document.getElementById("header_info");
const main = document.getElementById("main");
const formError = document.getElementById("form_error");
const loginForm = document.getElementById("login_form");
const serviceForm = document.getElementById("service_form");
const chart = document.getElementById("chart");
const modalWrapper = document.querySelector(".modal__wrapper");

const login = document.getElementById("login");
const password = document.getElementById("password");
const services = document.getElementById("services");
const userService = document.getElementById("user_service");

const loginBtn = document.getElementById("login_btn");
const serviceBtn = document.getElementById("service_btn");
const pageLoader = document.getElementById("page_loader");

const headerBtn = document.getElementById("header_btn");
const modalX = document.querySelector(".modal__logout__header__close");
const modalCancel = document.getElementById("modal_cancel");
const modalLogout = document.getElementById("modal_logout");

let serviceName;

const mockData = {
  login: "login1",
  password: "pass1",
};

const checkInput = () => {
  if (login.value && password.value) {
    loginBtn.classList.remove("form_btn_disabled");
    loginBtn.disabled = false;
  } else {
    loginBtn.classList.add("form_btn_disabled");
    loginBtn.disabled = true;
  }
};

login.addEventListener("input", checkInput);
password.addEventListener("input", checkInput);

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loginBtn.innerHTML = "<div class='loader'>";
  login.setAttribute("readonly", true);
  password.setAttribute("readonly", true);

  setTimeout(() => {
    loginBtn.innerHTML = "Войти";
    login.removeAttribute("readonly");
    password.removeAttribute("readonly");

    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
    }).then((res) => {
      if (res.status === 400) {
        formError.classList.remove("hide");
        loginForm.style.height = "376px";

        setTimeout(() => {
          formError.classList.add("hide");
          loginForm.style.height = "312px";
        }, 5000);
      } else {
        loginForm.classList.add("hide");
        serviceForm.classList.remove("hide");
      }
    });
  }, 1000); // оставляю таймауты, чтобы было видно колесо загрузки
});

const checkServiceInput = () => {
  if (services.value) {
    serviceBtn.classList.remove("form_btn_disabled");
    serviceBtn.disabled = false;
  } else {
    serviceBtn.classList.add("form_btn_disabled");
    serviceBtn.disabled = true;
  }
};

services.addEventListener("keydown", (e) => {
  e.preventDefault();
});

services.addEventListener("click", function () {
  this.parentNode.parentNode.classList.toggle("active");
});

document.querySelectorAll(".main__form__dropdown div").forEach((item) => {
  item.addEventListener("click", function () {
    services.value = this.textContent;
    checkServiceInput();
    document.querySelector(".dropdown__form").classList.remove("active");
  });
});

document.addEventListener("click", function (e) {
  if (!document.querySelector(".dropdown__form").contains(e.target)) {
    document.querySelector(".dropdown__form").classList.remove("active");
  }
});

serviceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  serviceName = services.value;

  serviceForm.classList.add("hide");
  pageLoader.classList.remove("hide");
  main.classList.add("hide");

  setTimeout(() => {
    pageLoader.classList.add("hide");
    headerInfo.classList.remove("hide");
    document.body.style.backgroundColor = "white";
    main.classList.remove("hide");
    userService.innerText = serviceName;
    chart.classList.remove("hide");
  }, 1000);
});

headerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modalWrapper.classList.remove("hide");
});

const closeModal = () => {
  modalWrapper.classList.add("hide");
};

modalX.addEventListener("click", closeModal);
modalCancel.addEventListener("click", closeModal);

modalWrapper.addEventListener("click", (e) => {
  if (e.target.classList.value === "modal__wrapper") {
    closeModal();
  }
});

modalLogout.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("/logout").then((res) => {
    res.status === 200
      ? setTimeout(() => window.location.reload(), 3000) // чтобы можно было успеть посмотреть запрос в network
      : console.error("Error");
  });
});
