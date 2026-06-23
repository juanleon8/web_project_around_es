import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const values = this._getInputValues();

      this.setLoading(true);

      Promise.resolve(this._handleFormSubmit(values)).finally(() => {
        this.setLoading(false);
        this.close();
      });
    });
  }

  setLoading(isLoading, text = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = text;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = "Guardar";
      this._submitButton.disabled = false;
    }
  }

  close() {
    super.close();
    this._form.reset();
    this.setLoading(false);
  }
}
