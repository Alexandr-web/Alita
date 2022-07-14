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
          class="header__user-info header__block"
          to="/user/id?tab=info"
        >
          <vUserIcon :classes="['header__user-icon']" />
          <h3 class="header__user-name">
            alexandr
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
    }),
  };
</script>