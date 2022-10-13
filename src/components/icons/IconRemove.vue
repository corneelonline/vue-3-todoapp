<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  iconColor: {
    type: String,
  },
});
</script>
<template>
  <svg width="19.896" height="19.896" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m5.365 15.613 4.66-4.66 4.283 4.283 1.083-1.083-4.283-4.282 4.505-4.506-1.17-1.17-4.505 4.506-4.196-4.196L4.66 5.588l4.195 4.195-4.66 4.66 1.17 1.17Z"
      :fill="iconColor"
      fill-rule="evenodd"
    />
  </svg>
</template>
