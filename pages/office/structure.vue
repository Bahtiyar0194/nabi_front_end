<template>
  <div class="container">
    <chart :data="structure"></chart>
  </div>
</template>
<script>
import Chart from "@/components/office/structure/Chart.vue";
export default {
  layout: "office",
  middleware: "auth",
  components: {
    Chart,
  },
  data() {
    return {
      structure: null,
    };
  },
  async mounted() {
    await this.$auth.fetchUser();
    await this.$axios.$post("/api/structure/get").then((data) => {
      this.structure = data;
    });
  },
};
</script>