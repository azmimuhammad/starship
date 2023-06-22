<template>
  <div class="card" @click="this.$router.push(`/starship/${starship.id}`)">
    <div class="card-image-wrapper">
      <img
        src="../../assets/starship-icon.png"
        class="card-image"
        alt="card-image"
      />
    </div>
    <div class="title">
      {{ starship.name }}
    </div>
    <div class="content-item">
      <img src="../../assets/icon/speed-alt.svg" width="25" alt="speed-icon" />
      <div class="content-value">{{ starship.max_atmosphering_speed }}</div>
    </div>
    <div class="content-item">
      <img
        src="../../assets/icon/dollar-sign.svg"
        width="25"
        alt="dollar-icon"
      />
      <div class="content-value">{{ starship.cost_in_credits }}</div>
    </div>
    <RatingCard :rating="starship.hyperdrive_rating" />
  </div>
</template>

<script>
import RatingCard from "../rating/RatingCard.vue"

export default {
  name: "StarshipCard",

  components: {
    RatingCard
  },

  props: {
    starship: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>

<style scoped>
.card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    border: 1px solid #3d5c71;
    border-radius: 5px;
  }
}

.card-image-wrapper {
  width: 100%;
  background-color: #3d5c71;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.card-image {
  width: 80%;
}

.title {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 3px;
  border-bottom: 1px solid #3d5c71;
  padding-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: "ellipsis";
}

</style>
