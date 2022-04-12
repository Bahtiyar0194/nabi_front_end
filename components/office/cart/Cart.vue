<template>
  <div class="grid gap-4 grid-cols-12 w-full relative">
    <div class="col-span-12 lg:col-span-9">
      <div class="card-sm mb-3">
        <loader-overlay v-show="showOverlay" />
        <div class="w-full overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th scope="col">{{ $t("pages.cart.product") }}</th>
                <th scope="col">{{ $t("pages.cart.product_name") }}</th>
                <th scope="col">{{ $t("pages.cart.price") }}</th>
                <th scope="col">{{ $t("pages.cart.count") }}</th>
                <th scope="col">{{ $t("pages.cart.sum") }}</th>
                <th scope="col">{{ $t("pages.cart.mark") }}</th>
                <th scope="col">{{ $t("pages.cart.actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in getOrders" :key="order.product_id">
                <td>
                  <img class="w-24" :src="order.image" alt="" />
                </td>
                <td>
                  {{ order.product_name }}
                </td>
                <td class="whitespace-nowrap">
                  {{ order.product_amount.toFixed(2) }}
                  &#8376;
                </td>
                <td class="whitespace-nowrap">
                  <div class="order_count_controls mb-1">
                    <button
                      type="button"
                      :value="order.product_id"
                      v-debounce:500ms="minusProductBasket"
                      :debounce-events="'click'"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      :value="order.product_count"
                      @change="
                        changeProductCountOnBasket(
                          order.product_id,
                          $event.target.value
                        )
                      "
                    />
                    <button
                      type="button"
                      :value="order.product_id"
                      v-debounce:500ms="plusProductBasket"
                      :debounce-events="'click'"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td class="whitespace-nowrap w-40">
                  <animated-number
                    :value="order.product_amount * order.product_count"
                    :formatValue="formatToPrice"
                    :duration="500"
                  />
                  &#8376;
                </td>
                <td class="whitespace-nowrap">
                  <animated-number
                    :value="order.product_mark"
                    :formatValue="formatToPrice"
                    :duration="500"
                  />
                </td>
                <td>
                  <button
                    :title="$t('pages.cart.delete_product')"
                    class="order-delete-button"
                    @click="deleteProductFromBasket(order.product_id)"
                  >
                    &#215;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="grid gap-4 grid-cols-12 w-full relative">
        <div class="col-span-12">
          <div class="card" id="buyerDataWrap">
            <p class="text-active mb-6 text-lg">
              {{ $t("pages.cart.contact_details") }}:
            </p>
            <div class="grid gap-4 grid-cols-12 w-full relative">
              <div class="col-span-12 lg:col-span-6">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="contactForm.last_name"
                    class="custom-input small-input"
                  />
                  <label v-if="c_errors.last_name" class="label-error">{{
                    c_errors.last_name[0]
                  }}</label>
                  <label v-else>{{ $t("form.last_name") }}</label>
                </div>
              </div>
              <div class="col-span-12 lg:col-span-6">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="contactForm.name"
                    class="custom-input small-input"
                  />
                  <label v-if="c_errors.name" class="label-error">{{
                    c_errors.name[0]
                  }}</label>
                  <label v-else>{{ $t("form.name") }}</label>
                </div>
              </div>
              <div class="col-span-12 lg:col-span-6">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="contactForm.email"
                    class="custom-input small-input"
                  />
                  <label v-if="c_errors.email" class="label-error">{{
                    c_errors.email[0]
                  }}</label>
                  <label v-else>{{ $t("form.email") }}</label>
                </div>
              </div>
              <div class="col-span-12 lg:col-span-6">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="contactForm.phone"
                    class="custom-input small-input"
                  />
                  <label v-if="c_errors.phone" class="label-error">{{
                    c_errors.phone[0]
                  }}</label>
                  <label v-else>{{ $t("form.phone") }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12">
          <div class="card" id="deliveryTypeSelection">
            <p class="text-active mb-6 text-lg">
              {{ $t("pages.cart.choose_shipping_method") }}:
            </p>
            <div
              v-for="delivery_type in getDeliveryTypes"
              :key="delivery_type.id"
              class="payment_type_item"
            >
              <input
                type="radio"
                :id="'delivery_type_' + delivery_type.id"
                name="delivery_type"
                :value="delivery_type.id"
                v-model="selected_delivery_type"
              />
              <label :for="'delivery_type_' + delivery_type.id">
                <img
                  :src="
                    require(`~/assets/img/delivery_types/${delivery_type.image}.svg`)
                  "
                />
                <p>{{ delivery_type.name_rus }}</p>
              </label>
            </div>
            <div class="mt-4" v-if="selected_delivery_type === 1">
              <p class="text-active mb-6 text-lg">
                Укажите адрес для доставки:
              </p>
              <div class="grid gap-4 grid-cols-12 w-full relative">
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <select
                      class="custom-input small-input"
                      v-model="deliveryForm.country"
                      @change="getDeliveryRegionsList()"
                    >
                      <option
                        v-for="country in getDeliveryCountries"
                        :key="country.id"
                        :value="country.id"
                      >
                        {{ country.name }}
                      </option>
                    </select>
                    <label v-if="d_errors.country" class="label-error">{{
                      d_errors.country[0]
                    }}</label>
                    <label v-else>{{ $t("form.country") }}</label>
                  </div>
                </div>
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <select
                      class="custom-input small-input"
                      v-model="deliveryForm.region"
                      @change="getDeliveryCitiesList()"
                    >
                      <option
                        v-for="region in getDeliveryRegions"
                        :key="region.id"
                        :value="region.id"
                      >
                        {{ region.name }}
                      </option>
                    </select>
                    <label v-if="d_errors.region" class="label-error">{{
                      d_errors.region[0]
                    }}</label>
                    <label v-else>{{ $t("form.region") }}</label>
                  </div>
                </div>
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <select
                      class="custom-input small-input"
                      v-model="deliveryForm.city"
                    >
                      <option selected disabled value="">Выберите город</option>
                      <option
                        v-for="city in getDeliveryCities"
                        :key="city.id"
                        :value="city.id"
                      >
                        {{ city.name }}
                      </option>
                    </select>
                    <label v-if="d_errors.city" class="label-error">{{
                      d_errors.city[0]
                    }}</label>
                    <label v-else>{{ $t("form.city") }}</label>
                  </div>
                </div>
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="deliveryForm.street"
                      class="custom-input small-input"
                    />
                    <label v-if="d_errors.street" class="label-error">{{
                      d_errors.street[0]
                    }}</label>
                    <label v-else>{{ $t("form.street") }}</label>
                  </div>
                </div>
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="deliveryForm.house"
                      class="custom-input small-input"
                    />
                    <label v-if="d_errors.house" class="label-error">{{
                      d_errors.house[0]
                    }}</label>
                    <label v-else>{{ $t("form.house") }}</label>
                  </div>
                </div>
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <input
                      type="number"
                      v-model="deliveryForm.flat"
                      class="custom-input small-input"
                    />
                    <label>{{ $t("form.flat") }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4" v-if="selected_delivery_type === 2">
              <p class="text-active mb-6 text-lg">
                Выберите точку для получения заказа:
              </p>
              <div class="grid gap-4 grid-cols-12 w-full relative">
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <select
                      class="custom-input small-input"
                      v-model="pickUpForm.country"
                      @change="getPickUpCitiesList()"
                    >
                      <option
                        v-for="country in getPickUpCountries"
                        :key="country.id"
                        :value="country.id"
                      >
                        {{ country.name }}
                      </option>
                    </select>
                    <label v-if="d_errors.country" class="label-error">{{
                      d_errors.country[0]
                    }}</label>
                    <label v-else>{{ $t("form.country") }}</label>
                  </div>
                </div>
                <div class="col-span-12 lg:col-span-4">
                  <div class="form-group">
                    <select
                      class="custom-input small-input"
                      v-model="pickUpForm.city"
                    >
                      <option
                        v-for="city in getPickUpCities"
                        :key="city.id"
                        :value="city.id"
                      >
                        {{ city.city }} - {{ city.address }}
                      </option>
                    </select>
                    <label v-if="d_errors.city" class="label-error">{{
                      d_errors.city[0]
                    }}</label>
                    <label v-else>{{ $t("form.city") }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12">
          <div class="card" id="paymentTypeSelection">
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
      </div>
    </div>
    <div class="col-span-12 lg:col-span-3 relative">
      <div class="top-0 left-0 w-full h-full lg:absolute">
        <div class="card fix">
          <loader-overlay v-show="showOverlay" />
          <div class="flex flex-col justify-between lg:flex-row">
            <h5 class="mb-4 corp-font-regular text-current">
              {{ $t("pages.cart.total") }}:
            </h5>
            <h5 class="mb-4">
              <animated-number
                :value="getOrdersSum"
                :formatValue="formatToPrice"
                :duration="500"
              />
              &#8376;
            </h5>
          </div>
          <hr class="mb-4" />
          <div class="flex justify-between mb-3">
            <p class="corp-font-light">{{ $t("pages.cart.total_count") }}:</p>
            <p class="text-active">{{ getOrdersCount }}</p>
          </div>
          <div class="flex justify-between mb-6">
            <p class="corp-font-light">{{ $t("pages.cart.marks") }}:</p>
            <p class="text-active">
              <animated-number
                :value="getOrdersMarks"
                :formatValue="formatToPrice"
                :duration="500"
              />
            </p>
          </div>
          <a class="btn btn-submit" @click.self="placeAnOrder(getOrderId)">{{
            $t("pages.cart.order")
          }}</a>
        </div>
      </div>
    </div>
    <Modal ref="modal">
      <template slot="modal-content">
        <div v-if="statusCode === 3">
          <p class="text-center mb-2 text-active">
            {{ $t("pages.cart.choose_other_method") }}
          </p>
        </div>
        <div v-if="statusCode === 2">
          <h5 class="text-center mb-2">
            {{ $t("pages.cart.not_funds") }}
          </h5>
          <nuxt-link
            class="text-gold-500 text-center block"
            :to="localePath('/office')"
            >{{ $t("pages.cart.top_up") }}</nuxt-link
          >
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/ui/modal.vue";
import loaderOverlay from "@/components/ui/loaderOverlay.vue";
import { mapActions, mapGetters } from "vuex";
import AnimatedNumber from "animated-number-vue";
export default {
  data() {
    return {
      d_errors: [],
      c_errors: [],
      isModalVisible: false,
      showOverlay: false,
      selected_payment_type: "",
      selected_delivery_type: "",
      deliveryForm: {
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
        flat: "",
      },
      pickUpForm: {
        country: "",
        city: "",
      },

      contactForm: {
        last_name: this.$auth.user.last_name,
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        phone: this.$auth.user.phone,
      },
      statusCode: "",
    };
  },
  components: {
    AnimatedNumber,
    loaderOverlay,
    Modal,
  },
  methods: {
    ...mapActions("cart", ["fetchOrders"]),
    ...mapActions("cart", ["fetchPaymentAndDeliveryTypes"]),
    ...mapActions("cart", ["fetchDeliveryAndPickUpCountries"]),
    ...mapActions("cart", ["fetchDeliveryRegions"]),
    ...mapActions("cart", ["fetchDeliveryCities"]),
    ...mapActions("cart", ["fetchPickUpCities"]),
    async placeAnOrder(order_id) {
      if (this.selected_payment_type && this.selected_delivery_type) {
        this.showOverlay = true;
        this.c_errors = [];
        this.d_errors = [];
        await this.$axios
          .post("api/cart/place_an_order", {
            o_id: order_id,
            pt_id: this.selected_payment_type,
            d_id: this.selected_delivery_type,
            d_form_data: this.deliveryForm,
            pu_form_data: this.pickUpForm,
            c_form_data: this.contactForm,
          })
          .then((resp) => {
            if (resp.data.status === 1) {
              this.$router.push(this.localePath("/office"));
            } else if (resp.data.status === 2) {
              this.showOverlay = false;
              this.statusCode = 2;
              this.$refs.modal.isModalVisible = true;
            } else if (resp.data.status === 3) {
              this.showOverlay = false;
              this.statusCode = 3;
              this.$refs.modal.isModalVisible = true;
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status == 422) {
                if (error.response.data.d_errors) {
                  this.d_errors = error.response.data.d_errors;
                  this.$myLib.scrollToElem("deliveryTypeSelection");
                } else if (error.response.data.c_errors) {
                  this.c_errors = error.response.data.c_errors;
                  this.$myLib.scrollToElem("buyerDataWrap");
                }
              }
              this.showOverlay = false;
            }
          });
      } else {
        if (!this.selected_delivery_type) {
          this.$myLib.scrollToElem("deliveryTypeSelection");
        } else if (!this.selected_payment_type) {
          this.$myLib.scrollToElem("paymentTypeSelection");
        }
      }
    },
    async plusProductBasket(product_id) {
      await this.$axios
        .$post("api/cart/plus_product", {
          product_id: product_id,
        })
        .then((data) => {
          if (data.status === 1) {
            this.fetchOrders();
          }
        });
    },
    async minusProductBasket(product_id) {
      await this.$axios
        .$post("api/cart/minus_product", {
          product_id: product_id,
        })
        .then((data) => {
          if (data.status === 1) {
            this.fetchOrders();
          }
        });
    },
    async changeProductCountOnBasket(product_id, count) {
      await this.$axios
        .$post("api/cart/change_product_count", {
          count: count,
          product_id: product_id,
        })
        .then((data) => {
          if (data.status === 1) {
            this.fetchOrders();
          }
        });
    },
    async deleteProductFromBasket(product_id) {
      await this.$axios
        .$post("api/cart/delete_product", {
          product_id: product_id,
        })
        .then((data) => {
          if (data.status === 1) {
            this.fetchOrders();
          }
        });
    },
    async getDeliveryRegionsList() {
      this.fetchDeliveryRegions(this.deliveryForm.country);
    },
    async getDeliveryCitiesList() {
      this.fetchDeliveryCities(this.deliveryForm.region);
    },
    async getPickUpCitiesList() {
      this.fetchPickUpCities(this.pickUpForm.country);
    },
    formatToPrice(value) {
      return `${value.toFixed(2)}`;
    },
  },
  async mounted() {
    this.fetchPaymentAndDeliveryTypes();
    this.fetchDeliveryAndPickUpCountries();
  },
  computed: {
    ...mapGetters("cart", ["getOrderId"]),
    ...mapGetters("cart", ["getOrders"]),
    ...mapGetters("cart", ["getOrdersSum"]),
    ...mapGetters("cart", ["getOrdersMarks"]),
    ...mapGetters("cart", ["getOrdersCount"]),
    ...mapGetters("cart", ["getPaymentTypes"]),
    ...mapGetters("cart", ["getDeliveryTypes"]),
    ...mapGetters("cart", ["getDeliveryCountries"]),
    ...mapGetters("cart", ["getDeliveryRegions"]),
    ...mapGetters("cart", ["getDeliveryCities"]),
    ...mapGetters("cart", ["getPickUpCountries"]),
    ...mapGetters("cart", ["getPickUpCities"]),
  },
};
</script>