import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";
import Api from "../components/Api.js";
import {
  config,
  editButton,
  addButton,
  editPictureButton,
  profileInputList,
  formList,
  formValidators,
  options,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

//--------------------DEFINING CARDSCONTAINER----------------->>
let cardsContainer = 0;

//-----------CREATE A NEW CLASS INSTANCE FOR THE USER INFO------------>>
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__photo",
});

//-----------CREATE A NEW CLASS INSTANCE FOR THE API------------>>
const api = new Api(options);

//-----------GET THE USER INFORMATION FROM THE API------------>>
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch((err) => console.log(err));

//-----------GET THE INITIAL CARDS FROM THE API------------>>
api
  .getInitialCards()
  .then((res) => {
    //-----------CREATE A NEW CLASS INSTANCE FOR THE CARDS CONTAINER------------>>
    cardsContainer = new Section(
      { items: res, renderer: renderCard },
      ".cards__list"
    );
    //----------------CALL RENDERER METHOD ON CARDSCONTAINER------------------->>
    cardsContainer.rendererItems();
  })
  .catch((err) => console.log(err));

//-----------------FORM VALIDATOR CREATOR AND ENABLING------------------>>
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});

//-----------------------RENDER CARD FUNCTION----------------------->>
function renderCard(cardData) {
  const card = new Card(cardData, "#card", handleImageClick, handleDeleteClick);
  return card.generateCard();
}

//-----CREATE A MODALWITHCONFIRMATION INSTANCE FOR CARD DELETE CONFIRMATION------------>>
const deleteConfirmationModal = new ModalWithConfirmation(
  "#modal-confirm-delete",
  handleDeleteSubmit,
  config
);

//-----------CREATE A MODALWITHFORM INSTANCE FOR THE CHANGE PICTURE------------>>
const avatarEditModal = new ModalWithForm(
  "#modal-change-picture",
  handleAvatarFormSubmit,
  config
);

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

//-----------CREATE A FUNCTION THAT HANDLES DELETE CLICK------------>>
function handleDeleteClick(card) {
  deleteConfirmationModal.open();
  card.getId();
}

//-----------CREATE A FUNCTION THAT HANDLES CARD DELETE------------>>
function handleDeleteSubmit(card) {
  card.getId();
}

//-----------CREATE A FUNCTION THAT HANDLES AVATAR EDIT SUBMIT------------>>
function handleAvatarFormSubmit() {}

//-----------CREATE A FUNCTION THAT HANDLES PROFILE EDIT SUBMIT------------>>
function handleProfileFormSubmit(values) {
  api
    .editProfile(values)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
    })
    .catch((err) => console.log(err));
  profileEditModal.close();
}

//------------CREATE A FUNCTION THAT HANDLES ADD IMAGE SUBMIT---------->>
function handleAddImageFormSubmit(values) {
  api
    .addCard(values)
    .then((res) => {
      const newCard = renderCard(res);
      cardsContainer.addItem(newCard);
    })
    .catch((err) => console.log(err));
  formValidators.addCardForm.resetForm();
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

//-----------ADD A CLICK EVENT LISTENER TO THE EDIT PICTURE BUTTON------------>>
editPictureButton.addEventListener("click", () => avatarEditModal.open());

//-----------ADD EVENT LISTENERS TO THE EDIT PROFILE MODAL----------->>
profileEditModal.setEventListeners();

//-----------ADD EVENT LISTENERS TO THE ADD IMAGE MODAL----------->>
addImageModal.setEventListeners();

//-----------ADD EVENT LISTENERS TO THE PREVIEW IMAGE MODAL----------->>
previewModal.setEventListeners();

//-----------ADD EVENT LISTENERS TO THE CHANGE PICTURE MODAL----------->>
avatarEditModal.setEventListeners();
