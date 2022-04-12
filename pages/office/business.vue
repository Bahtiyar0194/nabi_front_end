<template>
  <div class="grid gap-4 grid-cols-12">
    <div v-if="$auth.user.current_status_id >= 2">123</div>
    <div v-else class="col-span-12 lg:col-span-6 lg:col-start-4 pt-10">
      <div v-if="!clicked" class="card text-center">
        <h2 class="mb-2">{{ $t("pages.business.access_denied") }}</h2>
        <p class="mb-6">{{ $t("pages.business.access_denied_desc") }}</p>
        <button class="btn btn-submit" @click="cont()">
          {{ $t("continue") }}
        </button>
      </div>
      <div v-else class="card text-center">
        <h3 class="mb-6">{{ $t("pages.business.pay_desc") }}</h3>
        <div class="mb-6">
          <div id="paymentTypeSelection">
            <p class="text-active mb-6 text-lg">
              {{ $t("pages.cart.choose_payment_method") }}:
            </p>
            <div
              v-for="payment_type in getPaymentTypes"
              :key="payment_type.id"
              class="payment_type_item"
            >
              <input
                type="radio"
                :id="'payment_type_' + payment_type.id"
                name="payment_type"
                :value="payment_type.id"
                v-model="selected_payment_type"
              />
              <label :for="'payment_type_' + payment_type.id">
                <img
                  :src="
                    require(`~/assets/img/payment_types/${payment_type.image}.svg`)
                  "
                />
                <p>{{ payment_type.name_rus }}</p>
              </label>
            </div>
          </div>
        </div>
        <div class="border_active border-b flex justify-between mb-6 pb-2">
          <div>
            <h4>{{ $t("pages.cart.total") }}:</h4>
          </div>
          <div>
            <h4>
              {{ recruiting_data.price }} $
              <span class="corp-font-regular"
                >({{
                  recruiting_data.price * recruiting_data.currency_amount
                }}
                &#8376;)</span
              >
            </h4>
          </div>
        </div>
        <button class="btn btn-submit" @click="pay()">
          {{ $t("continue") }}
        </button>
      </div>
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
      clicked: false,
      selected_payment_type: "",
      recruiting_data: "",
    };
  },
  head() {
    return {
      title: this.$t("pages.business.title"),
    };
  },
  methods: {
    ...mapActions("cart", ["fetchPaymentAndDeliveryTypes"]),
    cont() {
      this.clicked = true;
    },
    async pay() {
      if (!this.selected_payment_type) {
        this.$myLib.scrollToElem("paymentTypeSelection");
      } else {
        await this.$axios
          .$post("api/marketing/pay/recruiting", {
            pt_id: this.selected_payment_type,
          })
          .then((data) => {
            if (data.status === 1) {
              this.$auth.fetchUser().then(() => {
                this.$forceUpdate();
              });
            }
          });
      }
    },
  },

  async mounted() {
    if (this.$auth.user.current_status_id < 2) {
      await this.fetchPaymentAndDeliveryTypes();
    }
    await this.$axios.$get("api/marketing/get/recruiting_data").then((data) => {
      this.recruiting_data = data;
    });
  },
  computed: {
    ...mapGetters("cart", ["getPaymentTypes"]),
  },
};
</script>
