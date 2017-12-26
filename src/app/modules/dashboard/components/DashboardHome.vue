<template>
  <app-card class="dashboard-home">
    <div slot="title">
      <q-icon name="home"></q-icon>
      Home
    </div>
    <div slot="content">
      <div v-if="records">
        <div v-for="(record, key, index) in records" :key="key">
          {{ index + 1 }}
          <input type="text" class="input" v-model="record.name"/>
          <textarea class="input" v-model="record.description"></textarea>
          <q-button @click="">
            POST
          </q-button>
          <q-button @click="destroy(key)">
            DELETE {{ key }}
          </q-button>
          <hr v-if="records.length > 1">
        </div>
      </div>
      <hr>
      <q-button @click="create">
        CREATE
      </q-button>
      <q-button @click="read">
        REFRESH
      </q-button>
    </div>
  </app-card>
</template>

<script type="text/javascript">
  import AppCard from 'genesis/components/card/AppCard.vue'
  import { service } from 'src/domains/manager/project/model'

  export default {
    name: 'dashboard-home',
    components: {
      AppCard
    },
    data: () => ({
      records: [],
      service: service
    }),
    methods: {
      create () {
        this.service
          .post({
            name: 'SIGA',
            description: 'Description +version: ' + Math.random()
          })
          .then(data => {
            console.log('~> create', data)
            this.read()
          })
      },
      read () {
        this.service.get().then(data => {
          this.records = data
        })
      },
      destroy (key) {
        this.service.delete(key)
          .then(data => {
            console.log('~> destroy', data)
            this.read()
          })
          .catch(error => {
            console.log('~> destroy.error', error)
          })
      }
    },
    mounted () {
      this.service.subscribe((data) => {
        this.read()
        console.log('~> subscribed', data)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dashboard-home
    font-size 14px
    .jumbotron
      padding 10px
      border-radius 3px
    small
      font-style italic
</style>
