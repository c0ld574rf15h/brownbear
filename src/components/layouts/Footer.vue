<template>
  <v-footer absolute color="orange lighten-3" id="page-footer">
    <v-spacer></v-spacer>
    <div class="font-weight-light">
      &copy; {{ new Date().getFullYear() }}
      <span>Powered by
        <span class="font-weight-medium black--text">
          <a href="https://www.linkedin.com/in/jiwon-park-5b119a19a/" target="_blank" id="cybercat"> cyb3rc4t</a>
        </span>
      </span>
    </div>

  </v-footer>
</template>

<script>
export default {
  name: 'site-footer'
}
</script>

<style>

v-footer {
  max-width: 1000px;
}

#page-footer {
  margin-top: 5vh;
}

#cybercat {
  text-decoration: none;
  color: inherit;
}

</style>