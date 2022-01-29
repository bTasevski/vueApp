<template>
  <div>
    <h2>Detailed statistics:</h2>
    <div>
      <span>{{ seasons }} games played</span>
    </div>
    <!--    <div v-if="seasons.length > 0" >-->
    <div>
      <span>{{ gamesPerSeason }} games played</span>
    </div>
    <div>
      <span>{{ minutesPerMatch }} games played</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { PlayerAverages } from "@/types/PlayerAverages";

export default defineComponent({
  name: "PlayerSpecificData",
  props: ["playerSpecificData"],

  data() {
    return {
      seasons: [] as Array<number | null>,
      gamesPerSeason: [] as Array<number | null>,
      minutesPerMatch: [] as Array<string | null>,
    };
  },

  watch: {
    playerSpecificData: {
      handler(val) {
        this.seasons = [];
        this.gamesPerSeason = [];
        this.minutesPerMatch = [];

        val
          .flat()
          .sort((a: any, b: any) => a.season - b.season)
          .forEach((d: PlayerAverages) => {
            this.seasons.push(d.season);
            this.gamesPerSeason.push(d.games_played);
            this.minutesPerMatch.push(d.min);
            console.log(this.gamesPerSeason);
          });
      },

      deep: true,
      immediate: true,
    },
  },
});
</script>
