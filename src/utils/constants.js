//--------------------OBJECT WITH CONFIG SETTINGS-------------------->>
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
  formSelector: ".modal__form",
};

//----------------CREATING BUTTONS PROFILE ELEMENTS-------------------->>
const profile = document.querySelector(".profile");
export const editButton = profile.querySelector(".profile__edit-button");
export const addButton = profile.querySelector(".profile__add-button");
export const editPictureButton = profile.querySelector(
  ".profile__photo-button"
);

//-----------DEFINING AN ARRAY OF ALL PROFILE EDIT INPUTS--------------->>
const modalProfileEdit = document.querySelector("#modal-profile-edit");
export const profileInputList = Array.from(
  modalProfileEdit.querySelectorAll(".modal__input")
);

//-----------DEFINING AN ARRAY OF ALL FORM ELEMENTS-------------------->>
export const formList = Array.from(
  document.querySelectorAll(config.formSelector)
);

//-----------DEFINING AN EMPTY OBJECT FOR ALL THE FORMS----------------->>
export const formValidators = {};

//-----------DEFINING THE API OBJECT----------------->>
export const options = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "739decfe-71be-4d0d-8961-a71a0f6cba52",
    "Content-Type": "application/json",
  },
};
