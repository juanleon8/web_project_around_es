const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => {
  console.log(card.name);
});

//cerrar popup
const popup = document.querySelector(".popup");

// Cerrar al hacer clic en la superposición
popup.addEventListener("mousedown", (event) => {
  if (event.target === popup) {
    closePopup(popup);
  }
});

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

document.addEventListener("keydown", handleEscClose);

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// -----------------------------
// Selección de elementos globales
// -----------------------------
const btnEditar = document.querySelector(".profile__edit-button");
const modalEdit = document.querySelector("#edit-popup");
const modalAdd = document.querySelector("#new-card-popup");
const modalImage = document.querySelector("#image-popup");

const closeBtns = document.querySelectorAll(".popup__close");

const formEdit = document.querySelector("#edit-profile-form");
const formAdd = document.querySelector("#new-card-form");

const cardsContainer = document.querySelector(".cards__list");

const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const template = document.querySelector("#card-template").content;

// Elementos del modal de imagen
const modalImageImg = modalImage.querySelector(".popup__image");
const modalImageCaption = modalImage.querySelector(".popup__caption");
const modalImageCloseButton = modalImage.querySelector(".popup__close");

// -----------------------------
// Funciones abrir / cerrar modal
// -----------------------------
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Cerrar modal con botón de X
closeBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const popup = btn.closest(".popup");
    closeModal(popup);
  });
});

// Cerrar modal de imagen (actualización que pediste)
modalImageCloseButton.addEventListener("click", function () {
  closeModal(modalImage);
});

// -----------------------------
// Formulario de editar perfil
// -----------------------------
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

btnEditar.addEventListener("click", function () {
  fillProfileForm();
  openModal(modalEdit);
});

formEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(modalEdit);
});

// -----------------------------
// Crear tarjeta desde template
// -----------------------------
function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardElement = template.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Rellenar la tarjeta
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // BOTÓN ME GUSTA
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // BOTÓN ELIMINAR
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  // ABRIR MODAL DE IMAGEN
  cardImage.addEventListener("click", function () {
    modalImageCaption.textContent = name;
    modalImageImg.src = link;
    modalImageImg.alt = name;

    openModal(modalImage);
  });

  return cardElement;
}

// -----------------------------
// Renderizar tarjeta en el contenedor
// -----------------------------
function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
}

// -----------------------------
// Tarjetas iniciales
// -----------------------------
initialCards.forEach(function (item) {
  renderCard(item.name, item.link, cardsContainer);
});

// -----------------------------
// Nueva tarjeta
// -----------------------------
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const inputName = formAdd.querySelector("#p-name");
  const inputLink = formAdd.querySelector("#link-input");

  renderCard(inputName.value, inputLink.value, cardsContainer);

  formAdd.reset();
  closeModal(modalAdd);
}

// Abrir modal para agregar tarjeta
document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openModal(modalAdd);
  });

// Formulario agregar tarjeta
formAdd.addEventListener("submit", handleCardFormSubmit);
