export default class UserInfo {
  //------------------USERINFO CONSTRUCTOR--------------------------->>
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  //--------RETURNS AN OBJECT CONTAINING INFORMATION ABOUT THE USER---------->>
  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.name = this._nameElement.textContent;
    userCurrentInfo.description = this._descriptionElement.textContent;
    return userCurrentInfo;
  }

  //-------METHOD THAT SETS THE USER INFO IN THE PROFILE---------->>
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }

  //-------METHOD THAT SETS THE USER AVATAR IN THE PROFILE---------->>
  setUserAvatar(link) {
    this._avatarElement.setAttribute("src", link);
  }
}
