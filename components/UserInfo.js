export default class UserInfo {
  //------------------USERINFO CONSTRUCTOR--------------------------->>
  constructor({ nameSelector, descriptionSelector }, inputList) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._inputList = inputList;
  }

  //--------RETURNS AN OBJECT CONTAINING INFORMATION ABOUT THE USER---------->>
  getUserInfo() {
    const userCurrentInfo = {};
    this._inputList.forEach((input) => {
      userCurrentInfo[input.name] = input.textContent;
    });
    return userCurrentInfo;
  }

  //-------METHOD THAT SETS THE USER INFO IN THE PROFILE---------->>
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
