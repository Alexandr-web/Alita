<template>
  <ul class="categories-list">
    <li class="categories-list__item">
      <nuxt-link
        class="categories-list__link"
        to="/products?category=clothing"
      >
        <vClothingIcon :classes="['categories-list__icon']" />
        <h5 class="categories-list__title">
          Одежда
        </h5>
      </nuxt-link>
    </li>
    <li class="categories-list__item">
      <nuxt-link
        class="categories-list__link"
        to="/products?category=electronics"
      >
        <vElectronicIcon :classes="['categories-list__icon']" />
        <h5 class="categories-list__title">
          Электроника
        </h5>
      </nuxt-link>
    </li>
    <li class="categories-list__item">
      <nuxt-link
        class="categories-list__link"
        to="/products?category=auto"
      >
        <vCarIcon :classes="['categories-list__icon']" />
        <h5 class="categories-list__title">
          Авто
        </h5>
      </nuxt-link>
    </li>
    <li class="categories-list__item">
      <nuxt-link
        class="categories-list__link"
        to="/products?category=other"
      >
        <vDotsIcon :classes="['categories-list__icon']" />
        <h5 class="categories-list__title">
          Другое
        </h5>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
  import vCarIcon from "@/components/icons/vCarIcon";
  import vClothingIcon from "@/components/icons/vClothingIcon";
  import vDotsIcon from "@/components/icons/vDotsIcon";
  import vElectronicIcon from "@/components/icons/vElectronicIcon";

  export default {
    name: "CategoriesListComponent",
    components: {
      vCarIcon,
      vClothingIcon,
      vDotsIcon,
      vElectronicIcon,
    },
  };
</script>