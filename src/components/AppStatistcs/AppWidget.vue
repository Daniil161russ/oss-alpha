<template>
  <div class="widget">
    <div class="header">
      <el-date-picker v-model="payload.dateValue" type="date" placeholder="Pick a day" class="m-2" />

      <el-select v-model="payload.timeAggrValue" class="m-2" placeholder="Select">
        <el-option v-for="item in timeAggrOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="payload.networkElemOneValue" class="m-2" placeholder="Select">
        <el-option v-for="item in networkElemOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="payload.networkElemTwoValue" class="m-2" placeholder="Select">
        <el-option v-for="item in networkElemOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="payload.groupValue" class="m-2" placeholder="Select">
        <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-select v-model="payload.kpiValue" class="m-2" placeholder="Select">
        <el-option v-for="item in kpiOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="chart">
      <Line :data="data" :options="options" />
    </div>
    <div class="footer">
      <el-button type="success">Fetch</el-button>
      <el-button type="danger" plain @click="useStatisticsStore().deleteWidget(props.widgetData.id)">Delete</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { useFilterStore } from '@/stores/filterStore'
import { useStatisticsStore } from '@/stores/statisticsStore'
import type { PropType } from 'vue'
import type { NetworkElemOptions, GroupOptions, KpiOptions, ReqWidget } from '@/models'

const props = defineProps({
  widgetData: {
    type: Object as PropType<ReqWidget>,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'widget:change-request', value: ReqWidget): void
}>()

const data = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    },
    {
      label: 'Data Two',
      backgroundColor: '#34eb74',
      data: [10, 19, 40, 22, 9, 4, 20]
    }
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: false
})

const payload = reactive({
  dateValue: '',
  timeAggrValue: undefined,
  networkElemOneValue: '',
  networkElemTwoValue: '',
  groupValue: '',
  kpiValue: ''
})

const setDefaultValues = () => {
  payload.dateValue = props.widgetData.dateValue as string
  payload.timeAggrValue = undefined
  payload.networkElemOneValue = props.widgetData.networkElemOneValue as string
  payload.networkElemTwoValue = props.widgetData.networkElemTwoValue as string
  payload.groupValue = props.widgetData.groupValue as string
  payload.kpiValue = props.widgetData.kpiValue as string
}

watch(
  () => [
    payload.dateValue,
    payload.timeAggrValue,
    payload.networkElemOneValue,
    payload.networkElemTwoValue,
    payload.groupValue,
    payload.kpiValue
  ],
  () => {
    const { dateValue, timeAggrValue, networkElemOneValue, networkElemTwoValue, groupValue, kpiValue } = payload
    const requestPayload: ReqWidget = {
      id: props.widgetData.id,
      dateValue: dateValue,
      timeAggrValue: timeAggrValue,
      networkElemOneValue: networkElemOneValue,
      networkElemTwoValue: networkElemTwoValue,
      groupValue: groupValue,
      kpiValue: kpiValue,
      region: props.widgetData.region
    }

    emit('widget:change-request', requestPayload)
  }
)

watch(
  () => props.widgetData,
  () => {
    if (!props.widgetData?.id) {
      return
    }
    setDefaultValues()
  }
)

const timeAggrOptions = useFilterStore().timeAggr

const networkElemOptions: NetworkElemOptions[] = [
  {
    value: 'L1',
    label: 'L1'
  },
  {
    value: 'L2',
    label: 'L2'
  },
  {
    value: 'L3',
    label: 'L3'
  }
]

const groupOptions: GroupOptions[] = [
  {
    value: 'group 1',
    label: 'group 1'
  },
  {
    value: 'group 2',
    label: 'group 2'
  },
  {
    value: 'group 3',
    label: 'group 3'
  }
]

const kpiOptions: KpiOptions[] = [
  {
    value: 'kpi 1',
    label: 'kpi 1'
  },
  {
    value: 'kpi 2',
    label: 'kpi 2'
  },
  {
    value: 'kpi 3',
    label: 'kpi 3'
  }
]
</script>

<style scoped lang="scss">
.widget {
  width: 48%;
  margin-bottom: 1.5rem;
  padding: 15px;
  background-color: #fff;
  border-radius: 0.3rem;
  .header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .m-2 {
      width: calc((100% - 7.8rem) / 3);
      margin-bottom: 0.5rem;
    }
  }

  .chart {
    margin-bottom: 0.5rem;
  }

  .footer {
    display: flex;
  }
}
</style>
