import { defineStore } from 'pinia'

type Regions = {
  value: string
  label: string
}

type TimeAggr = {
  value: number
  label: number
}

interface FilterStore {
  regions: Regions[]
  timeAggr: TimeAggr[]
}

export const useFilterStore = defineStore('filterStore', {
  state: (): FilterStore => ({
    regions: [
      {
        value: 'Московская область',
        label: 'Московская область'
      },
      {
        value: 'Ленинградская область',
        label: 'Ленинградская область'
      },
      {
        value: 'Смоленская область',
        label: 'Смоленская область'
      },
      {
        value: 'Ростовская область',
        label: 'Ростовская область'
      },
      {
        value: 'Воронежская област',
        label: 'Воронежская област'
      }
    ],
    timeAggr: [
      {
        value: 15,
        label: 15
      },
      {
        value: 30,
        label: 30
      },
      {
        value: 60,
        label: 60
      }
    ]
  })

  // getters: {
  //   favs(state) {
  //     return state.tasks.filter(t => t.isFav)
  //   }
  // }
})
