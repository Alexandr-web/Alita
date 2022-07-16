<template>
  <aside class="profile__sidebar">
    <div class="profile__sidebar-user-info profile__sidebar-block">
      <div class="profile__sidebar-user-avatar-block">
        <vUserIcon :classes="['profile__sidebar-user-avatar']" />
      </div>
      <h2 class="profile__sidebar-user-name">
        {{ user.name }}
      </h2>
      <h3 class="profile__sidebar-user-email">
        {{ user.email }}
      </h3>
    </div>
    <div class="profile__sidebar-block">
      <ul class="profile__sidebar-list">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="profile__sidebar-list-item"
        >
          <nuxt-link
            class="profile__sidebar-list-link"
            exact-active-class="profile__sidebar-list-link--active"
            :to="`/profile/${user.id}/?tab=${item.link}`"
          >
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
  import vUserIcon from "@/components/icons/vUserIcon";

  export default {
    name: "ProfileSidebarComponent",
    components: { vUserIcon, },
    data: () => ({
      user: {},
      list: [
        {
          title: "Мои товары",
          link: "products",
        },
        {
          title: "Корзина",
          link: "cart",
        },
        {
          title: "Настройки",
          link: "settings",
        }
      ],
    }),
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