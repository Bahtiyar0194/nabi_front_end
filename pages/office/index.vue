<template>
  <div class="grid gap-4 grid-cols-12 w-full">
    <div class="col-span-12 lg:col-span-9">
      <div class="status-wrap">
        <div
          class="statuses-container"
          id="status_container"
          @scroll="handleScroll($event.target)"
        >
          <div
            v-for="status of getStatusTypes"
            :key="status.id"
            class="status-item"
            :id="'status_' + status.id"
            :class="{
              active: status.id === $auth.user.current_status_id,
              inactive: status.id < $auth.user.current_status_id,
            }"
          >
            <div class="circle">
              <i class="bi bi-briefcase"></i>
            </div>
            <div class="status-name">
              <div
                v-if="status.id === $auth.user.current_status_id"
                class="text-center text-xs"
              >
                Ваш статус:
              </div>
              {{ status.name }}
            </div>
          </div>
        </div>
        <button id="buttonStatusLeftScroll" @click="leftScroll()">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          id="buttonStatusRightScroll"
          class="active"
          @click="rightScroll()"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
        <client-only>
          <vue-particles
            color="#dedede"
            :particleOpacity="0.2"
            :particlesNumber="150"
            shapeType="edge"
            :particleSize="2"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.1"
            :linesDistance="180"
            :moveSpeed="1"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
          >
          </vue-particles>
        </client-only>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-3">
      <div class="card">
        <p class="mb-1">{{ $t("pages.dashboard.main_wallet") }}</p>
        <h2>{{ $auth.user.main_wallet }} $</h2>
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
      getStatusTypes: "",
    };
  },
  head() {
    return {
      title: this.$auth.user.last_name + " " + this.$auth.user.name,
    };
  },
  async mounted() {
    await this.$auth.fetchUser();
    await this.$axios.$get("api/marketing/get/status_types").then((data) => {
      this.getStatusTypes = data;
      setTimeout(() => {
        let element = document.querySelector(
          "#status_" + this.$auth.user.current_status_id
        );
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 1000);
    });
    await this.fetchOrders();
  },
  methods: {
    ...mapActions("cart", ["fetchOrders"]),
    handleScroll(ob) {
      let btnLeft = document.getElementById("buttonStatusLeftScroll");
      let btnRight = document.getElementById("buttonStatusRightScroll");
      if (ob.scrollLeft <= 0) {
        btnLeft.classList.remove("active");
      } else {
        btnLeft.classList.add("active");
      }

      if (ob.scrollLeft === ob.scrollWidth - ob.offsetWidth) {
        btnRight.classList.remove("active");
      } else {
        btnRight.classList.add("active");
      }
    },
    leftScroll() {
      let container = document.getElementById("status_container");
      container.scrollLeft -= 300;
    },
    rightScroll() {
      let container = document.getElementById("status_container");
      container.scrollLeft += 300;
    },
  },
  computed: {
    ...mapGetters("products", ["getProductsInBasket"]),
  },
};
</script>
