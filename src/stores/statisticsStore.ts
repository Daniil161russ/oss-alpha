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
      if (this.widgets.length >= 6) {
        ElMessage({
          message: 'Warning, maximum number of widgets.',
          type: 'warning'
        })
      } else {
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
    },

    deleteWidget(id: string) {
      if (this.widgets.length === 1) {
        ElMessage({
          message: 'Warning, minimum number of widgets one.',
          type: 'warning'
        })
      } else {
        this.widgets = this.widgets.filter(w => {
          return w.id !== id
        })
      }
    }
  }
})
