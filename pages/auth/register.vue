<template>
  <RegisterForm />
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm";
export default {
  layout: "auth",
  middleware: "guest",
  components: {
    RegisterForm
  },
  head() {
    return {
      title: this.$t("pages.register.title")
    };
  },
};
</script>
