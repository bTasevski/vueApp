<template>
  <div class="basicDataContainer">
    <h2 class="basicDataContainer__headingH2">Basic information:</h2>
    <div class="basicDataContainer__playerDataContainer">
      <div class="basicDataContainer__detail">
        <span>
          Name:
          <span class="bold">{{ playerBasicData?.first_name }}</span></span
        >
      </div>

      <div class="basicDataContainer__detail">
        <span>
          Last name:
          <span class="bold">{{ playerBasicData?.last_name }}</span></span
        >
      </div>

      <div class="basicDataContainer__detail">
        <span
          >Team:
          <span class="bold">{{ playerBasicData?.team.full_name }}</span></span
        >
      </div>

      <div class="basicDataContainer__detail" v-if="playerBasicData?.position">
        <span>
          Position:
          <span class="bold">{{ playerBasicData?.position }}</span></span
        >
      </div>
      <div class="basicDataContainer__detail" v-else>
        <span> Position: <span class="bold">Not available</span></span>
      </div>

      <div
        class="basicDataContainer__detail"
        v-if="playerBasicData?.height_feet"
      >
        <span>
          Height:
          <span class="bold"
            >{{ playerBasicData?.height_feet }}'{{
              playerBasicData?.height_inches
            }}''</span
          ></span
        >
      </div>
      <div class="basicDataContainer__detail" v-else>
        <span> Height: <span class="bold">Not available</span></span>
      </div>

      <div
        class="basicDataContainer__detail"
        v-if="playerBasicData?.weight_pounds"
      >
        <span>
          Weight:
          <span class="bold">{{ playerBasicData?.weight_pounds }}lb</span></span
        >
      </div>
      <div class="basicDataContainer__detail" v-else>
        <span> Weight: <span class="bold">Not available</span></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@/assets/PlayerBasicData.scss";

export default defineComponent({
  name: "PlayerBasicData",
  props: ["playerBasicData"],
});
</script>
