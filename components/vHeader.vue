<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__block">
          <div class="logo header__logo">
            <nuxt-link
              class="logo__link header__logo-link"
              to="/"
            >
              Alita
            </nuxt-link>
          </div>
          <div class="header__search">
            <input
              v-model.trim="validations.search.model"
              class="header__search-input"
              type="text"
              placeholder="Поиск"
            >
          </div>
        </div>
        <nuxt-link
          v-if="Object.keys(user).length"
          class="header__user-info header__block"
          :to="`/profile/${user.id}?tab=products`"
        >
          <vUserIcon :classes="['header__user-icon']" />
          <h3 class="header__user-name">
            {{ user.name }}
          </h3>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
  import vUserIcon from "@/components/icons/vUserIcon";

  export default {
    name: "HeaderComponent",
    components: { vUserIcon, },
    data: () => ({
      validations: {
        search: {
          rules: {
            required: true,
            minLength: 3,
          },
          model: "",
        },
      },
      user: {},
    }),
    async fetch() {
      try {
        const token = this.$store.getters["auth/getToken"];
        const user = await this.$store.dispatch("user/getByToken", token);

        this.user = user || {};
      } catch (err) {  
        throw err;
      }
    },
  };
</script>