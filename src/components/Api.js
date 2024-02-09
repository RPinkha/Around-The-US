export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers.contentType;
  }

  getInitialCards() {
    const initialCards = [];
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "739decfe-71be-4d0d-8961-a71a0f6cba52",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/// My autherization Token: 739decfe-71be-4d0d-8961-a71a0f6cba52
