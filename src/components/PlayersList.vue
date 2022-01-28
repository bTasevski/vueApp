<template>
  <div style="display: flex; gap: 100px">
    <div class="PlayersList">
      <div>
        <button @click="decrement">Prev</button>

        <div style="display: inline-block">
          page {{ pageNumber }} of {{ lastPageNumber }}
        </div>

        <button @click="increment">Next</button>
      </div>
      <div>
        <input
          placeholder="choose page"
          type="number"
          v-model.number="selectedPageNumber"
          @keyup.enter="goTo"
        />

        <button @click="goTo">Go to</button>
      </div>
      <div>
        <input
          placeholder="search"
          @keyup.enter="searchPlayer"
          v-model="searchInput"
        />
        <button
          title="Search player by name or/and surname. Be specific - list
        will show max. of 30 matching players"
          @click="searchPlayer"
        >
          search
        </button>
      </div>
      <div>
        <h2>Players List:</h2>
        <ul>
          <li v-for="player in playersList" :key="player.id">
            <router-link
              :to="{ name: 'PlayerStats', params: { id: player.id } }"
              append
              >{{ player.first_name }} {{ player.last_name }}
            </router-link>
          </li>
        </ul>
      </div>

      <p v-if="playersList.length < 1">not found</p>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlayerType } from "@/types/PlayerType";
import { FetchState } from "@/types/FetchType";
import { GET_ALL_PlAYERS_URL } from "@/api/api.ts";
import { GET_SEARCHED_PLAYERS_URL } from "@/api/api.ts";
import { handleFetchErrors } from "@/methods/handleFetchError";

export default defineComponent({
  data() {
    return {
      playersList: [] as Array<PlayerType>,
      pageNumber: 1 as number,
      selectedPageNumber: 1 as number,
      lastPageNumber: 126,
      fetchState: FetchState.isIdle,
      searchInput: "" as string,
    };
  },

  methods: {
    async getData(url: string) {
      this.fetchState = FetchState.isLoading;
      try {
        await fetch(url)
          .then(handleFetchErrors)
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
      if (this.pageNumber < this.lastPageNumber) {
        this.pageNumber++;
        this.getData(GET_ALL_PlAYERS_URL(this.pageNumber));
      }
    },
    goTo() {
      if (this.selectedPageNumber > this.lastPageNumber) {
        alert(
          `page number ${this.selectedPageNumber} does not exist, select page from 1 to ${this.lastPageNumber}`
        );
      } else {
        this.pageNumber = this.selectedPageNumber;
        this.getData(GET_ALL_PlAYERS_URL(this.pageNumber));
      }
    },
    searchPlayer() {
      if (this.searchInput.length > 0) {
        this.getData(GET_SEARCHED_PLAYERS_URL(this.searchInput));
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
