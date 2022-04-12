<template>
  <div class="max-w shadow-md bg-active">
    <div class="container mx-auto">
      <div class="grid grid-cols-6 lg:grid-cols-12 py-6">
        <div class="col-span-2 flex items-center">
          <logo></logo>
        </div>
        <div class="col-span-5 justify-end items-center nav_menu_main">
          <nuxt-link :to="localePath('/')">Главная</nuxt-link>
          <nuxt-link :to="localePath('/cart')">Магазин</nuxt-link>
          <nuxt-link :to="localePath('/about')">О компании</nuxt-link>
          <nuxt-link :to="localePath('/download')">Партнёру</nuxt-link>
          <nuxt-link :to="localePath('/business')">Бизнес</nuxt-link>
          <nuxt-link :to="localePath('/production')">Продукция</nuxt-link>
          <nuxt-link :to="localePath('/news')">Новости</nuxt-link>
        </div>
        <div class="col-span-5 flex justify-end items-center">
          <nuxt-link v-if="$auth.user" :to="localePath('/office')"
            ><i class="bi bi-person"></i> {{ $auth.user.name }}</nuxt-link
          >
          <nuxt-link v-else :to="localePath('/auth/login')"
            ><i class="bi bi-person"></i>
            {{ $t("pages.login.sign_in") }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../ui/logo.vue";
export default {
  components: { logo },
};
</script>
