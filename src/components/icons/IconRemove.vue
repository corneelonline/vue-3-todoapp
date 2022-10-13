<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  iconColor: {
    type: String,
  },
});
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
    <path
      d="m1.265 11.423 4.66-4.66 4.283 4.283 1.082-1.083L7.007 5.68l4.505-4.505-1.17-1.17-4.504 4.506L1.642.315.559 1.397l4.196 4.196-4.66 4.66z"
      :fill="iconColor"
      fill-rule="nonzero"
    />
  </svg>
</template>
