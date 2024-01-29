import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import { initialCards, config } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

//--------------------PROFILE ELEMENTS-------------------->>
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");

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

//--------------------PROFILE EDIT MODAL ELEMENTS-------------------->>
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const profileInputList = Array.from(
  modalProfileEdit.querySelectorAll(".modal__input")
);

//-----------CREATE A NEW CLASS INSTANCE FOR THE USER INFO------------>>
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

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

//-----------CREATE A MODALWITHFORM INSTANCE FOR THE PROFILE EDIT------------>>
const profileEditModal = new ModalWithForm(
  "#modal-profile-edit",
  handleProfileFormSubmit,
  config
);

//-----------CREATE A FUNCTION THAT HANDLES PROFILE EDIT SUBMIT------------>>
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
  profileEditModal.close();
}

//---------PROFILE EDIT MODAL FILL INPUTS FUNCTIONS----------------->>
function fillProfileInputs() {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.name;
  profileInputList[1].value = userCurrentInfo.description;
}

//-----------ADD A CLICK EVENT LISTENER TO THE EDIT BUTTON------------>>
editButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidity();
  profileEditModal.open();
});

//-----------ADD EVENT LISTENERS TO THE EDIT PROFILE MODAL----------->>
profileEditModal.setEventListeners();

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
