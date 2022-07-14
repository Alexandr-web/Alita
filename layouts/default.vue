<template>
  <div class="layout__default">
    <Nuxt />
  </div>
</template>

<script>
  export default {
    name: "DefaultLayout",
    middleware: "checkAuth",
  };
</script>