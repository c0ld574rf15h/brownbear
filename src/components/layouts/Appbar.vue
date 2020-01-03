<template>
  <div class="app-bar">
    <v-app-bar color="grey darken-3" dark dense flat>
      <router-link :to="{ name: 'dashboard' }" class="link">
        <v-toolbar-title id="appbar-title" class="white--text">
          <span class="orange--text text--darken-2">Brown</span> Bear
          <span class="font-weight-light"> β</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'signin' }" class="link" v-if="!user">
        <v-btn small text dark>
          <v-icon left>mdi-key</v-icon>
          <span class="font-weight-light">Login</span>
        </v-btn>
      </router-link>
      <router-link :to="{ name: 'signup' }" class="link" v-if="!user">
        <v-btn small text dark class="ml-2">
          <v-icon left>mdi-account-plus</v-icon>
          <span class="font-weight-light">Signup</span>
        </v-btn>
      </router-link>
      <router-link :to="{ name: 'challenge' }" class="link" v-if="user">
        <v-btn small text dark>
          <v-icon left>mdi-sword</v-icon>
          <span class="font-weight-light">Challenges</span>
        </v-btn>
      </router-link>
      <v-btn small text dark class="ml-2" @click="logout" v-if="user">
        <v-icon left>mdi-airplane-takeoff</v-icon>
        <span class="font-weight-light">Logout</span>
      </v-btn>
      <v-btn small text dark class="ml-2" v-if="user">
        <v-icon left>mdi-account-circle</v-icon>
        <span class="font-weight-light">{{ profile }}</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'Appbar',
  data() {
    return {
      user: null,
      profile: null
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'signin' })
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user
        db.collection('users').where("user_id", "==", user.uid).get()
          .then((user) => {
            this.profile = user.docs[0].data().handle
          })
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style>

div.v-toolbar__content {
  max-width: 1000px;
  padding: 12px;
  margin: 0 auto;
}

#appbar-title {
  font-size: 1.4em;
  font-weight: 600;
}

.link {
  text-decoration: none;
  color: inherit;
}

</style>