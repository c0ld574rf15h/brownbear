<template>
  <v-app>
    <Appbar />
    <router-view id="page-content" />
    <Footer />
  </v-app>
</template>

<script>
import Appbar from '@/components/layouts/Appbar'
import Footer from '@/components/layouts/Footer'
//import Progress from '@/components/layouts/Progress'

export default {
  name: 'app',
  components: { Appbar, Footer }
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
