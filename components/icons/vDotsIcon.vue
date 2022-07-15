<template>
  <svg
    style="enable-background:new 0 0 512 512;"
    version="1.1"
    viewBox="0 0 512 512"
    xml:space="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :class="classes.filter(Boolean).join(' ')"
  ><g id="Layer_1" /><g id="Layer_2"><g><g><circle
    class="st0"
    cx="418.47"
    cy="256"
    r="50.03"
  /></g><g><circle
    class="st0"
    cx="256"
    cy="256"
    r="50.03"
  /></g><g><circle
    class="st0"
    cx="93.53"
    cy="256"
    r="50.03"
  /></g></g></g></svg>
</template>

<script>
	export default {
    name: "DotsIconComponent",
    props: {
      classes: {
        type: Array,
        default: () => ([]),
      },
    },
	};
</script>