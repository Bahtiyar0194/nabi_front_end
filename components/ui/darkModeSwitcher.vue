<template>
  <a @click="changeTheme" class="ml-2">
    <span v-if="darkMode"><i class="bi bi-moon-stars"></i></span>
    <span v-else><i class="bi bi-sun"></i></span>
  </a>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false
    };
  },
  mounted() {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
      this.darkMode = true;
    } else {
      document.querySelector("html").classList.remove("dark");
      this.darkMode = false;
    }
  },
  methods: {
    changeTheme() {
      if (localStorage.getItem("theme") === "dark") {
        localStorage.setItem("theme", "light");
        document.querySelector("html").classList.remove("dark");
        this.darkMode = false;
      } else {
        localStorage.setItem("theme", "dark");
        document.querySelector("html").classList.add("dark");
        this.darkMode = true;
      }
    }
  }
};
</script>
