<template>
  <div>
    <index-header></index-header>
    <div class="container mx-auto">
      <div class="grid grid-cols-12 py-6">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import IndexHeader from "../components/default/IndexHeader.vue";
export default {
  components: {
    IndexHeader,
  },
};
</script>
