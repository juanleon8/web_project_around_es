export const initialCards = [
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
export const btnEditar = document.querySelector(".profile__edit-button");
export const modalEdit = document.querySelector("#edit-popup");
export const modalAdd = document.querySelector("#new-card-popup");
export const modalImage = document.querySelector("#image-popup");

export const closeBtns = document.querySelectorAll(".popup__close");

export const formEdit = document.querySelector("#edit-profile-form");
export const formAdd = document.querySelector("#new-card-form");

export const cardsContainer = document.querySelector(".cards__list");

export const nameInput = document.querySelector("#name-input");
export const jobInput = document.querySelector("#job-input");

export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__description");

export const template = document.querySelector("#card-template").content;

// Elementos del modal de imagen
export const modalImageImg = modalImage.querySelector(".popup__image");
export const modalImageCaption = modalImage.querySelector(".popup__caption");
export const modalImageCloseButton = modalImage.querySelector(".popup__close");
