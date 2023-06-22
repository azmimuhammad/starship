<template>
  <HeaderComponent />
  <div class="content">
    <RouterView />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue"

export default {
  name: "App",
  components: {
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 60%;
  margin: 0px auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.content {
  border: 1px solid #40667d;
  background-color: #40667d;
  margin-top: 0;
  padding: 10px 20px;
}

.content-item {
  display: flex;
  gap: 10px;
}

.content-value {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
