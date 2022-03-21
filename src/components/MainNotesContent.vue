<template>
  <div class="container">
    <notes-container></notes-container>
  </div>
</template>

<script>
import NotesContainer from "./NotesContainer.vue";

export default {
  name: "MainNotesContent",
  components: {
    NotesContainer,
  },
};
</script>

<style lang="css" scoped>
.container {
  min-height: 80vh;
}
</style>
