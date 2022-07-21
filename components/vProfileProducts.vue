<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Мои товары
    </h2>
    <ul class="profile__products-list">
      <vProductCard
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        :no-add-to-cart="true"
        :no-quantity-controls="true"
        :no-remove-from-cart="true"
      />
    </ul>
  </div>
</template>

<script>
  import vProductCard from "@/components/vProductCard";

  export default {
    name: "ProfileProductsComponent",
    components: { vProductCard, },
    data: () => ({
      user: {},
      products: [],
    }),
    async fetch() {
      try {
        const { id, } = this.$route.params;
        const { ok, user, } = await this.$store.dispatch("user/getOne", id);
        const { ok: reqProductsIsOk, products, } = await this.$store.dispatch("user/getProducts", id);

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
  };
</script>