<template>
  <div>{{ this.$route.params.id }}</div>
  <div>{{ this.playerStats }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FetchState } from "@/types/FetchType";

export default defineComponent({
  data() {
    return {
      playerStats: {},
      GET_PlAYER_STATS_URL: "https://www.balldontlie.io/api/v1/stats" as string,
      fetchState: FetchState.isIdle,
    };
  },

  methods: {
    async getData() {
      this.fetchState = FetchState.isLoading;
      try {
        await fetch(
          `${this.GET_PlAYER_STATS_URL}?player_ids[]=${this.$route.params.id}`
        )
          .then((response) => response.json())
          .then((data) => {
            this.playerStats = data.data;
            console.log(this.playerStats);
            this.fetchState = FetchState.isLoaded;
          });
      } catch (error) {
        console.error(error);
        this.fetchState = FetchState.isLoadFail;
      }
    },
  },
  mounted() {
    this.getData();
  },
});
</script>
