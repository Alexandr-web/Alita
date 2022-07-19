<template>
  <div class="product">
    <nuxt-link
      class="product__link"
      to="/product/1"
    >
      <header class="product__header">
        <ul
          ref="images"
          class="product__images"
          @mousemove="switchImage($event)"
          @mouseenter="setListImagesParts()"
          @mouseleave="leaveFromListImages"
        >
          <li
            v-for="(image, index) in images"
            :key="index"
            class="product__images-item"
            :class="{
              'product__images-item--active': image.active
            }"
          >
            <img
              class="product__image"
              :src="image.url"
            >
          </li>
        </ul>
        <h3 class="product__title">
          Hoodie Nike
          <span class="product__price">$299</span>
        </h3>
      </header>
      <main class="product__main">
        <p class="product__desc">
          Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты.
        </p>
      </main>
    </nuxt-link>
    <footer class="product__footer">
      <div class="product__footer-block">
        <button
          v-if="!noAddToCart"
          class="product__btn product__btn-add-to-cart"
          @click="$emit('addToCart', product)"
        >
          Добавить в корзину
        </button>
        <nuxt-link
          v-if="!noEdit"
          class="product__btn product__btn-edit"
          :to="`/product/${product.id}/edit`"
          @click="$emit('edit', product)"
        >
          Редактировать
        </nuxt-link>
        <button
          v-if="!noRemoveFromCart"
          class="product__btn product__btn-remove-from-cart"
          @click="$emit('removeFromCart', product)"
        >
          Удалить из корзины
        </button>
      </div>
      <div
        v-if="!noQuantityControls"
        class="product__footer-block product__quantity"
      >
        <div class="product__quantity-controls">
          <button
            class="product__quantity-controls-btn"
            :disabled="quantity === 1"
            @click="quantity -= quantity > 1 ? 1 : 0"
          >
            -
          </button>
          <span class="product__quantity-value">{{ quantity }}</span>
          <button
            class="product__quantity-controls-btn"
            @click="quantity++"
          >
            +
          </button>
        </div>
        <div class="product__quantity-price">
          {{ getValidNum(300 * quantity, true) }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import getValidNumMixin from "@/mixins/getValidNumMixin";

  export default {
    name: "ProductCardComponent",
    mixins: [getValidNumMixin],
    props: {
      product: {
        type: Object,
        required: true,
      },
      noAddToCart: { type: Boolean, },
      noRemoveFromCart: { type: Boolean, },
      noEdit: { type: Boolean, },
      noQuantityControls: { type: Boolean, },
    },
    data: () => ({
      images: [
        {
          active: true,
          url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c5aa030-a6bc-4a12-b414-253f7a41540c/therma-mens-pullover-training-hoodie-zTst4l.png",
        },
        {
          active: false,
          url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a42fd89c-cfb0-4eb1-9937-fb392cdfb2c3/sportswear-mens-keep-it-clean-pullover-hoodie-NKvBgP.png",
        },
        {
          active: false,
          url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/90149434-4a6d-45f3-852c-97ca35692a70/sportswear-club-fleece-mens-graphic-pullover-hoodie-0js5Sx.png",
        }
      ],
      listImagesParts: [],
      activePart: 0,
      quantity: 1,
    }),
    methods: {
      setListImagesParts() {
        const listImages = this.$refs.images;
        const widthListImages = listImages.offsetWidth;
        const lengthImages = this.images.length;
        const onePart = Math.floor(widthListImages / lengthImages);

        for (let i = 0; i <= lengthImages - 1; i++) {
          this.listImagesParts.push({ start: i * onePart, end: i * onePart + onePart, });
        }
      },
      switchImage({ offsetX: x, }) {
        this.listImagesParts.map(({ start, end, }, index) => {
          if (x >= start && x <= end) {
            this.activePart = index;
          }
        });

        this.setActiveImage(this.activePart);
      },

      setActiveImage(index) {
        this.images = this.images.map((image) => {
          image.active = false;
          return image;
        });

        this.images[index < 0 ? 0 : index].active = true;
      },

      leaveFromListImages() {
        this.setActiveImage(0);
        this.listImagesParts = [];
      },
    },
  };
</script>