<template>
  <div class="newsfeed section" v-if="notifications.length">
    <div class="mt-4 mb-2">
        <v-icon class="mb-2 mr-1">mdi-feather</v-icon>
        <span class="headline font-weight-light">NewsFeed</span>
    </div>
    <ul class="notifications">
      <li v-for="notification in notifications" :key="notification.title" class="notification">
        <v-card tile flat outlined class="mt-1 pa-5 font-weight-light">
          <v-list-item-title>
            <v-icon small :color="colors[notification.type]">
              {{ icons[notification.type] }}
            </v-icon>
            {{ notification.title }}
          </v-list-item-title>
          <v-divider class="mt-2"></v-divider>
          <p class="grey--text text--darken-1 mt-3 newsfeed-content">
            {{ notification.description.slice(0, Math.max(250, notification.description.length)) }}
            {{ notification.description.length > 250 ? '...' : '' }}
          </p>
          <v-card-actions>
            <v-chip class="mr-1" color="indigo lighten-2" outlined v-for="tag in notification.tags" :key="tag">
              # {{ tag }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn icon color="indigo lighten-1" @click="openModal(notification)">
              <v-icon>mdi-cube-scan</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="800">
              <v-card>
                <v-card-title>{{ not_title }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="mt-3">{{ not_desc }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text class="mr-5 mb-5" color="indigo" @click="dialog=false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </li>
    </ul>
  </div>
  <div v-else class="mt-5">
    <Progress />
  </div>
</template>

<script>
import db from '@/firebase/init'
import Progress from '@/components/layouts/Progress'

export default {
  name: 'newsfeed',
  components: { Progress },
  data() {
    return {
      dialog: false,
      not_title: null,
      not_desc: null,
      colors: {
        'general': 'grey lighten-1',
        'challenge': 'red lighten-1',
        'event': 'yellow lighten-1'
      },
      icons: {
        'general': 'mdi-settings',
        'challenge': 'mdi-flag',
        'event': 'mdi-star'
      },
      notifications: []
    }
  },
  methods: {
    openModal(not) {
      console.log(not)
      this.not_title = not.title
      this.not_desc = not.description
      this.dialog = true
    }
  },
  created() {
    db.collection('notifications')
      .orderBy('timestamp', 'desc')
      .limit(3)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.data())
          this.notifications.push(doc.data())
        })
      })

  }
}
</script>

<style>

p.newsfeed-content {
  line-height: 130%;
}

ul.notifications {
  list-style: none;
  padding-left: 0;
}

li.notification .v-card:hover {
  background-color: rgb(255, 250, 241);
  cursor: pointer;
}

div.v-card__actions {
  padding: 0;
}

</style>