import axios from 'axios'
import { defineStore } from 'pinia'

type RRL = {
  id: number
  create_time: Date
  host: string
  session_date: Date
  count_requests: number
  count_success_request: number
  size: number
  resolve_time: number
  errors: string
}

interface RrlTestStore {
  rrl: RRL[]
}

export const useRrlTestStore = defineStore('rrlTestStore', {
  state: (): RrlTestStore => ({
    rrl: []
  }),
  actions: {
    async getRrlTable(date) {
      await axios
        .get(``)
        .then(response => {
          console.log(response)
          this.rrl = response.data.results
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
