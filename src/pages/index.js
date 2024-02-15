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
let cardsContainer;

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
  .catch(console.error);

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
  .catch(console.error);

//-----------------FORM VALIDATOR CREATOR AND ENABLING------------------>>
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});

//-----------------------RENDER CARD FUNCTION----------------------->>
function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.generateCard();
}

//-----CREATE A MODALWITHCONFIRMATION INSTANCE FOR CARD DELETE CONFIRMATION------------>>
const deleteConfirmationModal = new ModalWithConfirmation(
  "#modal-confirm-delete",
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
  deleteConfirmationModal.setCallback(() => {
    deleteConfirmationModal.renderSaving(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        deleteConfirmationModal.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteConfirmationModal.renderSaving(false);
      });
  });
}

//-----------CREATE A FUNCTION THAT HANDLES LIKE CLICK------------>>
function handleLikeClick(card) {
  api
    .likeCard(card.getId(), card.isLiked)
    .then((res) => card.toggleLikeCard(res.isLiked))
    .catch(console.error);
}

//-----------CREATE A FUNCTION THAT HANDLES AVATAR EDIT SUBMIT------------>>
function handleAvatarFormSubmit(values) {
  avatarEditModal.renderSaving(true);
  api
    .changeAvatar(values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarEditModal.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarEditModal.renderSaving(false);
    });
}

//-----------CREATE A FUNCTION THAT HANDLES PROFILE EDIT SUBMIT------------>>
function handleProfileFormSubmit(values) {
  profileEditModal.renderSaving(true);
  api
    .editProfile(values)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
      profileEditModal.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditModal.renderSaving(false);
    });
}

//------------CREATE A FUNCTION THAT HANDLES ADD IMAGE SUBMIT---------->>
function handleAddImageFormSubmit(values) {
  addImageModal.renderSaving(true);
  api
    .addCard(values)
    .then((res) => {
      const newCard = renderCard(res);
      cardsContainer.addItem(newCard);
      formValidators.addCardForm.resetForm();
      formValidators.addCardForm.disableSubmit();
      addImageModal.close();
    })
    .catch(console.error)
    .finally(() => {
      addImageModal.renderSaving(false);
    });
}

//--------IMAGE CLICK HANDLER FUNCTION TO POPULATE PREVIEW MODAL------------->>
function handleImageClick(name, link) {
  previewModal.open({ name, link });
}

//-----------ADD A CLICK EVENT LISTENER TO THE EDIT BUTTON------------>>
editButton.addEventListener("click", () => {
  profileEditModal.setInputValues(userInfo.getUserInfo());
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

//-----------ADD EVENT LISTENERS TO THE DELETE CONFIRMATION MODAL----------->>
deleteConfirmationModal.setEventListeners();
