<template>
  <div class="appGrid">
    <header class="mainHeader"><h1>NBA Stats</h1></header>
    <div class="sidebar">
      <div class="sidebar__search">
        <input
          class="sidebar__search--input"
          type="search"
          placeholder="search"
          @keyup.enter="searchPlayer"
          v-model="searchInput"
        />
        <VaButton
          icon-right="search"
          gradient
          :rounded="false"
          title="Search player by name or/and surname. Be specific - list
        will show max. of 30 matching players"
          @click="searchPlayer"
        >
          SEARCH
        </VaButton>
      </div>
      <div class="sidebar__playerList">
        <span v-if="fetchState === FetchState.isLoadFail"
          >An error occurred while fetching data</span
        >
        <span v-if="fetchState === FetchState.isLoading">loading...</span>

        <span
          v-if="playersList.length < 1 && fetchState === FetchState.isLoaded"
          >Player not found</span
        >
        <ul>
          <li
            class="sidebar__item"
            v-for="player in playersList"
            :key="player.id"
          >
            <router-link
              :to="{ name: 'PlayerStats', params: { id: player.id } }"
              append
              >{{ player.first_name }} {{ player.last_name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sidebar__moveButtonsContainer">
        <div>
          <div class="sidebar__nextPrevButtons">
            <VaButton
              icon="navigate_before"
              gradient
              :rounded="false"
              @click="decrement"
              >PREV</VaButton
            >
            <div class="sidebar__pageNumber">
              PAGE {{ pageNumber }}/{{ lastPageNumber }}
            </div>

            <VaButton
              icon-right="navigate_next"
              gradient
              :rounded="false"
              @click="increment"
              >NEXT</VaButton
            >
          </div>
        </div>
        <div class="sidebar_goTo">
          <VaButton
            icon-right="keyboard_double_arrow_right"
            gradient
            :rounded="false"
            @click="goTo"
            >GO TO</VaButton
          >
          <input
            class="sidebar__goToInput"
            type="number"
            v-model.number="selectedPageNumber"
            @keyup.enter="goTo"
          />
        </div>
      </div>
    </div>

    <div><router-view :key="$route.fullPath" class="statsContainer" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlayerType } from "@/types/PlayerType";
import { FetchState } from "@/types/FetchType";
import { GET_ALL_PlAYERS_URL } from "@/api/api.ts";
import { GET_SEARCHED_PLAYERS_URL } from "@/api/api.ts";
import { handleFetchErrors } from "@/methods/handleFetchError";
import { VaButton } from "vuestic-ui";
import "@/assets/PlayerListView.scss";

export default defineComponent({
  components: {
    VaButton,
  },

  data() {
    return {
      playersList: [] as Array<PlayerType>,
      pageNumber: 1 as number,
      selectedPageNumber: 1 as number,
      lastPageNumber: 126,
      fetchState: FetchState.isIdle,
      searchInput: "" as string,
      FetchState,
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
        alert("first type searched key word");
      }
    },
  },

  mounted() {
    this.getData(GET_ALL_PlAYERS_URL(1));
  },
});
</script>
