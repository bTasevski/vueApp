<template>
  <div class="stats">
    <PlayerBasicData
      class="stats__basicData"
      :playerBasicData="playerBasicData"
    />
    <!--              model-value="Number"-->
    <div class="stats__rangeInputs">
      <h3>Choose seasons range <span>(max 5 seasons)</span></h3>
      <div class="stats__fromTo">
        <label for="fromSeasonInput">from</label>
        <input
          class="input"
          id="fromSeasonInput"
          type="number"
          @keyup.enter="getSeasonsAverages"
          v-model="fromSeasonInput"
        />
        <label for="fromSeasonInput">to</label>
        <input
          class="input"
          id="toSeasonInput"
          type="number"
          @keyup.enter="getSeasonsAverages"
          v-model="toSeasonInput"
        />
        <VaButton
          icon-right="query_stats"
          gradient
          :rounded="false"
          @click="getSeasonsAverages"
          >GET SEASONS AVERAGES</VaButton
        >
      </div>
    </div>

    <PlayerSpecificData
      class="stats__charts"
      v-bind:playerSpecificData="playerSpecificData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerBasicData from "@/components/PlayerBasicData.vue";
import PlayerSpecificData from "@/components/PlayerSpecificData.vue";
import { FetchState } from "@/types/FetchType";
import { handleFetchErrors } from "@/methods/handleFetchError";
import { GET_PLAYER_SEASON_AVERAGE_URL, GET_PlAYER_URL } from "@/api/api";
import { PlayerAverages } from "@/types/PlayerAverages";
import { VaButton } from "vuestic-ui";
import "../assets/PlayerStats.scss";

export default defineComponent({
  components: { PlayerBasicData, PlayerSpecificData, VaButton },
  data() {
    return {
      fromSeasonInput: 2016,
      toSeasonInput: 2020,
      playerBasicData: {
        id: null as null | number,
        first_name: null as null | string,
        height_feet: null as null | string,
        height_inches: null as null | number,
        last_name: null as null | string,
        position: null as null | string,
        team: {
          full_name: null as null | string,
        },
        weight_pounds: null as null | number,
      },
      id: this.$route.params.id as string,
      basicFetchState: FetchState.isIdle,
      specificFetchState: FetchState.isIdle,
      FetchState,
      playerSpecificData: [] as Array<PlayerAverages>,
      seasons: [] as Array<number | null>,
      gamesPerSeason: [] as Array<number | null>,
      minutesPerMatch: [] as Array<string | null>,
    };
  },

  methods: {
    async getBasicData(url: string) {
      this.basicFetchState = FetchState.isLoading;
      try {
        await fetch(url)
          .then(handleFetchErrors)
          .then((response) => response.json())
          .then((data) => {
            this.playerBasicData = data;
            console.log(this.playerBasicData);
            this.basicFetchState = FetchState.isLoaded;
          });
      } catch (error) {
        console.log(error);
        this.basicFetchState = FetchState.isLoadFail;
      }
    },

    async getSpecificData(url: string) {
      this.playerSpecificData = [];
      this.specificFetchState = FetchState.isLoading;
      try {
        await fetch(url)
          .then(handleFetchErrors)
          .then((response) => response.json())
          .then((data) => {
            this.playerSpecificData.push(data.data);
            console.log(this.playerSpecificData);
            this.specificFetchState = FetchState.isLoaded;
          });
      } catch (error) {
        console.log(error);
        this.specificFetchState = FetchState.isLoadFail;
      }
    },

    getSeasonsAverages() {
      console.log("działam?");
      console.log(typeof this.fromSeasonInput, typeof this.toSeasonInput);
      const range: number = this.toSeasonInput - this.fromSeasonInput;
      let counter = 0;
      if (this.fromSeasonInput <= this.toSeasonInput) {
        if (
          this.fromSeasonInput > 1978 &&
          this.fromSeasonInput < 2100 &&
          this.toSeasonInput > 1978 &&
          this.toSeasonInput < 2100
        ) {
          if (range <= 4) {
            for (let i = 0; i <= range; i++) {
              this.getSpecificData(
                GET_PLAYER_SEASON_AVERAGE_URL(
                  this.id,
                  this.fromSeasonInput + counter
                )
              );

              counter++;
            }
          } else {
            alert("maximum season range is 5");
          }
        } else {
          alert("type date in YYYY format, minimum date is 1978");
        }
      } else {
        alert("season from should be before or same as season to ");
      }
    },
  },

  mounted() {
    this.getBasicData(GET_PlAYER_URL(this.id));
    this.getSeasonsAverages();
  },
});
</script>
