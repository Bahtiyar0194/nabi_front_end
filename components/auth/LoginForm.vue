<template>
  <div class="card">
    <loader-overlay v-show="showOverlay" />
    <h3 class="form-title">{{ $t("pages.login.title") }}</h3>
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <form>
      <div class="form-group">
        <input
          class="custom-input"
          v-model="form.email"
          type="text"
          placeholder=" "
          autocomplete="username"
        />
        <label v-if="errors.email" class="label-error">{{
          errors.email[0]
        }}</label>
        <label v-else>E-Mail</label>
      </div>
      <div class="form-group">
        <input
          class="custom-input"
          v-model="form.password"
          :type="type"
          placeholder=" "
          autocomplete="new-password"
        />
        <label v-if="errors.password" class="label-error">{{
          errors.password[0]
        }}</label>
        <label v-else>{{ $t("form.password") }}</label>
        <button class="show-password" @click="showPassword">
          <i v-if="showPass" class="bi bi-eye"></i>
          <i v-else class="bi bi-eye-slash"></i>
        </button>
      </div>
      <button class="btn btn-submit" @click.prevent="submit">
        <i class="bi bi-box-arrow-in-right"></i
        ><span>{{ $t("pages.login.sign_in") }}</span>
      </button>
      <div class="mt-4 text-center">
        {{ $t("pages.login.dont_have_an_account") }}
        <nuxt-link :to="localePath('/auth/register')">{{
          $t("pages.register.sign_up")
        }}</nuxt-link>
        <nuxt-link class="mt-1 block" :to="localePath('/auth/forgot-password')">{{
          $t("pages.forgot_password.forgot")
        }}</nuxt-link>
      </div>
    </form>
  </div>
</template>
<script>
import loaderOverlay from "../ui/loaderOverlay.vue";
export default {
  components: { loaderOverlay },
  data() {
    return {
      showOverlay: false,
      showPass: false,
      type: "password",
      form: {
        email: "",
        password: "",
      },
      errors: "",
      error: "",
    };
  },
  methods: {
    showPassword(e) {
      e.preventDefault();
      if (this.type === "password") {
        this.type = "text";
        this.showPass = true;
      } else {
        this.type = "password";
        this.showPass = false;
      }
    },
    async submit() {
      this.showOverlay = true;
      this.errors = "";
      this.error = "";
      await this.$auth
        .loginWith("laravelJWT", {
          data: this.form,
        })
        .then(() => {
          this.$router.push(this.localePath("/office"));
        })
        .catch((error) => {
          if (error.response) {
            this.showOverlay = false;
            if (error.response.status == 422) {
              this.errors = error.response.data;
            } else if (error.response.status == 401) {
              this.error = error.response.data.error;
            }
          }
        });
    },
  },
};
</script>
