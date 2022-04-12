<template>
  <div class="informer" :class="{ active: isInformerVisible }">
    <button class="informer-close-button" @click.self="closeInformer()">
      &#10006;
    </button>
    <div class="informer-header">
      <slot name="informer-title"></slot>
    </div>
    <div class="informer-body">
      <slot name="informer-content"></slot>
    </div>
    <div class="informer-footer"></div>
  </div>
</template>
<script>
export default {
  name: "InformerWindow",
  data() {
    return {
      isInformerVisible: false,
    };
  },
  methods: {
    closeInformer() {
      this.isInformerVisible = false;
    },
  },
  async beforeMount() {
    setTimeout(() => {
      this.isInformerVisible = false;
    }, 3000);
  },
};
</script>