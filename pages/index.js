import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

//--------------------CONFIG OBJECT-------------------->>
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

//--------------------SELECT CARDS CONTAINER-------------------->>
const cardsContainer = document.querySelector(".cards__list");

//--------------------SELECT ALL CLOSE BUTTONS ELEMENTS-------------------->>
const modalList = Array.from(document.querySelectorAll(".modal"));
const closeButtons = document.querySelectorAll(".modal__close");

//--------------------PROFILE ELEMENTS-------------------->>
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

//--------------------PROFILE EDIT MODAL ELEMENTS-------------------->>
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const profileForm = document.forms["profileForm"];
const profileNameInput = modalProfileEdit.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = modalProfileEdit.querySelector(
  ".modal__input_type_description"
);

//--------------------ADD IMAGE MODAL ELEMENTS-------------------->>
const modalAddImage = document.querySelector("#modal-add-card");
const imageAddForm = document.forms["addCardForm"];
const modalImageTitle = modalAddImage.querySelector(".modal__input_type_title");
const modalImageLink = modalAddImage.querySelector(
  ".modal__input_type_image-link"
);

//-----------------IMAGE PREVIEW MODAL ELEMENTS------------------>>
const modalImagePreview = document.querySelector("#image-preview-modal");
const previewImage = modalImagePreview.querySelector(".modal__image");
const previewImageTitle = modalImagePreview.querySelector(
  ".modal__image-title"
);

//--------------VALIDATION FOR EDIT PROFILE FORM----------------->>
const profileFormValidation = new FormValidator(profileForm, config);
profileFormValidation.enableValidation();

//-----------------VALIDATION FOR ADD CARD FORM-------------------->>
const addCardFormValidation = new FormValidator(imageAddForm, config);
addCardFormValidation.enableValidation();

//--------IMAGE CLICK HANDLER FUNCTION TO POPULATE PREVIEW MODAL------------->>
function handleImageClick(name, link) {
  previewImage.setAttribute("src", link);
  previewImage.setAttribute("alt", name);
  previewImageTitle.textContent = name;
  openModal(modalImagePreview);
}

//----ITERATE OVER INITIAL CARDS ARRAY, AND MAKE THEM USING CARD CLASS------->>
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card", handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

//---------------CLOSE MODALS WITH ESCAPE KEY FUNCTIONS--------------->>
function closeModalByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

//---------------CLOSE MODALS PRESSING OUTSIDE OF MODAL--------------->>
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

//--------------------OPEN AND CLOSE MODAL FUNCTIONS-------------------->>
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

//--------------------PROFILE EDIT MODAL FUNCTIONS-------------------->>
function fillProfileInputs() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(modalProfileEdit);
}

//--------------------ADD IMAGE MODAL FUNCTIONS-------------------->>
function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  const userCard = {};
  userCard["name"] = modalImageTitle.value;
  userCard["link"] = modalImageLink.value;
  const card = new Card(userCard, "#card", handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  addCardFormValidation.formReset();
  addCardFormValidation.disableSubmit();
  closeModal(modalAddImage);
}

//--------------------PROFILE EDIT MODAL EVENTS-------------------->>
editButton.addEventListener("click", () => {
  fillProfileInputs();
  profileFormValidation.checkValidity();
  openModal(modalProfileEdit);
});
profileForm.addEventListener("submit", handleProfileFormSubmit);

//--------------------ADD IMAGE MODAL EVENTS-------------------->>
addButton.addEventListener("click", () => openModal(modalAddImage));
imageAddForm.addEventListener("submit", handleAddImageFormSubmit);

//--------------------MODAL CLOSE EVENT LOOP-------------------->>
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
