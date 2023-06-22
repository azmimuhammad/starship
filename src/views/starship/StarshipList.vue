<template>
  <div class="search">
    <input
      v-model="searchValue"
      v-on:input="onSearchValue"
      placeholder="Search Starship"
      class="search-form"
    />
  </div>
  <WorldLoading v-if="isLoading && !starships.length" />
  <div class="starship-list" v-else @scroll="onScroll">
    <StarshipCard
      v-for="starship in starships"
      :starship="starship"
      :key="starship.id"
    />
  </div>
</template>

<script>
import axios from "axios"
import StarshipCard from "../../components/card/StarshipCard.vue"
import WorldLoading from "../../components/loading/WorldLoading.vue"

export default {
  name: "StarshipList",

  components: {
    StarshipCard,
    WorldLoading
  },

  data: () => ({
    isLoading: true,
    starships: [],
    nextPage: "",
    searchValue: ""
  }),

  watch: {
    labAccount(val) {
      this.name = val.info.name ?? ""
    }
  },

  async created() {
    window.addEventListener("scroll", this.handleScroll)
    await this.getStarships()
  },

  unmounted() {
    window.removeEventListener("scroll", this.handleScroll)
  },

  methods: {
    async getStarships(search) {
      this.isLoading = true
      const params = search ? `?search=${search}` : ""

      await axios
        .get(`https://swapi.dev/api/starships/${params}`)
        .then((res) => {
          const starship = []
          res.data.results.forEach((strs) => {
            const renderId = strs.url.split("/")
            starship.push({
              ...strs,
              id: renderId[renderId.length - 2],
              cost_in_credits: strs.cost_in_credits
                ? new Intl.NumberFormat().format(strs.cost_in_credits)
                : 0
            })
          })
          this.starships = starship
          this.nextPage = res.data.next
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    async onSearchValue() {
      this.isLoading = true
      this.starships = []
      const value = this.searchValue
      setTimeout(await this.getStarships(value), 1000)
    }
  }
}
</script>

<style scoped>
.starship-list {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}

.search {
  padding: 0px 14px 20px 10px;

  .search-form {
    width: 100%;
    text-align: center;
    height: 40px;
    background-color: #3e607b;
    border: none;
    color: #fff;
    font-size: 18px;

    &:focus {
      background-color: #668597;
    }
  }
}
</style>
