const btnEditar = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closebtn = document.querySelector(".popup__close");
let formElement = document.querySelector("#edit-form");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

btnEditar.addEventListener("click", function () {
  handleOpenEditModal();
});

closebtn.addEventListener("click", function () {
  closeModal(modal);
});

function fillProfileForm() {
  const currentName = document.querySelector(".profile__name").textContent;
  const currentJob = document.querySelector(".profile__job").textContent;

  document.querySelector("#name-input").value = currentName;
  document.querySelector("#job-input").value = currentJob;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name-input");
  let jobInput = document.querySelector("#job-input");
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
