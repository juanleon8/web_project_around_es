console.log("Inicio");
// -----------------------------
// Imports
// -----------------------------
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "./FormValidator.js";
import {
  //initialCards,
  btnEditar,
  modalEdit,
  modalAdd,
  modalImage,
  closeBtns,
  formEdit,
  formAdd,
  cardsContainer,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  template,
  modalImageImg,
  modalImageCaption,
  modalImageCloseButton,
} from "../utils/constants.js";

// -----------------------------
// UserInfo
// -----------------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// -----------------------------
// Popup con imagen
// -----------------------------
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// -----------------------------
// Crear tarjeta
// -----------------------------
function createCard(data, userId) {
  const card = new Card(
    data,
    "#card-template",
    (cardData) => imagePopup.open(cardData),
    api,
    userId,
    (cardId, cardElement) => {
      confirmPopup.open(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            confirmPopup.close();
          })
          .catch(console.error);
      });
    },
  );

  return card.generateCard();
}

// -----------------------------
// Section (tarjetas)
// -----------------------------
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

// -----------------------------
// Popup editar perfil
// -----------------------------
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  editProfilePopup.setLoading(true, "Guardando...");

  api
    .updateUserInfo(formData.name, formData.about)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });

      editProfilePopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editProfilePopup.setLoading(false, "Guardar");
    });
});

editProfilePopup.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    document.querySelector("#name-input").value = currentUser.name;
    document.querySelector("#job-input").value = currentUser.job;
    editProfilePopup.open();
  });

const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  avatarPopup.setLoading(true, "Guardando...");

  api
    .updateAvatar(formData.avatar)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      avatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarPopup.setLoading(false, "Guardar");
    });
});

avatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-container")
  .addEventListener("click", () => {
    avatarPopup.open();
  });

// -----------------------------
// Popup agregar tarjeta
// -----------------------------
const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  addCardPopup.setLoading(true, "Creando...");

  api
    .addCard(formData["place-name"], formData.link)
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addCardPopup.setLoading(false, "Crear");
    });
});

addCardPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

//----------------------------- ORIGINAL
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
/*function getCardElement(
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
}*/

// -----------------------------
// Renderizar tarjeta en el contenedor
// -----------------------------
/*function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
}*/

// -----------------------------
// Tarjetas iniciales
// -----------------------------
// initialCards.forEach(function (item) {
//   renderCard(item.name, item.link, cardsContainer);
// });

// -----------------------------
// Nueva tarjeta
// -----------------------------
/**function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const inputName = formAdd.querySelector("#p-name");
  const inputLink = formAdd.querySelector("#link-input");

  renderCard(inputName.value, inputLink.value, cardsContainer);

  formAdd.reset();
  closeModal(modalAdd);
} */

// Abrir modal para agregar tarjeta
/*document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openModal(modalAdd);
  });*/

// Formulario agregar tarjeta
/**formAdd.addEventListener("submit", handleCardFormSubmit); */

//----
//CARD
//----

/* const formElement = document.querySelector("#new-card-form");

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
}); */

//-------------
//FormValidator
//-------------

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
const profileForm = document.querySelector("#edit-profile-form");
const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

// -----------------------------
// Validadores
// -----------------------------
const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form"),
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form"),
);
addCardFormValidator.enableValidation();

// -----------------------------
// Api
// -----------------------------
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "35aeb745-25a8-46c4-b88a-8f17b5db9d5c",
    "Content-Type": "application/json",
  },
});

//Cargar tarjetas con promise
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const userId = userData._id;
    //Mostrar los datos del usuario
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    userInfo.setAvatar(userData.avatar);
    // Render
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, userId);

      cardSection.addItem(cardElement);
    });
  })

  .catch(console.error);

// -----------------------------
// Confirmacion
// -----------------------------
import PopupWithConfirm from "../components/PopupConfirm.js";

const confirmPopup = new PopupWithConfirm("#confirm-popup");

confirmPopup.setEventListeners();
