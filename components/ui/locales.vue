<template>
  <div class="ml-3">
    <a @click="showLocales()">
      <img
        width="18px"
        :src="require(`~/lang/flags/${$i18n.localeProperties.flag_img}`)"
      />
    </a>
    <div v-show="localeOverlay" class="full-overlay">
      <button class="close-button" @click="closeLocales">
        <i class="bi bi-x"></i>
      </button>
      <div class="p-4 max-w-sm w-full">
        <h3 class="font-light text-3xl text-center mb-10">
          {{ $t("choose_your_language") }}:
        </h3>
        <a
          v-for="locale in availableLocales"
          :key="locale.code"
          class="auth-locale-link"
          :class="{ active: locale.code === currentLocale }"
          @click="changeLocale(locale.code)"
          ><img
            width="28px"
            :src="require(`~/lang/flags/${locale.flag_img}`)"
            alt=""
          />{{ locale.name }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      localeOverlay: false
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
    currentLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
    },
    closeLocales() {
      this.localeOverlay = false;
    },
    showLocales() {
      this.localeOverlay = true;
    }
  }
};
</script>
