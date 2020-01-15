<template>
  <div class="view-profile" v-if="user">
    <h4 class="headline mt-5 font-weight-light">{{ user.handle }}</h4>
    <v-row v-if="user.bio" class="mx-0">
      <span class="bio white--text py-1 px-3 mt-2">{{ user.bio.slice(0, 50) }}</span>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" v-if="isOwner" width="800">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="orange">mdi-pencil-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Edit Bio</v-card-title>
          <v-form @submit.prevent="editBio">
            <v-text-field class="px-5 mx-2 font-weight-light" 
                          label="Bio" color="orange darken-2" :value="user.bio">
            </v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mb-4 mr-5" text @click="dialog = false">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row v-else class="white--text mx-0">
      <span class="bio py-1 px-3 mt-2">You haven't set a bio yet</span>
      <v-spacer></v-spacer>
      <v-btn icon v-if="isOwner">
        <v-icon color="orange">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-row class="mx-0">
      <span>Ladder: 
        <span>
          <v-icon :color="colors[user.ladder]">{{ icons[user.ladder] }}</v-icon>
          <span class="font-weight-light">{{ user.ladder }}</span>
        </span>
      </span>
      <v-spacer></v-spacer>
      <span>Earned {{ user.points }} Points</span>
    </v-row>
    <v-row class="grey--text mx-0" v-if="user.group">
      <span>Member of Group {{ user.group }}</span>
      <v-btn small icon v-if="isOwner">
        <v-icon small color="orange">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="grey--text mx-0" v-else>
      <span>Doesn't Belong to any Group</span>
      <v-btn small icon v-if="isOwner">
        <v-icon small color="orange">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-row>
    <span class="green--text text--darken-2" v-if="user.isAdmin">
      <v-icon color="green darken--2">mdi-check</v-icon>
      Approved Admin User
    </span>
    <SolvedChalls :user_id="user.user_id" />
  </div>
  <div v-else>
    <Progress class="mt-5" />
  </div>   
</template>

<script>
import Progress from '@/components/layouts/Progress'
import db from '@/firebase/init'
import SolvedChalls from '@/components/layouts/SolvedChalls'

export default {
  name: 'viewProfile',
  components: { Progress, SolvedChalls },
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
      user: null,
      isOwner: true,
      dialog: false
    }
  },
  created() {
    db.collection('users').where('handle', '==', this.$route.params.id).get()
      .then(snapShot => {
        this.user = snapShot.docs[0].data()
      })
  },
  methods: {
    editBio() {
      // Edit Bio From Frontend
    }
  }
}
</script>

<style>
.view-profile .bio {
  background-color: rgb(183, 212, 255);
  border-radius: 6px;
}
</style>