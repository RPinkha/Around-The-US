//--------------------OBJECT WITH INITIAL CARDS-------------------->>
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Las Vegas",
    link: "https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/2023-06/7b05e031-2d80-4d0a-bbd5-9c28a7ef8d8e.jpeg?h=2ce89a5c&itok=ow9jLMty",
  },
  {
    name: "Mertyl Beach",
    link: "https://www.montereybaysuites.com/wp-content/uploads/2023/01/myrtle-beach-shoreline-1184735168.jpg",
  },
];

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
