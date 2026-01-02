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
