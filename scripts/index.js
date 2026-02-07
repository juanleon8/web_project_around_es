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
  link = "./images/placeholder.jpg",
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

//----
//CARD
//----

import Card from "./card.js";

const formElement = document.querySelector("#new-card-form");

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  // 1. Extraer datos del formulario
  const cardData = {
    name: evt.target.elements["place-name"].value,
    link: evt.target.elements["link"].value,
  };

  // 2. Crear instancia de Card
  const card = new Card(cardData, "#card-template");

  // 3. Generar elemento y renderizar
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);

  formElement.reset(); // Limpiar formulario
});

//-------------
//FormValidator
//-------------

import FormValidator from "./FormValidator.js";

// Objeto de configuración
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button",
  inputErrorClass: "form__input_type_error",
  errorClass: "popup__input-error",
};

// 1. Instancia para el formulario de "Nueva Tarjeta"
const newCardForm = document.querySelector("#new-card-form");
const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.enableValidation();

// 2. Instancia para el formulario de "Perfil" (si tuvieras otro)
const profileForm = document.querySelector("#profile-form");
const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

// clases

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // array de datos
    this._renderer = renderer; // callback para renderizar
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos los elementos
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Agrega un elemento DOM al contenedor
  addItem(element) {
    this._container.append(element);
  }
}

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    // Bind para mantener el contexto correcto
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Abre el popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Cierra el popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Cierra con la tecla Esc (método privado)
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Agrega los event listeners
  setEventListeners() {
    // Cerrar al hacer click en el botón de cerrar
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // Cerrar al hacer click en el overlay
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}

import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
