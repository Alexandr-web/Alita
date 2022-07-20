export default {
  methods: {
    async getValidProductImage(path) {
      if (/^\/\_nuxt\//.test(path)) {
        return path;
      }

      const url = await require(`@/productImages/${path}`);

      return /^\/\_nuxt\//.test(url) ? url : "";
    },
  },
};