<template>
  <div class="signup-page">
    <v-card outlined>
      <v-card-title class="font-weight-light">
        Sign Up
        <v-spacer></v-spacer>
        <v-tooltip left color="grey lighten-3">
          <template v-slot:activator="{ on }">
            <v-icon small v-on="on">mdi-information-outline</v-icon>
          </template>
          <span class="black--text signup-helptext">Your authentication information is handled securely with firebase authentication</span>
        </v-tooltip>
      </v-card-title>
      <v-form @submit.prevent="signUp" id="signup-form">
        <v-text-field
          required outlined v-model="email"
          class="mx-3 mb-2" label="Email" hint="Example: hello@hello.com"
          persistent-hint color="brown" :rules="emailRules"></v-text-field>
        <v-text-field
          required outlined counter="12" v-model="handle"
          class="mx-3 mb-2" label="Handle" hint="Example: BrownBear"
          persistent-hint color="brown" :rules="handleRules"></v-text-field>
        <v-text-field
          required outlined counter v-model="password"
          class="mx-3 mb-2" label="Password" type="password" hint="more than 5 chars"
          persistent-hint color="brown"></v-text-field>
        <v-card-actions>
          <p class="red--text ml-3" v-if="feedback">
            <v-icon color="red">mdi-alert-outline</v-icon>
            {{ feedback }}
          </p>
          <p v-else class="ml-3 mt-2">
            <v-icon small color="orange">mdi-plus</v-icon>
            Join our Slack channel as well
          </p>
          <v-spacer></v-spacer>
          <v-btn
          type="submit" dark text outlined class="ma-3 font-weight-light indigo lighten-3"
          @click="signUp">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import slugify from 'slugify'

export default {
  name: 'signup',
  data() {
    return {
      feedback: '',
      email: '',
      handle: '',
      password: '',
      slug: '',
      handleRules: [
        v => !!v || 'Please enter your handle',
        v => (v && v.length <= 12) || 'Your handle cannot exceed 12 characters'
      ],
      emailRules: [
        v => !!v || 'Please enter your email address',
        v => /.+@.+\..+/.test(v) || 'Not a valid form',
      ],
    }
  },
  methods: {
    signUp() {
      if(this.email && this.handle && this.password) {
        this.slug = slugify(this.handle, {
          replacement: '-',
          remove: /[!@#$%^&*()_+'"]/g,
          lower: true
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if(doc.exists) {
            this.feedback = 'Sorry, this handle has been already taken'
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(creds => {
                ref.set({
                  handle: this.handle,
                  user_id: creds.user.uid,
                })
              }).then(() => this.$router.push({ name: 'dashboard' }))
                .catch(err => { this.feedback = err.message })
            this.feedback = ''
          }
        })
      } else {
        this.feedback = 'Please enter all fields'
      }
    }
  }
}
</script>

<style>

div.signup-page {
  margin: 10vh auto !important;
  width: 50%;
}

.signup-page #signup-form {
  font-weight: 300;
}

.signup-helptext {
  font-size: 0.9em;
}

</style>
