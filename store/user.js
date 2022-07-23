import jwtDecode from "jwt-decode";

const host = require("../server/host");

export default {
  actions: {
    async getOne({ }, id) {
      try {
        const res = await fetch(`${host}/user/api/${id}`, {
          method: "GET",
          headers: { "Accept-Type": "application/json", },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async getByToken({ }, token) {
      try {
        const data = await jwtDecode(token || "");

        return data;
      } catch (err) {
        throw err;
      }
    },

    async getCartProducts({ }, { id, token, }) {
      try {
        const res = await fetch(`${host}/user/api/${id}/cart`, {
          method: "GET",
          headers: {
            "Accept-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async getProducts({ }, { id, token, }) {
      try {
        const res = await fetch(`${host}/user/api/${id}/products`, {
          method: "GET",
          headers: {
            "Accept-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async edit({ }, { fd, token, id, }) {
      try {
        const res = await fetch(`${host}/user/${id}/edit`, {
          method: "PUT",
          headers: {
            "Accept-Type": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
          body: JSON.stringify(fd),
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },
  },
};