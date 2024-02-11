export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers.contentType;
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
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

  getInitialCards() {
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

  editProfile({ name, description }) {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
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

  addCard({ name, link }) {
    fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
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
