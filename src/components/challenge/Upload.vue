<template>
  <div class="upload">
     <div class="mt-4 mb-2">
      <v-icon color="orange lighten-2" class="mb-2 mr-1">mdi-plus</v-icon>
      <span class="headline font-weight-light">Upload</span>
      <v-divider class="my-4"></v-divider>
      <p class="font-weight-light">This page is only open for users who have admin privileges. The upload scheme utilizes the papaWhaled library(API). Special Thanks to hhro</p>
    </div>
    <v-card fluid class="px-5 pb-5" id="upload-card" :loading="loading">
      <v-container>
        <v-row class='mx-5 mt-2 mb-0'>
          <v-switch v-model="switch_1" :label="`${ switch_1 ? 'Auto' : 'Custom Docker' }`" class="mx-5 mt-0">
          </v-switch>
          <v-switch v-model="contest_switch" :label="`${ contest_switch ? 'Contest' : 'General' }`" class="mx-5 mt-0">
          </v-switch>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="4">
            <v-row justify="center">
              <v-radio-group v-model="radioGroup_1">
                <span class="mb-3">Challenge Type</span>
                <v-radio v-for="n in 2" :key="n" :label="select_1[n-1]" :value="select_1[n-1]"></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row justify="center">
              <v-radio-group :disabled="!switch_1" v-model="radioGroup_2">
                <span class="mb-3">Architecture</span>
                <v-radio v-for="n in 2" :key="n" :label="select_2[n-1]" :value="select_2[n-1]"></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row justify="center">
              <v-radio-group :disabled="!switch_1" v-model="radioGroup_3">
                <span class="mb-3">Linux Version</span>
                <v-radio v-for="n in 2" :key="n" :label="select_3[n-1]" :value="select_3[n-1]"></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>
        <div class="mx-5">
          <v-text-field label="Name" dense outlined class="mx-5 font-weight-light" v-model="name"></v-text-field>
          <v-text-field label="Points" dense outlined class="mx-5 font-weight-light" v-model="points"></v-text-field>
          <v-text-field label="Category" dense outlined class="mx-5 font-weight-light" v-model="category"
          hint="Choose 1 among pwn, web, forensics, crypto, misc" persistent-hint></v-text-field>
          <v-textarea label="Description" height="100" no-resize outlined class="mx-5 font-weight-light" v-model="description"></v-textarea>
          <v-text-field label="Flag" dense outlined class="mx-5 font-weight-light" v-model="flag" @change="flagChange" :hint="`Hashed Flag : ${flagHash}`" persistent-hint></v-text-field>
          <div>
            <v-switch v-model="switch_2" :label="`${ switch_2 ? 'Auto Select Port' : 'Manually Select Port' }`" class="mx-5 mt-0"></v-switch>
            <v-text-field label="Port Number" dense outlined :disabled="switch_2" class="mx-5" v-model="port"></v-text-field>
            <v-file-input label="Challenge File (chall.zip)" outlined dense class="mx-5" id="chall-file"></v-file-input>
            <v-file-input label="Docker File" outlined dense class="mx-5" :disabled="switch_1" id="docker-file"></v-file-input>
            <v-text-field label="From" dense outlined class="mx-5 font-weight-light" v-model="from"></v-text-field>
          </div>
        </div>
        <v-row class="mr-5">
          <v-spacer></v-spacer>
          <v-btn color="indigo lighten-2" depressed dark class="mr-5" @click="uploadChallenge">Upload</v-btn>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar">
      Successfully Uploaded Challenge
      <v-btn color="green" text @click="snackbar=false">
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar v-model="error">
      Something got wrong
      <v-btn color="red" text @click="error=false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import sha256 from 'js-sha256'
import db from '@/firebase/init'

export default {
  name: 'upload',
  data() {
    return {
      radioGroup_1: 1,
      radioGroup_2: 2,
      radioGroup_3: 3,
      select_1: ['Archive', 'In House'],
      select_2: ['x86', 'x64'],
      select_3: ['16.04', '18.04'],
      switch_1: true,
      switch_2: true,
      contest_switch: false,
      flag: null,
      flagHash: null,
      name: null,
      points: null,
      category: null,
      description: null,
      port: null,
      server_link: "",
      binary_link: "",
      from: "",
      references: [],
      loading: false,
      snackbar: false,
      error: false
    }
  },
  methods: {
    uploadChallenge() {
      this.loading = true
      let form = new FormData()
      if(this.switch_1) {
        form.append('chal-type', 'auto')
      } else {
        form.append('chal-type', 'custom_dock')
      }
      form.append('arch', this.radioGroup_2)
      form.append('ver', this.radioGroup_3)
      form.append('name', this.name)
      form.append('flag', this.flag)
      if(this.switch_2) {
        form.append('port', 'auto')
      } else {
        form.append('port', this.port)
      }

      const challFile = document.getElementById("chall-file")
      form.append('file', challFile.files[0])

      if(!this.switch_1) {
        const dockerFile = document.getElementById("docker-file")
        form.append('dockerfile', dockerFile.files[0])
      }

      if(this.radioGroup_1 == 'In House') {
        const ref = db.collection('challenges').doc(this.name)
        ref.set({
          category: this.category,
          contest: this.contest_switch,
          description: this.description,
          flag: sha256(this.flag),
          inhouse: true,
          points: Number(this.points),
          server_link: this.server_link,
          binary_link: this.binary_link,
          solvers: 0,
          title: this.name,
          references: [],
          from: this.from
        }).then(() => {
          this.snackbar = true
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.error = true
          console.log(err)
        })
      } else {
        axios.post('https://srv.cykor.kr:31337/challs/upload', form, 
          {headers: {'Content-Type': 'multipart/form-data'}})
          .then(res => {
            if(res.status == 200) {
              const ref = db.collection('challenges').doc(this.name)
              ref.set({
                category: this.category,
                contest: this.contest_switch,
                description: this.description,
                flag: sha256(this.flag),
                inhouse: false,
                points: Number(this.points),
                server_link: "srv.cykor.kr " + res.data.port,
                binary_link: "https://srv.cykor.kr:31337/challs/download/"+this.name,
                solvers: 0,
                title: this.name
              }).then(() => {
                this.snackbar = true
                this.loading = false
              })
            } else {
              this.loading = false
              this.error = true
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }


      
    },
    flagChange() {
      this.flagHash = sha256(this.flag)
    }
  }
}
</script>

<style>
#upload-card {
  margin-bottom: 10vh;
}
</style>