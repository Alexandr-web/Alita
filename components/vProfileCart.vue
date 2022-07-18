<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Корзина
    </h2>
    <ul class="profile__products-list">
      <vProductCard
        v-for="i in 2"
        :key="i"
        :product="{}"
        :no-add-to-cart="true"
        :no-edit="true"
      />
    </ul>
    <div class="profile__cart-total-price">
      <h3 class="profile__cart-total-price-title">
        Итого: <span class="profile__cart-total-price-val">{{ getValidNum(600, true) }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
  import vProductCard from "@/components/vProductCard";
  import getValidNumMixin from "@/mixins/getValidNumMixin";

  export default {
    name: "ProfileCartComponent",
    components: { vProductCard, },
    mixins: [getValidNumMixin],
    data: () => ({ user: {}, }),
    async fetch() {
      try {
        const { id, } = this.$route.params;
        const { ok, user, } = await this.$store.dispatch("user/getOne", parseInt(id));

        if (ok) {
          this.user = user;
        }
      } catch (err) {
        throw err;
      }
    },
  };
</script>