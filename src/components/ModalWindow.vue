<template>
  <div class="modal-overlay">
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black-overlay);
  z-index: 20;
}

.modal {
  background-color: var(--color-bg-modal-card);
  height: 500px;
  width: 500px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}
</style>
