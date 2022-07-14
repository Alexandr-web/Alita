<template>
  <div class="layout__empty">
    <Nuxt />
  </div>
</template>

<script>
  export default {
    name: "EmptyLayout",
    middleware: "checkAlreadyAuth",
  };
</script>