//CARD

class Card {
  // El constructor recibe los datos y el selector del template
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // Método privado para obtener la estructura del template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Métodos privados para los controladores de eventos
  _handleLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  // Método privado para añadir los escuchas de eventos
  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });
  }

  // Método público para generar la tarjeta funcional
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }
}

export default Card;
