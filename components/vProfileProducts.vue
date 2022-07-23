<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Мои товары
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
        :no-quantity-controls="true"
        :no-remove-from-cart="true"
        :pending-remove-product="pendingRemoveProduct"
        @remove="removeProduct"
      />
    </ul>
    <vNothing v-else />
  </div>
</template>

<script>
  import vProductCard from "@/components/vProductCard";
  import vNothing from "@/components/vNothing";

  export default {
    name: "ProfileProductsComponent",
    components: {
      vProductCard,
      vNothing,
    },
    data: () => ({
      user: {},
      products: [],
      pendingRemoveProduct: false,
    }),
    async fetch() {
      try {
        const token = this.$store.getters["auth/getToken"];
        const { id, } = this.$route.params;
        const { ok, user, } = await this.$store.dispatch("user/getOne", id);
        const { ok: reqProductsIsOk, products, } = await this.$store.dispatch("user/getProducts", { id, token, });

        if (ok) {
          this.user = user;
        }

        if (reqProductsIsOk) {
          this.products = products;
        }
      } catch (err) {
        throw err;
      }
    },
    methods: {
      removeProduct({ id, }) {
        const token = this.$store.getters["auth/getToken"];
        const res = this.$store.dispatch("product/remove", { id, token, });

        this.pendingRemoveProduct = true;

        res.then(({ ok, message, }) => {
          this.pendingRemoveProduct = false;

          alert(message);

          if (ok) {
            this.$router.go(0);
          }
        }).catch((err) => {
          throw err;
        });
      },
    },
  };
</script>