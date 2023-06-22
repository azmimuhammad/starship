<template>
  <div class="rating">
    <div class="star-wrapper">
      <img src="../../assets/icon/star.svg" width="15" alt="star-icon" />
      <img src="../../assets/icon/star.svg" width="15" alt="star-icon" />
      <img src="../../assets/icon/star.svg" width="15" alt="star-icon" />
      <img src="../../assets/icon/star.svg" width="15" alt="star-icon" />
      <img src="../../assets/icon/star.svg" width="15" alt="star-icon" />
    </div>
    <div class="content-item">({{ rating }})</div>
  </div>
</template>

<script>
export default {
  name: "RatingCard",

  props: {
    rating: Number
  }
}
</script>

<style scoped>
.rating {
  padding-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.star-wrapper {
  display: flex;
  gap: 3px;
}
</style>
