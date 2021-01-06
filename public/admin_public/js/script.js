const getLoader = document.querySelector(".loader");
const mainContent = document.querySelector(".main");

if (getLoader && mainContent) {
  window.onload = () => {
    setTimeout(() => {
      getLoader.style.display = "none";
      mainContent.style.display = "inherit";
      setTimeout(() => {
        mainContent.style.opacity = "1";
        AOS.init();
        // Initialize slider
        mySwiper.init();
      }, 50);
    }, 2000);
  };
}

const variables = {
  menu_btn: document.querySelector(".toggle-menu"),
  header: document.querySelector(".dashboard-header"),
  control: document.querySelectorAll(".control"),
  controlElement: document.querySelectorAll(".control-element"),
};

variables.menu_btn.addEventListener("click", (e) => {
  variables.header.classList.toggle("expand");
});

var check_mouse_position = false;

variables.control.forEach((value, index) => {
  value.addEventListener("mouseenter", () => {
    for (var i = 0; i < variables.controlElement.length; i++) {
      variables.controlElement[i].style.display = "none";
    }
    variables.controlElement[index].style.display = "block";
    check_mouse_position = true;

    variables.controlElement[index].addEventListener("mouseleave", () => {
      check_mouse_position = false;
      variables.controlElement[index].style.display = "none";
    });

    variables.controlElement[index].addEventListener("mouseenter", () => {
      check_mouse_position = true;
      variables.controlElement[index].style.display = "block";
    });
  });

  value.addEventListener("mouseleave", () => {
    check_mouse_position = false;
    setTimeout(() => {
      if (!check_mouse_position) {
        variables.controlElement[index].style.display = "none";
      }
    }, 500);
  });
});

if (document.querySelectorAll(".editor")) {
  document.querySelectorAll(".editor").forEach((editor) => {
    ClassicEditor.create(editor).catch((error) => {
      console.error(error);
    });
  });
}

const addSkill = document.querySelector("#add-skills");
const skillSet = document.querySelector(".skill-set");
var unique = 0;

if (addSkill) {
  addSkill.addEventListener("click", (e) => {
    unique++;
    skillSet.innerHTML += `
  <div class="row my-2 skills element${unique.toString()}">
  <div class="col-md-5">
    <input
      type="text"
      placeholder="Skills Link (https://nikhilpokharel.com.np)"
      class="form-control form-input-fields mb-1"
      name="skillLink"
    />
  </div>
  <div class="col-md-5">
    <input
      type="text"
      placeholder="Skill Name"
      name="skillList"
      class="form-control form-input-fields mb-1"
    />
  </div>
  <div class="col-md-2">
  <p onClick='removeElements(${unique})' class="remove">X</p>
  </div>
</div>
  `;
  });

  function removeElements(value) {
    const getId = "element" + value.toString();
    const skill = document.querySelector(`.${getId}`);
    skill.remove();
  }
}

var upload = new FileUploadWithPreview("myUniqueUploadId");
