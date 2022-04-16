<template>
  <div class="grid gap-4 grid-cols-12">
    <div class="col-span-12 lg:col-span-6 lg:col-start-4 pt-10">
        orders
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "office",
  middleware: "auth",
  data() {
    return {
      orders: [],
    };
  },
  head() {
    return {
      title: this.$t("pages.business.title"),
    };
  },
  methods: {
    //...mapActions("cart", ["fetchPaymentAndDeliveryTypes"]),
  },

  async mounted() {

    // await this.$axios.$get("api/marketing/get/recruiting_data").then((data) => {
    //   this.recruiting_data = data;
    // });
  },
  computed: {
    // ...mapGetters("cart", ["getPaymentTypes"]),
  },
};
</script>
