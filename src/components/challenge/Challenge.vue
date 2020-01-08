<template>
  <div class="challenge-board">
    <div class="mt-4 mb-2">
      <v-icon color="red" class="mb-2 mr-1">mdi-flag</v-icon>
      <span class="headline font-weight-light">Challenges</span>
      <v-row class="mx-0">
        <v-switch 
          v-model="inhouse" :label="`${ inhouse ? 'In-House' : 'Archive' }`"
          color="indigo lighten-2">
        </v-switch>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'leaderboard' }">
          <v-btn dark depressed color="indigo lighten-2" class="mt-2">
            <v-icon left small>mdi-poll</v-icon>
            Leaderboard
          </v-btn>
        </router-link>
      </v-row>
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