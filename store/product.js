const host = require("../server/host");

export default {
  actions: {
    async getOne({ }, id) {
      try {
        const res = await fetch(`${host}/product/api/${id}`, {
          method: "GET",
          headers: { "Accept-Type": "application/json", },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async getAll({ }, { category = "", search = "", }) {
      try {
        const res = await fetch(`${host}/product/api/?category=${category}&search=${search}`, {
          method: "GET",
          headers: { "Accept-Type": "application/json", },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async add({ }, { fd, token, }) {
      try {
        const res = await fetch(`${host}/product/add`, {
          method: "POST",
          headers: {
            "Accept-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
          body: fd,
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async addToCart({ }, { id, token, }) {
      try {
        const res = await fetch(`${host}/product/${id}/cart/add`, {
          method: "POST",
          headers: {
            "Accept-Type": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async remove({ }, { id, token, }) {
      try {
        const res = await fetch(`${host}/product/${id}/remove`, {
          method: "DELETE",
          headers: {
            "Accept-Type": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },

    async removeFromCart({ }, { id, token, }) {
      try {
        const res = await fetch(`${host}/product/${id}/cart/remove`, {
          method: "DELETE",
          headers: {
            "Accept-Type": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        });

        return res.json();
      } catch (err) {
        throw err;
      }
    },
  },
};