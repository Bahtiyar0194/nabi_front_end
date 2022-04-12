<template>
  <div class="relative">
    <Cart v-if="getOrdersCount > 0"></Cart>
    <div v-else class="grid gap-4 grid-cols-12 w-full relative">
      <div class="col-span-12">
        <div class="card">
          <h2 class="mb-2">{{ $t("pages.cart.cart_empty_title") }}</h2>
          <p class="mb-2">{{ $t("pages.cart.cart_empty_title_desc") }}</p>
          <nuxt-link
            class="text-gold-500"
            :to="localePath('/office/products')"
            >{{ $t("pages.cart.go_to_catalog") }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Cart from "@/components/office/cart/Cart.vue";
export default {
  layout: "office",
  middleware: "auth",
  components: {
    Cart,
  },
  methods: {
    ...mapActions("cart", ["fetchOrders"]),
  },
  async mounted() {
    this.fetchOrders();
  },
  computed: {
    ...mapGetters("cart", ["getOrdersCount"]),
  },
  head() {
    return {
      title: this.$t("pages.cart.title"),
    };
  },
};
</script>