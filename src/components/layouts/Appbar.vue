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
      <router-link :to="{ name: 'signin' }" class="link">
        <v-btn small text dark>
          <v-icon left>mdi-key</v-icon>
          <span class="font-weight-light">Login</span>
        </v-btn>
      </router-link>
      <router-link :to="{ name: 'signup' }" class="link">
        <v-btn small text dark class="ml-2">
          <v-icon left>mdi-account-plus</v-icon>
          <span class="font-weight-light">Signup</span>
        </v-btn>
      </router-link>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Appbar',
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