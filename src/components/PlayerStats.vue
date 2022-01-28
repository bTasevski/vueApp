<template>
  <div style="display: flex; gap: 100px">
    <PlayerBasicData v-bind:playerBasicData="playerBasicData" />
    <div>
      <h3>Choose season and see player detailed statistics</h3>
      <div>
        <div>
          <input
            type="number"
            placeholder="type season"
            @keyup.enter="getSeasonAverages"
            v-model="seasonInput"
          />
          <button @click="getSeasonAverages">Get averages by season</button>
        </div>
      </div>
    </div>
    <PlayerSpecificData v-bind:playerSpecificData="playerSpecificData" />
  </div>

  <!--  <div>{{ playerSpecificData }}}</div>-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerBasicData from "@/components/PlayerBasicData.vue";
import PlayerSpecificData from "@/components/PlayerSpecificData.vue";
import { FetchState } from "@/types/FetchType";
import { handleFetchErrors } from "@/methods/handleFetchError";
import {
  GET_PlAYER_STATS_URL,
  GET_PLAYER_SEASON_AVERAGE_URL,
  GET_PlAYER_URL,
  GET_SEARCHED_PLAYERS_URL,
} from "@/api/api";
import { PlayerAverages } from "@/types/PlayerAverages";

export default defineComponent({
  components: { PlayerBasicData, PlayerSpecificData },
  data() {
    return {
      seasonInput: 2021,
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
      fetchState: FetchState.isIdle,
      playerSpecificData: {} as PlayerAverages,
    };
  },

  methods: {
    async getBasicData(url: string) {
      this.fetchState = FetchState.isLoading;
      try {
        await fetch(url)
          .then(handleFetchErrors)
          .then((response) => response.json())
          .then((data) => {
            this.playerBasicData = data;
            console.log(this.playerBasicData);
            this.fetchState = FetchState.isLoaded;
          });
      } catch (error) {
        console.log(error);
        this.fetchState = FetchState.isLoadFail;
      }
    },

    async getSpecificData(url: string) {
      this.fetchState = FetchState.isLoading;
      try {
        await fetch(url)
          .then(handleFetchErrors)
          .then((response) => response.json())
          .then((data) => {
            this.playerSpecificData = data;
            this.fetchState = FetchState.isLoaded;
          });
      } catch (error) {
        console.log(error);
        this.fetchState = FetchState.isLoadFail;
      }
    },

    getSeasonAverages() {
      if (this.seasonInput > 1978 && this.seasonInput < 10000) {
        this.getSpecificData(
          GET_PLAYER_SEASON_AVERAGE_URL(this.id, this.seasonInput)
        );
        console.log("to tutaj");
      } else {
        alert("type date in YYYY format");
      }
    },
  },
  mounted() {
    this.getSpecificData(GET_PLAYER_SEASON_AVERAGE_URL(this.id, 2021));

    // this.getData(GET_PlAYER_STATS_URL(this.id));
    this.getBasicData(GET_PlAYER_URL(this.id));
  },
});
</script>
