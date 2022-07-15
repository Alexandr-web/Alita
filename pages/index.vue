<template>
  <div class="page">
    <div class="container">
      <div class="page__inner pt-90">
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
          <vProductsList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vCategoriesList from "@/components/vCategoriesList";
  import vProductsList from "@/components/vProductsList";

  export default {
    name: "IndexPage",
    components: {
      vCategoriesList,
      vProductsList,
    },
  };
</script>
