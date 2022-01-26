<template>
  <div class="PlayersList">
    <h1>Players List:</h1>
    <!--        <button @click="triggerFetch">Show NBA players</button>-->

    <ul>
      <li v-for="player in playersList" :key="player.id">
        {{ player.first_name }} {{ player.last_name }}
      </li>
    </ul>

    <p>Pobrano dane</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PlayerType } from "@/types/PlayerType";

export default defineComponent({
  name: "PlayersList",
  components: {},

  async setup() {
    let playersList = ref<[PlayerType] | null>(null);

    try {
      const response = await fetch(
        "https://www.balldontlie.io/api/v1/players?page=1&per_page=100"
      );
      const fetchedData = await response.json();
      playersList = fetchedData.data;
    } catch (error) {
      console.error(error);
    }

    console.log(playersList);

    return { playersList };
  },
});
</script>
