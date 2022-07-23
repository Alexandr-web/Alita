<template>
  <div class="product">
    <nuxt-link
      v-if="images.length"
      class="product__link"
      :to="`/product/${product.id}`"
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
          {{ product.title }}
          <span class="product__price">{{ getValidNum(product.price, true) }}</span>
        </h3>
      </header>
      <main class="product__main">
        <p class="product__desc">
          {{ product.description }}
        </p>
      </main>
    </nuxt-link>
    <footer class="product__footer">
      <div class="product__footer-block">
        <button
          v-if="!noAddToCart"
          class="product__btn product__btn-add-to-cart"
          :disabled="pendingAddToCart"
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
          :disabled="pendingRemoveFromCart"
          @click="$emit('removeFromCart', product)"
        >
          Удалить из корзины
        </button>
        <button
          v-if="!noRemove"
          class="product__btn product__btn-remove"
          :disabled="pendingRemoveProduct"
          @click="$emit('remove', product)"
        >
          Удалить
        </button>
      </div>
      <div
        v-if="!noQuantityControls"
        class="product__footer-block product__quantity"
      >
        <div class="product__quantity-controls">
          <button
            class="product__quantity-controls-btn"
            :disabled="product.quantity === 1"
            @click="$emit('setQuantity', { quantity: product.quantity - 1, productId: product.id, })"
          >
            -
          </button>
          <span class="product__quantity-value">{{ product.quantity }}</span>
          <button
            class="product__quantity-controls-btn"
            @click="$emit('setQuantity', { quantity: product.quantity + 1, productId: product.id, })"
          >
            +
          </button>
        </div>
        <div class="product__quantity-price">
          {{ getValidNum(product.price * product.quantity, true) }}
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import getValidNumMixin from "@/mixins/getValidNumMixin";
  import getValidProductImageMixin from "@/mixins/getValidProductImageMixin";

  export default {
    name: "ProductCardComponent",
    mixins: [getValidNumMixin, getValidProductImageMixin],
    props: {
      product: {
        type: Object,
        required: true,
      },
      pendingAddToCart: { type: Boolean, },
      pendingRemoveProduct: { type: Boolean, },
      pendingRemoveFromCart: { type: Boolean, },
      noAddToCart: { type: Boolean, },
      noRemoveFromCart: { type: Boolean, },
      noEdit: { type: Boolean, },
      noQuantityControls: { type: Boolean, },
      noRemove: { type: Boolean, },
    },
    data: () => ({
      images: [],
      listImagesParts: [],
      activePart: 0,
    }),
    mounted() {
      this.product.images.map((url, index) => {
        this.getValidProductImage(url).then((path) => this.images.push({ active: index === 0, url: path, }));
      });
    },
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