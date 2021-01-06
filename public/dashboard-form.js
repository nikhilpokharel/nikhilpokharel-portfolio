const submitForm = document.querySelectorAll(".btn-submit");

submitForm.forEach((value) => {
  value.addEventListener("click", () => {
    value.style.pointerEvents = "none";
    value.style.opacity = "0.2";
    value.innerHTML = "Please Wait..";
  });
});
