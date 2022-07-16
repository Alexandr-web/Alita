<template>
  <div class="page pt-90">
    <div class="container">
      <div class="page__inner">
        <div class="profile">
          <vProfileSidebar />
          <main class="profile__main">
            <vProfileProducts v-if="$route.query.tab === 'products'" />
            <vProfileCart v-if="$route.query.tab === 'cart'" />
            <vProfileSettings
              v-if="$route.query.tab === 'settings'"
              @edit="editUserData"
            />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vProfileSidebar from "@/components/vProfileSidebar";
  import vProfileProducts from "@/components/vProfileProducts";
  import vProfileCart from "@/components/vProfileCart";
  import vProfileSettings from "@/components/vProfileSettings";

  export default {
    name: "ProfilePage",
    components: {
      vProfileSidebar,
      vProfileProducts,
      vProfileCart,
      vProfileSettings,
    },
    layout: "default",
    validate({ store, params: { id, }, query: { tab, }, }) {
      const res = store.dispatch("user/getOne", parseInt(id));

      return res.then(({ ok, user, }) => [ok, user, tab].every(Boolean)).catch((err) => {
        throw err;
      });
    },
    watchQuery: ["tab"],
    methods: {
      editUserData(fd) {
        console.log(fd);
      },
    },
  };
</script>