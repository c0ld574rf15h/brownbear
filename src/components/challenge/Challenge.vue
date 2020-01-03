<template>
  <div class="challenge-board">
    <div class="mt-4 mb-2">
      <v-icon color="red" class="mb-2 mr-1">mdi-flag</v-icon>
      <span class="headline font-weight-light">Challenges</span>
      <v-switch 
        v-model="inhouse" :label="`${ inhouse ? 'In-House' : 'Archive' }`"
        color="indigo lighten-2">
      </v-switch>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos dolore saepe quidem illo soluta, reiciendis reprehenderit, optio rem magni iure ad! Rem tempora dignissimos rerum sint ullam doloremque maiores deleniti?</p>
    </div>
    <InHouse v-if="inhouse" />
  </div>
</template>

<script>
import InHouse from '@/components/challenge/InHouse'

export default {
  name: 'challenge',
  components: { InHouse },
  data() {
    return {
      inhouse: true
    }
  }
}
</script>

<style>

</style>