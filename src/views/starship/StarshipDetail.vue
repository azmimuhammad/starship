<template>
  <WorldLoading v-if="isLoading" />
  <div class="starship-detail" v-else>
    <div class="image-wrapper">
      <img class="image" src="@/assets/starship-icon.png" />
    </div>
    <div class="content">
      <div class="title">{{ detail.name }}</div>
      <div>Model: {{ detail.model }}</div>
      <div>Manufacturer: {{ detail.manufacturer }}</div>
      <div>Starship Class: {{ detail.starship_class }}</div>
      <div class="desc">
        <div class="content-item">
          <img src="@/assets/icon/length.png" width="25" alt="speed-icon" />
          <div class="content-value">{{ detail.length }} m</div>
        </div>
        <div class="content-item">
          <img src="@/assets/icon/speed-alt.svg" width="25" alt="speed-icon" />
          <div class="content-value">
            {{ detail.max_atmosphering_speed }} km/h (Max athospher speed)
          </div>
        </div>
        <div class="content-item">
          <img
            src="@/assets/icon/dollar-sign.svg"
            width="25"
            alt="dollar-icon"
          />
          <div class="content-value">
            $ {{ new Intl.NumberFormat().format(detail.cost_in_credits) }}
          </div>
        </div>
        <div class="content-item">
          <img
            src="@/assets/icon/icons8-cargo-64.png"
            width="25"
            alt="dollar-icon"
          />
          <div class="content-value">
            {{ new Intl.NumberFormat().format(detail.cargo_capacity) }} kg
            (Cargo capacity)
          </div>
        </div>
        <div class="content-item">
          <img
            src="@/assets/icon/icons8-crew-64.png"
            width="25"
            alt="dollar-icon"
          />
          <div class="content-value">{{ detail.crew }} Crew</div>
        </div>
        <div class="content-item">
          <img
            src="@/assets/icon/icons8-passenger-64.png"
            width="25"
            alt="dollar-icon"
          />
          <div class="content-value">{{ detail.passengers }} Passengers</div>
        </div>
      </div>
      <div class="pilots-wrapper" v-if="detail.pilots.length > 0">
        <div>Pilots</div>
        <div class="pilot-items">
          <div
            class="pilot-item"
            v-for="(pilot, idx) in detail.pilots"
            :key="idx"
          >
            <div class="pilot-img-wrapper">
              <img
                :src="renderPicture(pilot.gender)"
                width="60"
                alt="pilot-profile"
              />
            </div>
            <div class="pilot-name">{{ pilot.name }}</div>
          </div>
        </div>
      </div>
      <div class="films-wrapper" v-if="detail.films.length > 0">
        <div>Films</div>
        <div class="film-items" v-for="(film, idx) in detail.films" :key="idx">
          <div class="image-wrapper-film">
            <img
              class="image"
              src="@/assets/icon/movie-file.svg"
              alt="film-icon"
            />
          </div>
          <div class="film-content">
            <div class="film-title">
              {{ film.title }} ({{ film.release_year }})
            </div>
            <div class="film-sub">Director: {{ film.director }}</div>
            <div class="film-sub">Producer: {{ film.producer }}</div>
            <div class="film-desc">
              {{ film.opening_crawl }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

import WorldLoading from "@/components/loading/WorldLoading.vue"

export default {
  name: "StarshipDetail",

  components: {
    WorldLoading
  },

  data: () => ({
    detail: {},
    isLoading: false
  }),

  async created() {
    await this.getDetail()
    await this.getFilms()
  },

  methods: {
    async getDetail() {
      this.isLoading = true

      const id = this.$route.params.id
      await axios.get(`https://swapi.dev/api/starships/${id}`).then((res) => {
        this.detail = res.data

        res.data.pilots.forEach(async (pilot, idx) => {
          await axios.get(pilot).then((res) => {
            let pilots = this.detail.pilots
            pilots[idx] = {
              name: res.data.name,
              gender: res.data.gender
            }
            this.detail = {...this.detail, pilots: pilots}
          })
        })
      })
      this.isLoading = false
    },

    async getFilms() {
      const filmList = this.detail.films

      filmList.forEach(async (film, idx) => {
        await axios.get(film).then((res) => {
          let _film = filmList

          _film[idx] = {
            title: res.data.title,
            opening_crawl: res.data.opening_crawl,
            director: res.data.director,
            producer: res.data.producer,
            release_date: res.data.release_date,
            release_year: res.data.release_date.split("-")[0]
          }

          this.detail = {...this.detail, films: _film}
        })
      })
    },

    renderPicture(gender) {
      if (gender === "male")
        return require("@/assets/icon/icons8-man-pilot-48.png")
      else return require("@/assets/icon/icons8-pilot-48.png")
    }
  }
}
</script>

<style scoped>
.starship-detail {
  display: grid;
  flex-direction: column;
  grid-template-columns: 20% 80%;
}
.title {
  font-size: 26px;
  font-weight: 500;
  letter-spacing: 3px;
  border-bottom: 1px solid #3d5c71;
  padding-bottom: 10px;
}

.image-wrapper,
.pilot-img-wrapper,
.image-wrapper-film {
  width: 100%;
  background-color: #3d5c71;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}

.image-wrapper {
  height: 200px;
}

.image {
  width: 80%;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 20px;

  .desc {
    display: grid;
    grid-template-columns: 50% 50%;

    .content-item {
      padding: 5px 0px;
    }
  }
}
.pilots-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  .pilot-items {
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;

    .pilot-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 0px 20px 20px 0px;

      .pilot-img-wrapper {
        padding: 20px 0px;
      }

      .pilot-name {
        font-size: 12px;
        word-wrap: break-word;
      }
    }
  }
}

.films-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  .film-items {
    display: grid;
    grid-template-columns: 20% auto;
    margin-bottom: 20px;

    .image-wrapper-film {
      height: 170px;
    }
    .film-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 0px 20px;

      .film-title {
        font-size: 22px;
        font-weight: 500;
      }
      .film-sub,
      .film-desc {
        font-size: 12px;
      }
    }
  }
}
</style>
