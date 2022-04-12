<template>
  <div class="w-full text-center">
    <div class="w-full">
      <div>
        <h1 class="text-8xl">
          {{ error.statusCode }}
        </h1>
        <h4 v-if="error.statusCode === 404" class="text-4xl font-light mb-4">
          {{ $t("pages.error.not_found") }}
        </h4>
        <h4 v-if="error.statusCode === 500" class="text-4xl font-light mb-4">
          {{ $t("pages.error.server_error") }}
        </h4>
        <p class="text-2xl font-light mb-4">{{ error.message }}</p>
      </div>
      <NuxtLink to="/">{{ $t("pages.home.title") }}</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "auth",
  head() {
    return {
      title: this.$t("pages.error.error"),
    };
  },
};
</script>
