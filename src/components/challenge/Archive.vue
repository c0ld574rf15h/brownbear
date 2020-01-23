<template>
  <div class="archive-challenges">
    <v-expansion-panels v-if="challenges.length">
      <v-expansion-panel v-for="(challenge, idx) in challenges" :key="idx">
        <v-expansion-panel-header>
          <div>
            <span class="font-weight-medium">{{ challenge.title }}</span>
            <v-chip dark small class="ml-3 mr-2" :color="colors[challenge.category]">{{ challenge.category }}</v-chip>
            <v-chip dark small v-if="challenge.solved" color="green">
              <v-icon small left>mdi-check</v-icon>
              solved
            </v-chip>
            <div class="points-solvers mt-2">
              <span class="mr-3">
                <v-icon color="yellow darken-2" small>mdi-diamond-stone</v-icon>
                {{ challenge.points}} points
              </span>
              <span>
                <v-icon color="green" small>mdi-check</v-icon>
                {{ challenge.solvers }} solvers
              </span>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider class="mb-3"></v-divider>
          <div class="">{{ challenge.description }}</div>
          <div v-if="challenge.server_link" class="grey--text mt-2">
            <v-icon small>mdi-send</v-icon>
            Connection to Server: {{ challenge.server_link }}
          </div>
          <div v-if="challenge.from" class="grey--text mt-2">
            <v-icon small>mdi-swap-vertical-bold</v-icon>
            From <span class="grey--text text--darken-3">{{ challenge.from }}</span>
          </div>
          <div class="mt-5">
            <v-form @submit.prevent="submit_flag(challenge)" v-if="!challenge.solved">
              <v-text-field 
                label="Gimme your flag" placeholder="{FLAG: ...}" outlined
                prepend-icon="mdi-skull" color="indigo lighten-2" v-model="input_flag"
                :loading="loading">
              </v-text-field>
              <v-alert dense outlined dismissible type="error" v-model="alert">
                <span>Hmm... nope. That's not it</span>
              </v-alert>
            </v-form>
            <v-alert type="success" v-else>
              You have already solved this challenge
            </v-alert>
          </div>
          <v-row class="px-3">
            <span class="hints mt-1" v-if="challenge.references">
              <span>Hints:</span>
              <v-btn 
                small outlined icon 
                v-for="(reference, i) in challenge.references" :key="i"
                class="mx-1" color="orange lighten-1">
                <a :href="reference" class="hint-link" target="_blank">
                  <v-icon small>mdi-duck</v-icon>
                </a>
              </v-btn>
            </span>
            <v-spacer></v-spacer>
            <a :href="challenge.binary_link" class="link">
              <v-btn text outlined color="indigo lighten-2" v-if="challenge.binary_link">
                <v-icon left>mdi-rabbit</v-icon>
                Download Binary
              </v-btn>
            </a>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <Progress v-else />
    <v-snackbar v-model="snackbar">
      Congradulations
      <v-btn color="green" text @click="snackbar=false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import db from '@/firebase/init'
import Progress from '@/components/layouts/Progress'
import firebase from 'firebase'

export default {
  name: 'archive-challenge',
  components: { Progress },
  data() {
    return {
      colors: {
        'pwn': 'red lighten-2',
        'web': 'purple lighten-2',
        'forensics': 'indigo ligten-2',
        'crypto': 'pink lighten-2',
        'misc': 'green lighten-2',
      },
      challenges: [],
      solved_challs: [],
      input_flag: '',
      snackbar: false,
      alert: false,
      loading: false,
      profile: null
    }
  },
  methods: {
    submit_flag(chall) {
      this.loading = "primary"
      this.alert = false

      const functions = firebase.app().functions('asia-northeast1')
      let checkFlag = functions.httpsCallable('checkFlag')
      checkFlag({ flag: this.input_flag, chall_id: chall.id })
        .then(res => {
          if(res.data.correct) {
            let newSolve = functions.httpsCallable('newSolve')
            newSolve({ chall_id: chall.id, chall_point: chall.points, user_handle: this.profile })
              .then(() => {
                let addSolver = functions.httpsCallable('addSolver')
                const user = firebase.auth().currentUser
                addSolver({ user_id: user.uid, chall_id: chall.id, doc_id: user.uid+':'+chall.id })
                  .then(res => {
                    if(!res.malicious) {
                      this.loading = false
                      this.input_flag = ""
                      this.snackbar = true
                      chall.solved = true
                      chall.solvers += 1
                    } else {
                      this.loading = false
                      this.input_flag = "Don't try something woopy"
                    }
                  })
              })
          } else {
            this.loading = false
            this.alert = true
          }
        })
    }
  },
  created() {
    db.collection('solved').where("user", "==", firebase.auth().currentUser.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.solved_challs.push(doc.data().chall)
        })
      })
      .then(() => {
        db.collection('users').where("user_id", "==", firebase.auth().currentUser.uid).get()
          .then(snapshot => {
            this.profile = snapshot.docs[0].data().handle
          })
      })
      .then(() => {
        db.collection("challenges").orderBy("points").get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if(doc.data().inhouse == false) {
                let chall = doc.data()
                chall.id = doc.id
                if(this.solved_challs.includes(chall.id)) {
                  chall.solved = true
                } else {
                  chall.solved = false
                }
                this.challenges.push(chall)
                console.log(this.challenges)
              }
            })
          })
      })
  }
}
</script>

<style scoped>

.archive-challenges {
  margin-bottom: 10vh !important;
}

.hint-link {
  text-decoration: none;
  color: inherit;
}

</style>