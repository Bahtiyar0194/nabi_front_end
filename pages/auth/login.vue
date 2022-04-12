<template>
  <LoginForm />
</template>

<script>
import LoginForm from "@/components/auth/LoginForm";
export default {
  layout: "auth",
  middleware: "guest",
  components: {
    LoginForm
  },
  head() {
    return {
      title: this.$t("pages.login.title")
    };
  }
};
</script>
