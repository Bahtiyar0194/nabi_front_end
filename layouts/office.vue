<template>
  <div class="relative">
    <div class="dashboard-header">
      <button class="dash-burger" @click="showSidebar = !showSidebar">
        <i v-if="!showSidebar" class="bi bi-list"></i>
        <i v-else class="bi bi-x"></i>
      </button>
      <div class="flex justify-between items-center w-full">
        <div class="px-3">
          <logo />
        </div>
        <div class="px-3 flex items-center text-lg">
          <locales />
          <dark-mode-switcher />
          <cart-icon />
          <nuxt-link
            class="flex justify-between items-center ml-2"
            v-if="$auth.user"
            :to="localePath('/office')"
            ><i class="bi bi-person"></i>
            <span class="text-sm hidden ml-1 lg:inline-block">{{
              $auth.user.name
            }}</span></nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="dashboard-sidebar" :class="{ show: showSidebar }">
      <div>
        <nuxt-link class="dashboard-item" :to="localePath('/office')"
          ><i class="bi bi-house-door"></i
          ><span>{{ $t("pages.dashboard.title") }}</span></nuxt-link
        >
        <nuxt-link class="dashboard-item" :to="localePath('/office/products')"
          ><i class="bi bi-bag"></i
          ><span>{{ $t("pages.products.title") }}</span></nuxt-link
        >
        <nuxt-link class="dashboard-item" :to="localePath('/office/business')"
          ><i class="bi bi-briefcase"></i
          ><span>{{ $t("pages.business.title") }}</span></nuxt-link
        >
        <nuxt-link class="dashboard-item" :to="localePath('/office/structure')"
          ><i class="bi bi-diagram-3"></i
          ><span>Структура</span></nuxt-link
        >
      </div>
      <div>
        <button class="dashboard-item" @click="logout">
          <i class="bi bi-arrow-left-square"></i>
          <span>{{ $t("pages.login.sign_out") }}</span>
        </button>
      </div>
    </div>
    <div class="layout_office">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import DarkModeSwitcher from "../components/ui/darkModeSwitcher.vue";
import Locales from "../components/ui/locales.vue";
import Logo from "../components/ui/logo.vue";
import CartIcon from "../components/ui/cartIcon.vue";
export default {
  middleware: "auth",
  data() {
    return {
      showSidebar: false,
    };
  },
  components: { DarkModeSwitcher, Locales, Logo, CartIcon },
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$router.push(this.localePath("/auth/login"));
      });
    },
  },
};
</script>