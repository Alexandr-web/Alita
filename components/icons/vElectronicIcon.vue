<template>
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    :class="classes.filter(Boolean).join(' ')"
  ><g id="Skills_screen"><path d="M39,336.4769A35.023,35.023,0,0,0,74.0231,371.5H207V413.5H151a14,14,0,0,0,0,28H361a14,14,0,0,0,0-28H305V371.5H437.9769A35.023,35.023,0,0,0,473,336.4769v-7H39Z" /><path d="M437.9769,70.5H74.0231A35.0233,35.0233,0,0,0,39,105.5226V301.4765H473V105.5226A35.0233,35.0233,0,0,0,437.9769,70.5Z" /></g></svg>
</template>

<script>
  export default {
    name: "ElectronicIconComponent",
    props: {
      classes: {
        type: Array,
        default: () => ([]),
      },
    },
  };
</script>