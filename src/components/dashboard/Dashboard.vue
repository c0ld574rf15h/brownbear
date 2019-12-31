<template>
  <div class="dashboard">
    <Newsfeed />
  </div>
</template>

<script>
import Newsfeed from '@/components/dashboard/NewsFeed'

export default {
  name: 'dashboard',
  components: { Newsfeed },
  data() {
    return {}
  }
}
</script>

<style>

</style>