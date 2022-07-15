<template>
  <ul class="products">
    <vProductCard
      v-for="i in 8"
      :key="i"
      :product="{}"
      @addToCart="addToCart"
    />
  </ul>
</template>

<script>
  import vProductCard from "@/components/vProductCard";

  export default {
    name: "ProductListComponent",
    components: { vProductCard, },
    methods: {
      addToCart(product) {
        console.log(product);
      },
    },
  };
</script>