<template>
    <div
      :class="{ active: isModalVisible }"
      class="modal-backdrop"
      @click.self="closeModal()"
    >
      <div class="modal" @click.stop>
        <button class="modal-close-button" @click.self="closeModal()">
          &#10006;
        </button>
        <div class="modal-header">
          <slot name="modal-title"></slot>
        </div>
        <div class="modal-body">
          <slot name="modal-content"></slot>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
</template>
<script>
export default {
  name: "ModalWindow",
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>