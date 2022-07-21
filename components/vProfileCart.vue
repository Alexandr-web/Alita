<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Корзина
    </h2>
    <ul class="profile__products-list">
      <vProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        :no-add-to-cart="true"
        :no-edit="true"
        @setQuantity="setQuantity"
      />
    </ul>
    <div class="profile__cart-total-price">
      <h3 class="profile__cart-total-price-title">
        Итого: <span class="profile__cart-total-price-val">{{ getValidNum(getTotalPrice, true) }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
  import vProductCard from "@/components/vProductCard";
  import getValidNumMixin from "@/mixins/getValidNumMixin";

  export default {
    name: "ProfileCartComponent",
    components: { vProductCard, },
    mixins: [getValidNumMixin],
    data: () => ({
      user: {},
      products: [],
    }),
    async fetch() {
      try {
        const { id, } = this.$route.params;
        const { ok, user, } = await this.$store.dispatch("user/getOne", id);
        const { ok: reqCartProductsIsOk, products, } = await this.$store.dispatch("user/getCartProducts", id);

        if (ok) {
          this.user = user;
        }

        if (reqCartProductsIsOk) {
          this.products = products;
        }
      } catch (err) {
        throw err;
      }
    },
    computed: {
      getTotalPrice() {
        return this.products.reduce((acc, product) => acc += product.price * product.quantity, 0);
      },
    },
    methods: {
      setQuantity({ quantity, productId, }) {
        this.products = this.products.map((product) => {
          if (product.id === productId) {
            product.quantity = quantity;
          }

          return product;
        });
      },
    },
  };
</script>