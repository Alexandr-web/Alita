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
                <span class="product-view__rating-val">Всего оценок: {{ reviews.length }}</span>
              </div>
              <button class="product__btn product__btn-add-to-cart product-view__btn">
                Добавить в корзину
              </button>
            </div>
          </div>
          <div class="product-view__block">
            <ul class="product-view__reviews">
              <li
                v-for="(review, index) in reviews"
                :key="index"
                class="product-view__review"
              >
                <div class="product-view__review-block product-view__review-user">
                  <vUserIcon :classes="['product-view__review-user-icon']" />
                  <h4 class="product-view__review-user-name">
                    {{ review.name }}
                  </h4>
                </div>
                <div class="product-view__review-block">
                  <ul class="product-view__review-stars">
                    <li
                      v-for="n in 5"
                      :key="n"
                      class="product-view__review-star"
                    >
                      <vStarIcon
                        :classes="['product-view__review-star-icon', n <= review.rating ? 'product-view__review-star-icon--active' : false]"
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
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
  import vUserIcon from "@/components/icons/vUserIcon";

  export default {
    name: "ProductPage",
    components: {
      Swiper,
      SwiperSlide,
      vStarIcon,
      vUserIcon,
    },
    mixins: [getValidNumMixin],
    layout: "default",
    data: () => ({
      sliderOptions: {
        slidesPerView: 1,
        speed: 500,
        grabCursor: true,
        spaceBetween: 10,
      },
      reviews: [
        {
          rating: 4,
          name: "Alexandr",
        },
        {
          rating: 4,
          name: "Alexandr",
        }
      ],
      product: {
        images: [
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a42fd89c-cfb0-4eb1-9937-fb392cdfb2c3/sportswear-mens-keep-it-clean-pullover-hoodie-NKvBgP.png",
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a42fd89c-cfb0-4eb1-9937-fb392cdfb2c3/sportswear-mens-keep-it-clean-pullover-hoodie-NKvBgP.png"
        ],
        title: "Hoodie Nike",
        description: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Меня снова но предложения парадигматическая инициал на берегу подзаголовок текста свое.",
        price: 1000,
        rating: 4,
      },
    }),
    // validate({ store, params: { id, }, }) {
    //   const res = store.dispatch("product/getOne", parseInt(id));

    //   return res.then(({ ok, product, }) => [ok, product].every(Boolean)).catch((err) => {
    //     throw err;
    //   });
    // },
  };
</script>