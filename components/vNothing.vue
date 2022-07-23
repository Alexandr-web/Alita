<template>
  <div class="nothing">
    <span
      class="nothing__title"
      :class="classes.filter(Boolean).join(' ')"
    >
      Ничего нет
    </span>
  </div>
</template>

<script>
  export default {
    name: "NothingComponent",
    props: {
      classes: {
        type: Array,
        default: () => ([]),
      },
    },
  };
</script>