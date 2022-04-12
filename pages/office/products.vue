<template>
  <div class="grid gap-4 grid-cols-12 w-full">
    <div
      class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
      v-for="product of getProducts"
      :key="product.id"
    >
      <div class="product-item">
        <div class="product-item-img">
          <img :src="product.image" alt="" />
        </div>
        <div class="product-item-content">
          <h4 class="mb-4">{{ product.name.substring(0, 30) }}</h4>
          <p class="product-description-mini">
            {{ product.mini_description_rus.substring(0, 90) }}
          </p>
          <div class="flex justify-between mb-4">
            <div>
              <p class="text-sm">{{ $t("pages.cart.mark") }}:</p>
              <p class="text-lg text-active">
                {{ product.product_mark.toFixed(2) }}
              </p>
            </div>
            <div>
              <p class="text-sm">{{ $t("pages.cart.price") }}:</p>
              <p class="text-lg text-active">
                {{ new Intl.NumberFormat().format(product.product_amount) }}
                &#8376;
              </p>
            </div>
          </div>
          <nuxt-link
            v-if="getProductsInBasket.includes(product.id)"
            class="btn btn-submit added"
            :to="localePath('/office/cart')"
            >{{ $t("pages.products.in_cart") }}</nuxt-link
          >
          <button
            v-else
            class="btn btn-submit"
            @click.self="addProduct(product.id)"
          >
            {{ $t("pages.products.add_to_cart") }}
          </button>
        </div>
      </div>
    </div>
    <notifications position="top center" classes="my-notify" group="cart"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "office",
  middleware: "auth",
  data() {
    return {
    };
  },
  head() {
    return {
      title: this.$t("pages.products.title"),
    };
  },
  async mounted() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
    ...mapActions("cart", ["fetchOrders"]),
    async addProduct(product_id) {
      await this.$axios
        .$post("api/cart/add_product", {
          product_id: product_id,
        })
        .then((data) => {
          if (data.status === 1) {
            this.fetchProducts();
            this.fetchOrders();
            this.$notify({
              group: 'cart',
              title: '<i class="bi bi-check2-circle"></i> '+this.$t("pages.products.item_in_cart"),
              type: 'default',
              duration: 3000,
              ignoreDuplicates: true
            })
          }
        });
    },
  },
  computed: {
    ...mapGetters("products", ["getProductsInBasket"]),
    ...mapGetters("products", ["getProducts"]),
  },
};
</script>
