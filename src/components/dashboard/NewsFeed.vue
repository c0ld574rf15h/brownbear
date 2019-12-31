<template>
  <div class="newsfeed section">
    <h2 class="font-weight-light mt-4">
      <v-icon small>mdi-feather</v-icon>
      NewsFeed
    </h2>
    <ul class="notification-list">
      <li>
        <v-card tile flat outlined class="mt-5 pa-5 font-weight-light">
          <v-list-item-title>
            <v-icon small color="grey lighten-1">mdi-settings</v-icon>
            Version 1.2 Update Notice
          </v-list-item-title>
          <v-divider class="mt-2"></v-divider>
          <p class="grey--text text--darken-1 mt-3 newsfeed-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, amet velit consequatur aspernatur magni mollitia in veritatis sapiente. Ad similique labore reiciendis voluptatibus totam deleniti tempora eum in, inventore modi?</p>
        </v-card>
      </li>
      <li>
        <v-card tile flat outlined class="mt-1 pa-5 font-weight-light">
          <v-list-item-title>
            <v-icon small color="yellow darken-1">mdi-bell</v-icon>
            I am a Brown Bear
          </v-list-item-title>
          <v-divider class="mt-2"></v-divider>
          <p class="grey--text text--darken-1 mt-3 newsfeed-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, amet velit consequatur aspernatur magni mollitia in veritatis sapiente. Ad similique labore reiciendis voluptatibus totam deleniti tempora eum in, inventore modi?</p>
        </v-card>
      </li>
      <li>
        <v-card tile flat outlined class="mt-1 pa-5 font-weight-light">
          <v-list-item-title>
            <v-icon small color="yellow darken-1">mdi-bell</v-icon>
            First Notification
          </v-list-item-title>
          <v-divider class="mt-2"></v-divider>
          <p class="grey--text text--darken-1 mt-3 newsfeed-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas, amet velit consequatur aspernatur magni mollitia in veritatis sapiente. Ad similique labore reiciendis voluptatibus totam deleniti tempora eum in, inventore modi?</p>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'newsfeed',
  data() {
    return {}
  }
}
</script>

<style>

p.newsfeed-content {
  line-height: 130%;
}

ul.notification-list {
  list-style: none;
  padding-left: 0;
}

</style>