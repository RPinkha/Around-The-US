export default class Api {
  //---------------------------API CONSTRUCTOR------------------------------->>
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //-----------------METHOD TO CHECK RESPONSE FROM SERVER------------------>>
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error :${res.status}`);
  }

  //-----------------METHOD TO GET USER INFO------------------>>
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //-----------------METHOD TO GET INTIAL CARDS------------------>>
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //-----------------METHOD TO EDIT PROFILE------------------>>
  editProfile({ name, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //-----------------METHOD TO ADD CARD------------------>>
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //-----------------METHOD TO DELETE CARD------------------>>
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //-----------------METHOD TO LIKE CARD------------------>>
  likeCard(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  //-----------------METHOD TO CHANGE AVATAR------------------>>
  changeAvatar({ link }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
