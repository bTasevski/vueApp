<template>
  <!--  <div id="nav">-->
  <!--    <router-link to="/">ListView</router-link> |-->
  <!--    &lt;!&ndash;    <router-link to="/player_stats/:id">Player Stats</router-link> |&ndash;&gt;-->
  <!--  </div>-->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {},
});
</script>
