<template>
  <div>
    <h2>Basic player data:</h2>
    <div>
      <span> Name: {{ playerBasicData?.first_name }}</span>
    </div>
    <div>
      <span> Last name: {{ playerBasicData?.last_name }}</span>
    </div>
    <div>
      <span> Team: {{ playerBasicData?.team.full_name }}</span>
    </div>
    <div>
      <span v-if="playerBasicData?.position">
        Position: {{ playerBasicData?.position }}</span
      >
      <span v-else> Position: Not available</span>
    </div>
    <div>
      <span v-if="playerBasicData?.height_feet !== null">
        Height: {{ playerBasicData?.height_feet }}'{{
          playerBasicData?.height_inches
        }}''</span
      >
      <span v-else> Height: Not available</span>
    </div>
    <div>
      <span v-if="playerBasicData?.weight_pounds !== null">
        Weight: {{ playerBasicData?.weight_pounds }} pounds
      </span>
      <span v-else> Weight: Not available</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerBasicData",
  props: ["playerBasicData"],
});
</script>
