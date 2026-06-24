//Validacion
const editProfileForm = document.forms["edit-profile"];
const newCardForm = document.forms["nuevo-lugar"];

enableValidation(editProfileForm);
enableValidation(newCardForm);

function enableValidation(formElement) {
  const inputs = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");

  function showInputError(inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.classList.add("form__input-error_active");

    if (inputElement.id === "name-input" || inputElement.id === "job-input") {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      if (inputElement.id === "p-name") {
        errorElement.textContent = "Por favor, rellene este campo.";
      } else {
        errorElement.textContent = "Por favor, introduce una direccion web";
      }
    }
  }

  function hideInputError(inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }

  function toggleButtonState() {
    submitButton.disabled = !formElement.checkValidity();
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input);
      } else {
        hideInputError(input);
      }
      toggleButtonState();
    });
  });

  toggleButtonState();
}
