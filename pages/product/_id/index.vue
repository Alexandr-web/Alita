<template>
  <div class="page pt-90">
    <div class="container">
      <div class="page__inner">
        <div class="product-view">
          <div class="product-view__block product-view__pictures">
            <clientOnly>
              <Swiper
                class="swiper__wrapper"
                :options="sliderOptions"
              >
                <SwiperSlide
                  v-for="(image, index) in product.images"
                  :key="index"
                  class="slider__slide"
                >
                  <img
                    class="product-view__image"
                    :src="image"
                  >
                </SwiperSlide>
              </Swiper>
            </clientOnly>
          </div>
          <div class="product-view__block">
            <div class="product-view__block-row">
              <h1 class="product-view__title">
                {{ product.title }}
              </h1>
              <h1 class="product-view__price">
                {{ getValidNum(1000, true) }}
              </h1>
              <p class="product-view__desc">
                {{ product.description }}
              </p>
            </div>
            <div class="product-view__block-row">
              <div class="product-view__rating">
                <ul class="product-view__stars">
                  <li
                    v-for="i in 5"
                    :key="i"
                    class="product-view__star"
                  >
                    <vStarIcon :classes="['product-view__star-icon', i <= product.rating ? 'product-view__star-icon--active' : false]" />
                  </li>
                </ul>
                <span class="product-view__rating-val">Всего оценок: {{ product.raters.length }}</span>
              </div>
              <button class="product__btn product__btn-add-to-cart product-view__btn">
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, } from "vue-awesome-swiper";
  import getValidNumMixin from "@/mixins/getValidNumMixin";
  import vStarIcon from "@/components/icons/vStarIcon";
  import getValidProductImageMixin from "@/mixins/getValidProductImageMixin";

  export default {
    name: "ProductPage",
    components: {
      Swiper,
      SwiperSlide,
      vStarIcon,
    },
    mixins: [getValidNumMixin, getValidProductImageMixin],
    layout: "default",
    validate({ store, params: { id, }, }) {
      const res = store.dispatch("product/getOne", parseInt(id));

      return res.then(({ ok, product, }) => [ok, product].every(Boolean)).catch((err) => {
        throw err;
      });
    },
    data: () => ({
      sliderOptions: {
        slidesPerView: 1,
        speed: 500,
        grabCursor: true,
        spaceBetween: 10,
      },
      product: {},
    }),
    async fetch() {
      try {
        const { id, } = this.$route.params;
        const { ok, product, } = await this.$store.dispatch("product/getOne", parseInt(id));

        if (ok) {
          const images = [];

          product.images
            .map((url) => this.getValidProductImage(url))
            .map((promise) => promise.then((url) => images.push(url)));

          if (images) {
            this.product = { ...product, images, };
          }
        }
      } catch (err) {
        throw err;
      }
    },
  };
</script>