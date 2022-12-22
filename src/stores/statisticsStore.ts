import { defineStore } from 'pinia'

export const useStatisticsStore = defineStore('statisticsStore', {
  state: () => ({
    chartData: null
  })
})
