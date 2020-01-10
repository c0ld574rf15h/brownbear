<template>
  <div class="solved-challs mt-5" v-if="solved">
    <v-list>
      <v-subheader class="black--text font-weight-light">
        Solved Challs
        <v-icon small color="red" class="ml-1">mdi-flag</v-icon>
      </v-subheader>
      <v-divider></v-divider>
      <v-list-item v-for="chall in solved" :key="chall.title">
        <v-list-item-content>
          <v-list-item-title>
            <span>{{ chall.title }}</span>
            <v-chip :color="colors[chall.category]" dark small class="ml-2">{{ chall.category }}</v-chip>
            <div class="grey--text mt-2">{{ chall.description }}</div>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-1">
            <span>
              <v-icon small color="yellow darken-1" class="mr-1">mdi-diamond</v-icon>
              <span class="font-weight-bold black--text">{{ chall.points }}</span> Points
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
  <div v-else>
    <Progress />
  </div>
</template>

<script>
import db from '@/firebase/init'
import Progress from '@/components/layouts/Progress'

export default {
  name: 'solvedChalls',
  components: { Progress },
  props: [ 'user_id' ],
  data() {
    return {
      colors: {
        'pwn': 'red lighten-2',
        'web': 'purple lighten-2',
        'forensics': 'indigo ligten-2',
        'crypto': 'pink lighten-2',
        'misc': 'green lighten-2',
      },
      solved: []
    }
  },
  created() {
    db.collection('solved').where('user', '==', this.$props.user_id).get()
      .then(snapShot => {
        snapShot.forEach(doc => {
          db.collection('challenges').doc(doc.data().chall).get()
            .then(doc => {
              if(doc.exists) {
                this.solved.push(doc.data())
              }
            })
        })
      })
  }
}
</script>

<style>

</style>