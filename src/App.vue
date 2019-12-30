<template>
  <v-app>
    <Appbar />
    <router-view id="page-content" />
  </v-app>
</template>

<script>
import Appbar from '@/components/layouts/Appbar'

export default {
  name: 'app',
  components: { Appbar }
}
</script>

<style>

#app {
  background-color: #f5f5f5;
}

#app #page-content {
  max-width: 1000px;
  padding: 12px;
  margin: 0 auto;
}

</style>
