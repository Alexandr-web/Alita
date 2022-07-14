<template>
  <div class="page">
    <div class="container">
      <div class="page__inner">
        <div class="auth">
          <h2 class="auth__title">
            Вход
          </h2>
          <form
            class="form auth__form"
            @submit.prevent="login"
          >
            <div class="form__field">
              <label
                class="form__label"
                for="email"
              >
                <input
                  id="email"
                  v-model.trim="validations.email.model"
                  :class="{
                    'form__input--invalid': validations.email.$invalid
                  }"
                  class="form__input"
                  placeholder="Email"
                  type="text"
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
                  :class="{
                    'form__input--invalid': validations.password.$invalid
                  }"
                  class="form__input"
                  placeholder="Пароль"
                  type="password"
                >
              </label>
            </div>
            <div class="form__submit-block">
              <button
                class="form__submit"
                type="submit"
                :disabled="pending"
              >
                Войти
              </button>
            </div>
          </form>
          <div class="auth__help">
            <p class="auth__help-desc">
              Нет аккаунта? <nuxt-link
                class="auth__help-link"
                to="/auth/registration"
              >
                Зарегистрироваться
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginPage",
    layout: "empty",
    data: () => ({
      pending: false,
      validations: {
        email: {
          rules: {
            required: true,
            email: true,
          },
          model: "",
        },
        password: {
          rules: {
            required: true,
            minLength: 6,
          },
          model: "",
        },
      },
    }),
    methods: {
      login() {
        if (!this.validations.$invalid) {
          const fd = {
            email: this.validations.email.model,
            password: this.validations.password.model,
          };
          const res = this.$store.dispatch("auth/login", fd);

          this.pending = true;

          res.then(({ ok, message, }) => {
            this.pending = false;

            alert(message);

            if (ok) {
              this.$router.push("/");
            }
          }).catch((err) => {
            throw err;
          });
        } else {
          alert("Все поля должны быть заполнены");
        }
      },
    },
  };
</script>