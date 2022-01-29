<template>
  <div>
    <h2>Detailed statistics:</h2>
    <!--    <div v-if="playerSpecificData.data?.length">-->
    <!--      <div>-->
    <!--        <span>{{ playerSpecificData.data[0].games_played }} games played</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span>{{ playerSpecificData.data[0].min }} minutes</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span>{{ playerSpecificData.data[0].ast }} assists</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span>{{ playerSpecificData.data[0].pts }} points</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span>{{ playerSpecificData.data[0].ftm }} free throws</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span>{{ playerSpecificData.data[0].fga }} field goals</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div v-else>-->
    <!--      No data available, consider changing seasons range. Default season range-->
    <!--      is 2000-2021-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerSpecificData",
  props: ["playerSpecificData"],
});
</script>
