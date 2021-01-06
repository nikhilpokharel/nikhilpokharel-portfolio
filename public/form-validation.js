//form-validation
const fullname = document.querySelector("#fullname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const mainForm = document.querySelector("#main-form");

const mainAlert = document.querySelector(".alert");
if (mainForm) {
  mainForm.addEventListener("submit", (e) => {
    if (
      fullname.value === "" ||
      email.value === "" ||
      password.value.length < 8
    ) {
      mainAlert.innerHTML = "";
      e.preventDefault();
      setTimeout(() => {
        mainAlert.classList.remove("show");
      }, 4000);
      mainAlert.classList.add("show");
      clearInterval();
    }
    if (fullname.value == "") {
      mainAlert.innerHTML = "";
      mainAlert.innerHTML = "Fullname is required";
      return false;
    }
    if (email.value == "") {
      mainAlert.innerHTML = "";
      mainAlert.innerHTML = "Email is required";
      return false;
    }
    if (password.value == "" || password.value.length < 8) {
      mainAlert.innerHTML = "";
      mainAlert.innerHTML = "Password must be of atleast 8 characters";
      e.preventDefault();
      return false;
    }
  });
}
