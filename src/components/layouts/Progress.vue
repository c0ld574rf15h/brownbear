<template>
  <div class="progress-circular" align="center">
    <v-progress-circular
      indeterminate
      color="orange lighten-3"
    ></v-progress-circular>
    <div class="grey--text text--lighten-1 mt-4">Loading Content ...</div>
  </div>
</template>

<script>
export default {
  name: 'progress'
}
</script>

<style>

.progress-circular {
  margin: 10% auto;
}

</style>