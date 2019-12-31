<template>
  <div class="newsfeed section" v-if="notifications.length">
    <div class="mt-4 mb-2">
      <v-icon small>mdi-feather</v-icon>
      <span class="headline font-weight-light">NewsFeed</span>
      <v-btn small icon color="green" class="ml-2 mb-2">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
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
            {{ notification.description.slice(0,Math.max(250, notification.description.length)) }}
            {{ notification.description.length > 250 ? '...' : '' }}
          </p>
          <v-card-actions>
            <v-chip class="mr-1" color="indigo lighten-2" outlined v-for="tag in notification.tags" :key="tag">
              # {{ tag }}
            </v-chip>
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