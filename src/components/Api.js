export default class Api {
  //---------------------------API CONSTRUCTOR------------------------------->>
  constructor(options) {
    this._baseUrl = options.baseUrl; //https://around-api.en.tripleten-services.com/v1
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
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //-----------------METHOD TO GET INTIAL CARDS------------------>>
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //-----------------METHOD TO EDIT PROFILE------------------>>
  editProfile({ name, description }) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //-----------------METHOD TO ADD CARD------------------>>
  addCard({ name, link }) {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        this._checkResponse(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/// My autherization Token: 739decfe-71be-4d0d-8961-a71a0f6cba52
