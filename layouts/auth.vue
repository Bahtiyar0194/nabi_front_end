<template>
  <div class="h-screen flex flex-wrap content-between">
    <div class="w-full py-6 flex">
      <div class="w-full mx-8 md:mx-20 flex items-center">
        <div class="grid grid-cols-12 w-full">
          <div class="col-span-2">
            <logo></logo>
          </div>
          <div class="col-span-10 flex justify-end items-center">
            <dark-mode-switcher></dark-mode-switcher>
            <locales></locales>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 lg:grid-cols-9 w-full mb-6">
      <div class="col-start-2 col-span-10 lg:col-start-4 lg:col-span-3">
        <Nuxt />
      </div>
    </div>
    <div class="py-3 w-full bg-active text-center">
      &copy; 2021 {{ $t("all_rights") }}
    </div>
  </div>
</template>
<script>
import DarkModeSwitcher from "../components/ui/darkModeSwitcher.vue";
import Locales from "../components/ui/locales.vue";
import Logo from "../components/ui/logo.vue";
export default {
  components: { Logo, DarkModeSwitcher, Locales },
};
</script>
