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
          <ul class="products">
            <vProductCard
              v-for="i in 8"
              :key="i"
              :product="{}"
              :no-remove-from-cart="true"
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

  export default {
    name: "IndexPage",
    components: {
      vCategoriesList,
      vProductCard,
    },
    methods: {
      addToCart(product) {
        console.log(product);
      },
    },
  };
</script>
