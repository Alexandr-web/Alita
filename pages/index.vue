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
              @addToCart="addToCart"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vCategoriesList from "@/components/vCategoriesList";
  import vProductCard from "@/components/vProductCard";
  import getValidProductImageMixin from "@/mixins/getValidProductImageMixin";

  export default {
    name: "IndexPage",
    components: {
      vCategoriesList,
      vProductCard,
    },
    mixins: [getValidProductImageMixin],
    data: () => ({ products: [], }),
    async fetch() {
      try {
        const { ok, products, } = await this.$store.dispatch("product/getAll", {});
        
        if (ok) {
          products.map((product) => {
            const images = [];

            product.images
              .map((path) => this.getValidProductImage(path))
              .map((promise) => promise.then((url) => images.push(url)));
            
            if (images) {
              this.products.push({ ...product, images, });
            }
          });
        }
      } catch (err) {
        throw err;
      }
    },
    methods: {
      addToCart(product) {
        console.log(product);
      },
    },
  };
</script>
