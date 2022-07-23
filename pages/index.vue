<template>
  <div class="page pt-90">
    <div class="container">
      <div class="page__inner">
        <div class="section">
          <h3 class="section__title">
            Категории
          </h3>
          <vCategoriesList />
        </div>
        <div class="section">
          <h3 class="section__title">
            Товары
          </h3>
          <ul
            v-if="products.length"
            class="products"
          >
            <vProductCard
              v-for="(product, index) in products"
              :key="index"
              :product="product"
              :no-remove-from-cart="true"
              :no-edit="true"
              :no-quantity-controls="true"
              :no-remove="true"
              :pending-add-to-cart="pendingAddToCart"
              @addToCart="addToCart"
            />
          </ul>
          <vNothing v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vCategoriesList from "@/components/vCategoriesList";
  import vProductCard from "@/components/vProductCard";
  import vNothing from "@/components/vNothing";

  export default {
    name: "IndexPage",
    components: {
      vCategoriesList,
      vProductCard,
      vNothing,
    },
    data: () => ({
      products: [],
      pendingAddToCart: false,
    }),
    async fetch() {
      try {
        const { ok, products, } = await this.$store.dispatch("product/getAll", {});
        
        if (ok) {
          this.products = products;
        }
      } catch (err) {
        throw err;
      }
    },
    methods: {
      addToCart({ id, }) {
        const token = this.$store.getters["auth/getToken"];
        const res = this.$store.dispatch("product/addToCart", { id, token, });

        this.pendingAddToCart = true;

        res.then(({ message, }) => {
          this.pendingAddToCart = false;

          alert(message);
        });
      },
    },
  };
</script>
