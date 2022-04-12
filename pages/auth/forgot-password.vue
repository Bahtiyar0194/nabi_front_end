<template>
<div>123</div>
</template>
<script>
export default {
  layout: "auth",
  middleware: "guest",
  head() {
    return {
      title: this.$t("pages.forgot_password.title")
    };
  }
};
</script>
