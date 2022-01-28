<template>
  <div>{{ id }}</div>
  <div>{{ fetchState }}</div>
  <div v-if="playerStats.length > 0">{{ playerStats }}</div>
  <div v-if="playerStats.length === 0">no statistic available</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FetchState } from "@/types/FetchType";
import { GET_PlAYER_STATS_URL } from "@/api/api";

export default defineComponent({
  data() {
    return {
      playerStats: {},
      id: this.$route.params.id as string,
      fetchState: FetchState.isIdle,
    };
  },

  methods: {
    async getData(url: string) {
      this.fetchState = FetchState.isLoading;
      try {
        await fetch(url)
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
    this.getData(GET_PlAYER_STATS_URL(this.id));
  },
});
</script>
