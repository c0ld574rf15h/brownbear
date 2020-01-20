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
        <router-link :to="{ name: 'upload' }" class="link" v-if="isAdmin">
          <v-btn text class="mt-2 mr-2">
            <v-icon color="orange">mdi-plus</v-icon>
            Upload Challenges
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'leaderboard' }" class="link">
          <v-btn dark depressed color="indigo lighten-2" class="mt-2">
            <v-icon left small>mdi-poll</v-icon>
            Leaderboard
          </v-btn>
        </router-link>
      </v-row>
      <p>Debugging’s actually all about finding the bug, about understanding why the bug was there to begin with, about knowing that its existence was no accident. It came to you to deliver a message, like an unconscious bubble floating to the surface, popping with a revelation you’ve secretly known all along.</p>
    </div>
    <InHouse v-if="inhouse" />
    <Archive v-else />
  </div>
</template>

<script>
import InHouse from '@/components/challenge/InHouse'
import Archive from '@/components/challenge/Archive'
import firebase from 'firebase'

export default {
  name: 'challenge',
  components: { InHouse, Archive },
  data() {
    return {
      inhouse: true,
      isAdmin: false
    }
  },
  created() {
    let isAdmin = firebase.functions().httpsCallable('isAdmin')
    isAdmin({ uid: firebase.auth().currentUser.uid }).then(ret => {
      if(ret.data.res) {
        this.isAdmin = true
      } else {
        this.isAdmin = false
      }
    })
  }
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}
</style>