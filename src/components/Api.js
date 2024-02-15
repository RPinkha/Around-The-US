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

  //-----------------METHOD TO REQUEST RESPONSE FROM SERVER------------------>>
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  //-----------------METHOD TO GET USER INFO------------------>>
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  //-----------------METHOD TO GET INTIAL CARDS------------------>>
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  //-----------------METHOD TO EDIT PROFILE------------------>>
  editProfile({ name, description }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    });
  }

  //-----------------METHOD TO ADD CARD------------------>>
  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  //-----------------METHOD TO DELETE CARD------------------>>
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  //-----------------METHOD TO LIKE CARD------------------>>
  likeCard(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  //-----------------METHOD TO CHANGE AVATAR------------------>>
  changeAvatar({ link }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}
