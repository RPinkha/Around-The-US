import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import {
  initialCards,
  config,
  editButton,
  addButton,
  profileInputList,
  formList,
  formValidators,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

//-----------CREATE A NEW CLASS INSTANCE FOR THE USER INFO------------>>
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

//-----------------FORM VALIDATOR CREATOR------------------>>
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

//-----------CREATE A MODALWITHFORM INSTANCE FOR THE ADD IMAGE------------>>
const addImageModal = new ModalWithForm(
  "#modal-add-card",
  handleAddImageFormSubmit,
  config
);

//-----------CREATE A MODALWITHIMAGE INSTANCE FOR THE PREVIEW IMAGE------------>>
const previewModal = new ModalWithImage("#image-preview-modal");

//-----------CREATE A FUNCTION THAT HANDLES PROFILE EDIT SUBMIT------------>>
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
  profileEditModal.close();
}

//------------CREATE A FUNCTION THAT HANDLES ADD IMAGE SUBMIT---------->>
function handleAddImageFormSubmit(values) {
  const newCard = renderCard(values);
  cardsContainer.addItem(newCard);
  formValidators.addCardForm.formReset();
  formValidators.addCardForm.disableSubmit();
  addImageModal.close();
}

//--------IMAGE CLICK HANDLER FUNCTION TO POPULATE PREVIEW MODAL------------->>
function handleImageClick(name, link) {
  previewModal.open({ name, link });
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

//-----------ADD A CLICK EVENT LISTENER TO THE ADD BUTTON------------>>
addButton.addEventListener("click", () => addImageModal.open());

//-----------ADD EVENT LISTENERS TO THE EDIT PROFILE MODAL----------->>
profileEditModal.setEventListeners();

//-----------ADD EVENT LISTENERS TO THE ADD IMAGE MODAL----------->>
addImageModal.setEventListeners();

//-----------ADD EVENT LISTENERS TO THE PREVIEW IMAGE MODAL----------->>
previewModal.setEventListeners();
