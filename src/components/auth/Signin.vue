<template>
  <div class="signin-page">
    <v-card outlined>
      <v-card-title class="font-weight-light">Log In</v-card-title>
      <v-form @submit.prevent="signin" id="signin-form">
        <v-text-field
          required outlined v-model="email"
          class="mx-3 mb-2" label="Email"
          color="brown" :rules="emailRules"></v-text-field>
        <v-text-field
          required outlined v-model="password"
          class="mx-3 mb-2" label="Password" type="password"
          color="brown"></v-text-field>
        <v-card-actions>
          <p class="red--text ml-3" v-if="feedback">
            <v-icon color="red">mdi-alert-outline</v-icon>
            {{ feedback }}
          </p>
          <p v-else class="ml-3 mt-2">
            Don't have an account?
            <router-link :to="{ name: 'signup' }">
              <span class="indigo--text ml-1"> Sign Up</span>
            </router-link>
          </p>
          <v-spacer></v-spacer>
          <v-btn
          type="submit" dark text outlined class="ma-3 font-weight-light indigo lighten-3"
          @click="signUp">Login</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signin',
  data() {
    return {
      feedback: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signin() {
      if(this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => { this.$router.push({ name: 'dashboard' }) })
          .catch(err => { this.feedback = err.message })
        this.feedback = ''
      } else {
        this.feedback = 'Please enter all fields'
      }
    }
  }
}
</script>

<style>

div.signin-page {
  margin: 10vh auto !important;
  width: 50%;
}

.signin-page #signin-form {
  font-weight: 300;
}

</style>