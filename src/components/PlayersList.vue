<template>
  <div class="PlayersList">
    <h1>Players List:</h1>

    <ul>
      <li v-for="player in playersList" :key="player.id">
        {{ player.first_name }} {{ player.last_name }}
      </li>
    </ul>
    <button @click="decrement">Prev</button>
    <div>page {{ pageNumber }} of 100</div>
    <button @click="increment">Next</button>

    <input placeholder="choose page" v-model.number="selectedPageNumber" />

    <button @click="goTo">Go to</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlayerType } from "@/types/PlayerType";

export default defineComponent({
  data() {
    return {
      query: null,
      playersList: [] as Array<PlayerType>,
      pageNumber: 1 as number,
      selectedPageNumber: 1 as number,
      // fetchState: state.idle as stateType;
    };
  },

  methods: {
    async getData() {
      try {
        await fetch(
          `https://www.balldontlie.io/api/v1/players?page=${this.pageNumber}&per_page=25`
        )
          .then((response) => response.json())
          .then((data) => {
            this.playersList = data.data;
            console.log(this.playersList);
          });
      } catch (error) {
        console.error(error);
      }
    },
    decrement() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.getData();
      }
    },
    increment() {
      if (this.pageNumber <= 100) {
        this.pageNumber++;
        this.getData();
      }
    },
    goTo() {
      this.pageNumber = this.selectedPageNumber;
      this.getData();
    },
  },

  mounted() {
    this.getData();
  },
});
</script>

<!--name: "PlayersList",-->
<!--components: {},-->
<!--// props: {-->
<!--//   pageNumber: { default: 5 as number },-->
<!--// },-->

<!--async setup(props) {-->
<!--const pageNumber = ref(151);-->
<!--const selectedPageNumber = ref<null | number>(null);-->

<!--const increment = () => {-->
<!--if (pageNumber.value <= 151) pageNumber.value++;-->
<!--};-->
<!--const decrement = () => {-->
<!--if (pageNumber.value > 1) pageNumber.value&#45;&#45;;-->
<!--};-->

<!--// const handleInput = () => {-->
<!--//   console.log(selectedPageNumber.value);-->
<!--// };-->

<!--let playersList = ref<[PlayerType] | null>(null);-->

<!--try {-->
<!--const response = await fetch(-->
<!--`https://www.balldontlie.io/api/v1/players?page=${pageNumber.value}&per_page=25`-->
<!--);-->
<!--const fetchedData = await response.json();-->
<!--playersList = fetchedData.data;-->
<!--} catch (error) {-->
<!--console.error(error);-->
<!--}-->

<!--console.log(playersList);-->

<!--return {-->
<!--playersList,-->
<!--pageNumber,-->
<!--increment,-->
<!--decrement,-->
<!--selectedPageNumber,-->
<!--};-->
<!--},-->
<!--});-->
