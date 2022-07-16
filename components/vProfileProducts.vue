<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Мои товары
    </h2>
    <ul class="profile__products-list">
      <vProductCard
        v-for="i in 8"
        :key="i"
        :product="{}"
        :no-add-to-cart="true"
        :no-remove-from-cart="true"
      />
    </ul>
  </div>
</template>

<script>
  import vProductCard from "@/components/vProductCard";

  export default {
    name: "ProfileProductsComponent",
    components: { vProductCard, },
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