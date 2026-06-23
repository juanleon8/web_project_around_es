export default class PopupWithConfirm {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._form = this._popup.querySelector("form");
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    this._popup.classList.add("popup_is-opened");
  }

  close() {
    this._popup.classList.remove("popup_is-opened");
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleConfirm();
      this.close();
    });
  }
}
