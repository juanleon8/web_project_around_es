export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    api,
    userId,
    handleDeleteClick,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._userId = userId;
    this._api = api;
    this._handleDeleteClick = handleDeleteClick;

    this._isLiked = data.isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    this._likeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this._api
          .deleteLike(this._id)
          .then((data) => {
            this._isLiked = false;
            this._likeButton.classList.remove("card__like-button_is-active");
          })
          .catch(console.error);
      } else {
        this._api
          .addLike(this._id)
          .then((data) => {
            this._isLiked = true;
            this._likeButton.classList.add("card__like-button_is-active");
          })
          .catch(console.error);
      }
    });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    if (this._isLiked) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }

    this._setEventListeners();
    return this._element;
  }
}
