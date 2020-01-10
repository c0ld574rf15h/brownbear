<template>
  <div class="leaderboard">
    <div class="mt-4 mb-2">
      <v-icon color="orange lighten-2" class="mb-2 mr-1">mdi-poll</v-icon>
      <span class="headline font-weight-light">LeaderBoard</span>
      <v-divider class="my-4"></v-divider>
      <p class="font-weight-light">You should never view your challenges as a disadvantage. Instead, it's important for you to understand that your experience facing and overcoming adversity is actually one of your biggest advantages.</p>
    </div>
    <v-list class="py-0">
      <v-list-item-group color="grey darken-4">
        <v-list-item v-for="item in items" :key="item.user_id" inactive class="board-items">
          <v-list-item-content class="py-3">
            <v-list-item-title class="font-weight-medium black--text">
              <router-link :to="{ name: 'viewProfile', params: {id: item.handle} }" class="link black--text">
                <v-row class="mx-0">
                  <v-icon small left :color="colors[item.ladder]">{{ icons[item.ladder] }}</v-icon>
                  <span class="mt-1">{{ item.handle }}</span>
                  <v-spacer></v-spacer>
                  <span class="font-weight-light mt-1">{{ item.points }} points</span>
                </v-row>
              </router-link>
            </v-list-item-title>
            <v-list-item-subtitle class="grey--text text--lighten-1 mt-1">
              <v-row class="mx-0">
                <span v-if="item.group">Member of group {{ item.group }}</span>
                <span v-else>Doesn't belong to a group</span>
                <v-spacer></v-spacer>
                <span v-if="item.bio" class="font-weight-light mt-1">{{ item.bio }}</span>
                <span v-else class="font-weight-light mt-1">Another Random Brown Bear</span>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'leaderboard',
  data() {
    return {
      colors: {
        'mint': 'green lighten-1',
        'croissant': 'orange lighten-1',
        'cherry': 'red lighten-1'
      },
      icons: {
        'mint': 'mdi-barley',
        'croissant': 'mdi-food-croissant',
        'cherry': 'mdi-fruit-cherries'
      },
      items: []
    }
  },
  created() {
    db.collection('users').orderBy('points', 'desc').get()
      .then(snapShot => {
        snapShot.forEach(doc => {
          this.items.push(doc.data())
        })
      })
  }
}
</script>

<style>
.leaderboard {
  margin-bottom: 10vh !important;
}

div.board-items:hover {
  background-color: rgb(236, 236, 255)
}

div.board-items {
  border-left: rgb(236, 236, 255) 6px solid;
}

div.board-items:nth-child(1) {
  border-left: rgb(255, 166, 0) 6px solid;
}

div.board-items:nth-child(2) {
  border-left: rgb(255, 197, 89) 6px solid;
}

div.board-items:nth-child(3) {
  border-left: rgb(255, 224, 167) 6px solid;
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>