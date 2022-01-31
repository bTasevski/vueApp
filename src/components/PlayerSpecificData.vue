<template>
  <div class="chartsContainer">
    <div>
      <h3>Games per season</h3>
      <BarChartStats v-bind:labels="seasons" v-bind:data="gamesPerSeason" />
    </div>
    <div>
      <h3>Points per game</h3>
      <BarChartStats v-bind:labels="seasons" v-bind:data="pointsPerMatch" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarChartStats from "@/components/BarChartStats.vue";
import { PlayerAverages } from "@/types/PlayerAverages";
import "../assets/PlayerSpecificData.scss";

export default defineComponent({
  name: "PlayerSpecificData",
  props: ["playerSpecificData"],
  components: {
    BarChartStats,
  },

  data() {
    return {
      seasons: [] as Array<number | null>,
      gamesPerSeason: [] as Array<number | null>,
      pointsPerMatch: [] as Array<number | null>,
    };
  },

  watch: {
    playerSpecificData: {
      handler(val) {
        this.seasons = [];
        this.gamesPerSeason = [];
        this.pointsPerMatch = [];

        val
          .flat()
          .sort((a: any, b: any) => a.season - b.season)
          .forEach((d: PlayerAverages) => {
            this.seasons.push(d.season);
            this.gamesPerSeason.push(d.games_played);
            this.pointsPerMatch.push(d.pts);
            console.log(this.gamesPerSeason);
          });
      },

      deep: true,
      immediate: true,
    },
  },
});
</script>
