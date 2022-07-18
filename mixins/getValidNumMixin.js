export default {
  methods: {
    getValidNum(price, isCurrency) {
      let options = {
        minimumFractionDigits: 0,
        currencyDisplay: "narrowSymbol",
      };

      if (isCurrency) {
        options = {
          ...options,
          currency: "RUB",
          style: "currency",
        };
      }

      return Intl.NumberFormat("ru-RU", options).format(price);
    },
  },
};