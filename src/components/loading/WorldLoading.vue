<template>
  <div class="loading-wrapper">
    <img src="../../assets//icon/world.png" alt="world" class="loading-image" />
  </div>
</template>

<script>
export default {
  name: "WorldLoading"
}
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  padding: 50px 0px;
  opacity: 0.3;
}
.loading-image {
  width: 200px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
