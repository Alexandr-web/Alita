<template>
  <div class="profile__tab">
    <h2 class="profile__tab-title">
      Настройки
    </h2>
    <form
      class="form profile__form"
      @submit.prevent="edit"
    >
      <div class="form__field">
        <label
          class="form__label"
          for="name"
        >
          <input
            id="name"
            v-model.trim="validations.name.model"
            class="form__input"
            :class="{
              'form__input--invalid': validations.name.$invalid
            }"
            type="text"
            placeholder="Имя"
          >
        </label>
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="email"
        >
          <input
            id="email"
            v-model.trim="validations.email.model"
            class="form__input"
            :class="{
              'form__input--invalid': validations.email.$invalid
            }"
            type="text"
            placeholder="Email"
          >
        </label>
      </div>
      <div class="form__field">
        <label
          class="form__label"
          for="password"
        >
          <input
            id="password"
            v-model.trim="validations.password.model"
            class="form__input"
            :class="{
              'form__input--invalid': validations.password.$invalid
            }"
            type="password"
            placeholder="Пароль"
          >
        </label>
      </div>
      <div class="form__submit-block">
        <button
          class="form__submit"
          type="submit"
        >
          Изменить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "ProfileCartComponent",
    data: () => ({
      user: {},
      validations: {
        name: {
          rules: {
            minLength: 3,
            maxLength: 16,
          },
          model: "",
        },
        email: {
          rules: { email: true, },
          model: "",
        },
        password: {
          rules: { minLength: 6, },
          model: "",
        },
      },
    }),
    async fetch() {
      try {
        const { id, } = this.$route.params;
        const { ok, user, } = await this.$store.dispatch("user/getOne", parseInt(id));

        if (ok) {
          this.user = user;
          
          Object.keys(user).map((key) => {
            if (key in this.validations && key !== "password") {
              this.validations[key].model = user[key];
            }
          });
        }
      } catch (err) {
        throw err;
      }
    },
    methods: {
      edit() {
        if (!this.validations.$error) {
          const fd = {};

          Object.keys(this.validations).map((key) => {
            if (this.validations[key].model && !this.validations[key].$invalid) {
              fd[key] = this.validations[key].model;
            }
          });

          this.$emit("edit", fd);
        }
      },
    },
  };
</script>