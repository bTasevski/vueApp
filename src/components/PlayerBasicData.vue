<template>
  <div class="basicDataContainer">
    <h2 class="basicDataContainer__headingH2">Basic information:</h2>
    <div class="basicDataContainer__playerDataContainer">
      <div class="basicDataContainer__detail">
        <span> Name: {{ playerBasicData?.first_name }}</span>
      </div>

      <div class="basicDataContainer__detail">
        <span> Last name: {{ playerBasicData?.last_name }}</span>
      </div>

      <div class="basicDataContainer__detail">
        <span>Team: {{ playerBasicData?.team.full_name }}</span>
      </div>

      <div class="basicDataContainer__detail" v-if="playerBasicData?.position">
        <span> Position: {{ playerBasicData?.position }}</span>
      </div>
      <div class="basicDataContainer__detail" v-else>
        <span> Position:Not available</span>
      </div>

      <div
        class="basicDataContainer__detail"
        v-if="playerBasicData?.height_feet"
      >
        <span>
          Height: {{ playerBasicData?.height_feet }}'{{
            playerBasicData?.height_inches
          }}''</span
        >
      </div>
      <div class="basicDataContainer__detail" v-else>
        <span> Height: Not available</span>
      </div>

      <div
        class="basicDataContainer__detail"
        v-if="playerBasicData?.weight_pounds"
      >
        <span> Weight: {{ playerBasicData?.weight_pounds }}lb</span>
      </div>
      <div class="basicDataContainer__detail" v-else>
        <span> Weight: Not available</span>
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
