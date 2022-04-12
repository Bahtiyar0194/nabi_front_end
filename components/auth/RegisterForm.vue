<template>
  <div class="card">
    <loader-overlay v-show="showOverlay" />
    <h3 class="form-title">{{ $t("pages.register.title") }}</h3>
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <div class="flex form-group">
      <div id="sponsorWrap" :class="{ hasSponsor: !hasSponsor }">
        <button
          class="btn"
          :class="{ active: hasSponsor }"
          @click="showHideSponsor()"
        >
          <span>Есть спонсор</span>
        </button>
        <button
          class="btn"
          :class="{ active: !hasSponsor }"
          @click="showHideSponsor()"
        >
          <span>Нет спонсора</span>
        </button>
      </div>
    </div>
    <form @submit.prevent="submit">
      <div v-if="hasSponsor" class="form-group">
        <input
          class="custom-input"
          v-model="form.sponsor_id"
          type="number"
          @change="getSponsor()"
        />
        <label v-if="errors.sponsor_id" class="label-error">{{
          errors.sponsor_id[0]
        }}</label>
        <label v-else>ID спонсора</label>
      </div>
      <div v-if="sponsor_message && hasSponsor" class="form-group">
        <div class="alert alert-custom">
          {{ sponsor_message }}
        </div>
      </div>
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
          v-model="form.name"
          type="text"
          placeholder=" "
        />
        <label v-if="errors.name" class="label-error">{{
          errors.name[0]
        }}</label>
        <label v-else>{{ $t("form.name") }}</label>
      </div>
      <div class="form-group">
        <input
          class="custom-input"
          v-model="form.last_name"
          type="text"
          placeholder=" "
        />
        <label v-if="errors.last_name" class="label-error">{{
          errors.last_name[0]
        }}</label>
        <label v-else>{{ $t("form.last_name") }}</label>
      </div>
      <div class="form-group">
        <input
          class="custom-input"
          v-model="form.phone"
          type="number"
          placeholder=" "
        />
        <label v-if="errors.phone" class="label-error">{{
          errors.phone[0]
        }}</label>
        <label v-else>{{ $t("form.phone") }}</label>
      </div>
      <div class="form-group">
        <input
          class="custom-input"
          v-model="form.password"
          type="password"
          placeholder=" "
          autocomplete="new-password"
        />
        <label v-if="errors.password" class="label-error">{{
          errors.password[0]
        }}</label>
        <label v-else>{{ $t("form.password") }}</label>
      </div>
      <div class="form-group">
        <input
          class="custom-input"
          v-model="form.password_confirmation"
          type="password"
          placeholder=" "
          autocomplete="new-password"
        />
        <label v-if="errors.password" class="label-error">{{
          errors.password[0]
        }}</label>
        <label v-else>{{ $t("form.confirm_password") }}</label>
      </div>
      <button class="btn btn-submit" type="submit" :disabled="isDisabled">
        <i class="bi bi-person-plus"></i
        ><span>{{ $t("pages.register.sign_up") }}</span>
      </button>
      <div class="mt-4 text-center">
        {{ $t("pages.register.have_an_account") }}
        <nuxt-link :to="localePath('/auth/login')">{{
          $t("pages.login.sign_in")
        }}</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import loaderOverlay from "../ui/loaderOverlay.vue";
export default {
  mounted() {
    if (this.hasSponsor === true) {
      this.getSponsor();
    }
  },
  components: { loaderOverlay },
  data() {
    return {
      showOverlay: false,
      form: {
        sponsor_id: null || 1,
        email: "",
        name: "",
        last_name: "",
        phone: "",
        password: "",
        password_confirmation: "",
      },
      errors: "",
      error: "",
      sponsor_message: "",
      hasSponsor: false,
      isDisabled: false,
    };
  },
  methods: {
    showHideSponsor() {
      if (this.hasSponsor) {
        this.hasSponsor = false;
        this.isDisabled = false;
      } else {
        this.getSponsor();
        this.hasSponsor = true;
      }
    },
    async getSponsor() {
      this.showOverlay = true;
      this.sponsor_message = "";
      await this.$axios
        .post("api/auth/get_sponsor", { sponsor_id: this.form.sponsor_id })
        .then((resp) => {
          if (resp.data.status == 0) {
            this.isDisabled = true;
          } else if (resp.data.status == 1) {
            this.isDisabled = false;
          }
          this.sponsor_message = resp.data.message;
          this.showOverlay = false;
        })
        .catch((error) => {
          if (error.response) {
            this.showOverlay = false;
            if (error.response.status == 422) {
              this.errors = error.response.data;
            } else if (error.response.status == 423) {
              this.error = error.response.data.error;
            }
          }
        });
    },
    async submit() {
      this.showOverlay = true;
      this.errors = "";
      this.error = "";
      await this.$axios
        .$post("api/auth/register", this.form)
        .then(() => {
          this.$auth
            .loginWith("laravelJWT", {
              data: this.form,
            })
            .then(() => {
              this.$router.push(this.localePath("/office"));
            });
        })
        .catch((error) => {
          if (error.response) {
            this.showOverlay = false;
            if (error.response.status == 422) {
              this.errors = error.response.data;
            } else if (error.response.status == 423) {
              this.error = error.response.data.error;
            }
          }
        });
    },
  },
};
</script>
