import axios from 'axios'
import { defineStore } from 'pinia'
import { convertDate } from '@/utils/date-helpers'

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

type AggregateRrl = {
  datetime: Date
  rrlid: string
  result: number
  agg_type: number
  counter_name: string
}

interface RrlTestStore {
  count: number
  rrl: RRL[]
  aggregateRrl: AggregateRrl[]
}

export const useRrlTestStore = defineStore('rrlTestStore', {
  state: (): RrlTestStore => ({
    count: 0,
    rrl: [],
    aggregateRrl: []
  }),
  getters: {
    getRequests(state) {
      const chartInfo = {
        one: [],
        two: []
      }
      state.rrl.forEach(resultItem => {
        if (resultItem.host === '192.168.0.14') {
          chartInfo.one.push(resultItem.count_requests)
        }
        if (resultItem.host === '192.168.0.15') {
          chartInfo.two.push(resultItem.count_requests)
        }
      })
      return chartInfo
    },

    getSuccessRequests(state) {
      const chartInfo = {
        one: [],
        two: []
      }
      state.rrl.forEach(resultItem => {
        if (resultItem.host === '192.168.0.14') {
          chartInfo.one.push(resultItem.count_success_request)
        }
        if (resultItem.host === '192.168.0.15') {
          chartInfo.two.push(resultItem.count_success_request)
        }
      })
      return chartInfo
    },

    getSize(state) {
      const chartInfo = {
        one: [],
        two: []
      }
      state.rrl.forEach(resultItem => {
        if (resultItem.host === '192.168.0.14') {
          chartInfo.one.push(resultItem.size)
        }
        if (resultItem.host === '192.168.0.15') {
          chartInfo.two.push(resultItem.size)
        }
      })
      return chartInfo
    },

    getResolveTime(state) {
      const chartInfo = {
        one: [],
        two: []
      }
      state.rrl.forEach(resultItem => {
        if (resultItem.host === '192.168.0.14') {
          chartInfo.one.push(resultItem.resolve_time)
        }
        if (resultItem.host === '192.168.0.15') {
          chartInfo.two.push(resultItem.resolve_time)
        }
      })
      return chartInfo
    },

    getDateTime(state) {
      return state.rrl.map(item => convertDate(item.session_date))
    },

    getAggregateData(state) {
      return state.aggregateRrl.map(item => item.result)
    },

    getAggregateDateTime(state) {
      return state.aggregateRrl.map(item => convertDate(item.datetime))
    }
  },
  actions: {
    async getRrlTable(data) {
      await axios
        .get(
          `http://10.18.10.108:8000/rrl/rrl_stat/?start_date=${data.start_date}&end_date=${data.end_date}&page=${data.page}`
        )
        .then(response => {
          console.log(response)
          this.count = response.data.count
          this.rrl = response.data.results
        })
        .catch(error => {
          console.log(error)
        })
    },

    async getAggregateRrl(data) {
      await axios
        .get(
          `http://10.18.10.108:8000/rrl/aggregate/?start_date=${data.start_date}&end_date=${data.end_date}&agg_type=${data.aggr_type}&counter=${data.counter}&host=${data.host}`
        )
        .then(response => {
          console.log(response)
          this.aggregateRrl = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
