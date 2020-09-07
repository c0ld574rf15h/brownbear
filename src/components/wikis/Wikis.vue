<template>
  <div class="wikis">
    <div class="mt-4 mb-2">
      <!-- <v-icon color="pink darken-1" class="mb-2 mr-1">mdi-fountain-pen-tip</v-icon>
      <span class="headline font-weight-light" align="center">Wikis</span>
      <v-divider class="my-4"></v-divider> -->
      <div>
        <v-icon left large color="blue lighten-1">mdi-rocket</v-icon>
        <span class="font-weight-light">Still working on it :)</span>
        <Progress />
        <div align="center">Comming Soon</div>
      </div>
    </div>
    <v-row>
      <!--v-col columns="12" md="4" v-for="wiki in wikis" :key="wiki.id">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="wiki.thumbnail"
            gradient="to bottom left, rgba(200,220,255,.1), rgba(10,20,40,.6)"
          >
            <v-card-title>{{ wiki.title }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">
            {{ wiki.subtitle }}
            <div class="black--text mt-1">Author : {{ wiki.author }}</div>
          </v-card-subtitle>
        
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange" class="mr-5 mb-2" text>Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col-->
    </v-row>
  </div>
</template>

<script>
import Progress from '@/components/layouts/Progress'

export default {
  name: 'wikis',
  components: { Progress },
  data() {
    return {
      wikis: [
        { id: 1, title: 'System Programming', subtitle: 'The best system programming lecture ever', summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ab mollitia inventore et odit dolorum repellat tempore ex quibusdam sit, magnam', author: 'cybercat', thumbnail: "https://firebasestorage.googleapis.com/v0/b/brownbear-db9f1.appspot.com/o/wiki_thumbnail%2Fjoel-filipe-jU9VAZDGMzs-unsplash.jpg?alt=media&token=dc809dac-1921-4ebf-8fe7-8b802f988b55"},
        { id: 2, title: 'Pwn Basics', subtitle: 'The best system programming lecture ever', summary: 'Lorem ipsum dolor sit amet consectetur mollitia inventore et odit dolorum repellat tempore ex quibusdam sit, magnam', author: 'cybercat', thumbnail: "https://firebasestorage.googleapis.com/v0/b/brownbear-db9f1.appspot.com/o/wiki_thumbnail%2Fsergio-souza-j_MgyPHGRP0-unsplash.jpg?alt=media&token=8f6eb0eb-f0b0-45a8-b27d-a4720b6cf53e"},
        { id: 3, title: 'SQL Injection', subtitle: 'The best system programming lecture ever', summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. am adipisicing elit. Nobis ab mollitia inventore et odit dolorum repellat tempore ex quibusdam sit', author: 'cybercat', thumbnail: "https://firebasestorage.googleapis.com/v0/b/brownbear-db9f1.appspot.com/o/wiki_thumbnail%2Fibrahim-boran-zsKFQs2kDpM-unsplash.jpg?alt=media&token=a1d7c1a0-e80a-4ea3-a887-790347ee7829"},
        { id: 4, title: 'Raspberry Pie', subtitle: 'The best system programming lecture ever', summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ab mollitia inventore et odit dolorum repellat tempore ex quibusdam sit, magnam', author: 'cybercat', thumbnail: "https://firebasestorage.googleapis.com/v0/b/brownbear-db9f1.appspot.com/o/wiki_thumbnail%2Fmagnus-engo-mbXEkW5ZyBQ-unsplash.jpg?alt=media&token=4953ba3c-ea64-4c6a-9e01-42efddb686b2"},
      ]
    }
  }
}
</script>

<style>
.wikis {
  margin-bottom: 10vh !important;
}
</style>