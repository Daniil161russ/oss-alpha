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
  count: number,
  rrl: RRL[]
}

export const useRrlTestStore = defineStore('rrlTestStore', {
  state: (): RrlTestStore => ({
    count: 0,
    rrl: []
  }),
  actions: {
    async getRrlTable(data) {
      await axios
        .get(`http://10.18.10.108:8000/rrl/rrl_stat/?start_date=${data.start_date}&end_date=${data.end_date}&page=${data.page}`)
        .then(response => {
          console.log(response)
          this.count = response.data.count
          this.rrl = response.data.results
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
