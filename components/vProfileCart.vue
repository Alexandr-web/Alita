<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Корзина
    </h2>
    <ul
      v-if="products.length"
      class="profile__products-list"
    >
      <vProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        :no-add-to-cart="true"
        :no-edit="true"
        :no-remove="true"
        :pending-remove-from-cart="pendingRemoveFromCart"
        @setQuantity="setQuantity"
        @removeFromCart="removeFromCart"
      />
    </ul>
    <div
      v-if="products.length"
      class="profile__cart-total-price"
    >
      <h3 class="profile__cart-total-price-title">
        Итого: <span class="profile__cart-total-price-val">{{ getValidNum(getTotalPrice, true) }}</span>
      </h3>
    </div>
    <vNothing v-else />
  </div>
</template>

<script>
  import vProductCard from "@/components/vProductCard";
  import vNothing from "@/components/vNothing";
  import getValidNumMixin from "@/mixins/getValidNumMixin";

  export default {
    name: "ProfileCartComponent",
    components: {
      vProductCard,
      vNothing,
    },
    mixins: [getValidNumMixin],
    data: () => ({
      user: {},
      products: [],
      pendingRemoveFromCart: false,
    }),
    async fetch() {
      try {
        const token = this.$store.getters["auth/getToken"];
        const { id, } = this.$route.params;
        const { ok, user, } = await this.$store.dispatch("user/getOne", id);
        const { ok: reqCartProductsIsOk, products, } = await this.$store.dispatch("user/getCartProducts", { id, token, });

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
      removeFromCart({ id, }) {
        const token = this.$store.getters["auth/getToken"];
        const res = this.$store.dispatch("product/removeFromCart", { id, token, });

        this.pendingRemoveFromCart = true;

        res.then(({ ok, message, }) => {
          this.pendingRemoveFromCart = false;

          alert(message);

          if (ok) {
            this.$router.go(0);
          }
        }).catch((err) => {
          throw err;
        });
      },
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