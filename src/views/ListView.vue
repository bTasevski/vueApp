<template>
  <div class="PlayersList">
    <PlayersList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayersList from "../components/PlayersList.vue";

export default defineComponent({
  name: "ListView",
  components: { PlayersList },
});
</script>
