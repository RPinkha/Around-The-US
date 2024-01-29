import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import { initialCards, config } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

//--------------------SELECT ALL CLOSE BUTTONS ELEMENTS-------------------->>
const modalList = Array.from(document.querySelectorAll(".modal"));
const closeButtons = document.querySelectorAll(".modal__close");

//--------------------PROFILE ELEMENTS-------------------->>
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");

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

//-----------------------RENDER CARD FUNCTION----------------------->>
function renderCard(cardData) {
  const card = new Card(cardData, "#card", handleImageClick);
  return card.generateCard();
}

//-----------CREATE A NEW CLASS INSTANCE FOR THE CARDS CONTAINER------------>>
const cardsContainer = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

//----------------CALL RENDERER METHOD ON CARDSCONTAINER------------------->>
cardsContainer.rendererItems();

const profileEditModal = new ModalWithForm(
  "#modal-profile-edit",
  handleProfileFormSubmit,
  config
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const userCurrentInfo = userInfo.getUserInfo();
  userInfo.setUserInfo(userCurrentInfo);
  profileEditModal.close();
}

//--------------------PROFILE EDIT MODAL ELEMENTS-------------------->>
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const profileForm = document.forms["profileForm"];
const profileInputList = Array.from(
  modalProfileEdit.querySelectorAll(".modal__input")
);

//--------------------PROFILE EDIT MODAL FUNCTIONS-------------------->>
function fillProfileInputs() {
  profileInputList[0].value = profileName.textContent;
  profileInputList[1].value = profileDescription.textContent;
}

//-----------CREATE A NEW CLASS INSTANCE FOR THE USER INFO------------>>
const userInfo = new UserInfo(
  {
    nameSelector: ".profile__name",
    descriptionSelector: ".profile__description",
  },
  profileInputList
);

editButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidity();
  profileEditModal.open();
});
profileEditModal.setEventListeners();

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

//--------------------ADD IMAGE MODAL EVENTS-------------------->>
addButton.addEventListener("click", () => openModal(modalAddImage));
imageAddForm.addEventListener("submit", handleAddImageFormSubmit);

//--------------------MODAL CLOSE EVENT LOOP-------------------->>
// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//   button.addEventListener("click", () => closeModal(modal));
// });
