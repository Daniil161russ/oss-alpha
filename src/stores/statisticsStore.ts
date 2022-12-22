import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { ReqWidget } from '@/models'

interface StatisticsStore {
  chartData: null
  widgets: ReqWidget[]
}

export const useStatisticsStore = defineStore('statisticsStore', {
  state: (): StatisticsStore => ({
    chartData: null,
    widgets: [
      {
        id: uuidv4(),
        region: '',
        dateValue: '',
        timeAggrValue: undefined,
        networkElemOneValue: '',
        networkElemTwoValue: '',
        groupValue: '',
        kpiValue: ''
      }
    ]
  }),

  actions: {
    addWidget() {
      const defaultWidget: ReqWidget = {
        id: uuidv4(),
        region: '',
        dateValue: '',
        timeAggrValue: undefined,
        networkElemOneValue: '',
        networkElemTwoValue: '',
        groupValue: '',
        kpiValue: ''
      }

      this.widgets.push(defaultWidget)
    }
  }
})
