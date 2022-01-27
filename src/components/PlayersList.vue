<template>
  <div class="PlayersList">
    <h1>Players List:</h1>

    <ul>
      <li v-for="player in playersList" :key="player.id">
        <router-link
          :to="{ name: 'PlayerStats', params: { id: player.id } }"
          append
          >{{ player.first_name }} {{ player.last_name }}
        </router-link>
      </li>
    </ul>

    <button @click="decrement">Prev</button>

    <div>page {{ pageNumber }} of 100</div>

    <button @click="increment">Next</button>

    <input
      placeholder="choose page"
      type="number"
      v-model.number="selectedPageNumber"
      @keyup.enter="goTo"
    />

    <button @click="goTo">Go to</button>

    <input
      placeholder="search"
      @keyup.enter="searchPlayer"
      v-model="searchInput"
    />
    <button @click="searchPlayer">search</button>

    <div>{{ fetchState }}</div>

    <p v-if="playersList.length < 1">not found</p>
  </div>
  <router-view :key="$route.fullPath" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlayerType } from "@/types/PlayerType";
import { FetchState } from "@/types/FetchType";
import { GET_ALL_PlAYERS_URL } from "@/api/api.ts";
import { GET_PLAYER_URL } from "@/api/api.ts";

export default defineComponent({
  data() {
    return {
      query: null,
      playersList: [] as Array<PlayerType>,
      pageNumber: 1 as number,
      selectedPageNumber: 1 as number,
      fetchState: FetchState.isIdle,
      searchInput: "" as string,
    };
  },

  methods: {
    async getData(url: string) {
      this.fetchState = FetchState.isLoading;
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.playersList = data.data;
            console.log(this.playersList);
            this.fetchState = FetchState.isLoaded;
          });
      } catch (error) {
        console.error(error);
        this.fetchState = FetchState.isLoadFail;
      }
    },
    decrement() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.getData(GET_ALL_PlAYERS_URL(this.pageNumber));
      }
    },
    increment() {
      if (this.pageNumber <= 100) {
        this.pageNumber++;
        this.getData(GET_ALL_PlAYERS_URL(this.pageNumber));
      }
    },
    goTo() {
      if (this.selectedPageNumber > 100) {
        alert(
          `page number ${this.selectedPageNumber} does not exist, select page from 1 to 100`
        );
      } else {
        this.pageNumber = this.selectedPageNumber;
        this.getData(GET_ALL_PlAYERS_URL(this.pageNumber));
      }
    },
    searchPlayer() {
      if (this.searchInput.length > 0) {
        this.getData(GET_PLAYER_URL(this.searchInput));
      } else {
        alert(" first type search key word");
      }
    },
  },

  mounted() {
    this.getData(GET_ALL_PlAYERS_URL(1));
  },
});
</script>
