import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import { initialCards, config } from "../utils/constants.js";

//--------------------SELECT CARDS CONTAINER-------------------->>
const cardContainer = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

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

//-----------------FORM VALIDATOR CREATOR------------------>>
const formList = Array.from(document.querySelectorAll(config.formSelector));
const formValidators = {};
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  formValidators[formName] = validator;
});

//--------------VALIDATION FOR EDIT PROFILE FORM----------------->>
formValidators.profileForm.enableValidation();

//-----------------VALIDATION FOR ADD CARD FORM-------------------->>
formValidators.addCardForm.enableValidation();

//--------IMAGE CLICK HANDLER FUNCTION TO POPULATE PREVIEW MODAL------------->>
function handleImageClick(name, link) {
  previewImage.setAttribute("src", link);
  previewImage.setAttribute("alt", name);
  previewImageTitle.textContent = name;
  openModal(modalImagePreview);
}

//--------RENDER CARD FUNCTION------------->>
function renderCard(cardData) {
  const card = new Card(cardData, "#card", handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

//----ITERATE OVER INITIAL CARDS IN REVERSE, RENDER THEM USING FUNCTION------->>
initialCards.reverse().forEach((cardData) => {
  renderCard(cardData);
});

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
  renderCard(userCard);
  formValidators.addCardForm.formReset();
  formValidators.addCardForm.disableSubmit();
  closeModal(modalAddImage);
}

//--------------------PROFILE EDIT MODAL EVENTS-------------------->>
editButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidity();
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
