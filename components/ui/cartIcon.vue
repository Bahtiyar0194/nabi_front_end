<template>
  <nuxt-link
    class="cart_icon ml-2"
    :class="{ active: getOrdersCount }"
    :to="localePath('/office/cart')"
  >
    <span v-if="getOrdersCount > 0">{{ getOrdersCount }}</span>
    <i class="bi bi-cart2"></i
  ></nuxt-link>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("cart", ["getOrdersCount"]),
  },
};
</script>