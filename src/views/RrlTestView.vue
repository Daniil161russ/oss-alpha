<template>
  <div class="rrl-content">
    <div class="rrl-filter">
      Date range:
      <el-date-picker
        v-model="range"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        class="rrl-date-picker"
      />

      <el-button type="primary" @click="fetchData">Fetch</el-button>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="Table" name="first">
        <div class="rrl-table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="created_time" label="Create Date" />
            <el-table-column prop="host" label="Host" />
            <el-table-column prop="session_date" label="Session Date" />
            <el-table-column prop="count_requests" label="Requests" />
            <el-table-column prop="count_success_request" label="Success Requests" />
            <el-table-column prop="size" label="Size" />
            <el-table-column prop="resolve_time" label="Resolve Time" />
            <el-table-column prop="errors" label="Errors" />
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Chart" name="second">
        <el-select v-model="chartAggr" class="m-1" placeholder="Select" @change="handleSelect">
          <el-option v-for="item in chartAggrOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="rrl-chart">
          <Line :data="data" :options="options" />
        </div>
      </el-tab-pane>

      <el-tab-pane label="Aggregate Chart" name="third">
        <div class="aggr-chart-header">
          <el-select v-model="timeAggrValue" class="m-3" placeholder="Select">
            <el-option v-for="item in filterStore.timeAggr" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <el-select v-model="hostValue" class="m-3" placeholder="Select">
            <el-option v-for="item in hostOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <el-select v-model="counterValue" class="m-3" placeholder="Select">
            <el-option v-for="item in counterOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <el-button type="success" @click="fetchAggrChart">Fetch</el-button>
        </div>

        <div class="aggr-rrl-chart" v-if="rrlTestStore.aggregateRrl.length">
          <Line :data="dataAggr" :options="optionsAggr" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      v-if="activeName !== 'third'"
      layout="prev, pager, next"
      :currentPage="page"
      :total="rrlTestStore.count"
      @current-change="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRrlTestStore } from '@/stores/rrlTestStore'
import { useFilterStore } from '@/stores/filterStore'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const rrlTestStore = useRrlTestStore()
const filterStore = useFilterStore()

const range = ref('')
const activeName = ref('first')
const chartAggr = ref('')
const timeAggrValue = ref()
const hostValue = ref('')
const counterValue = ref()
let page = ref(1)

let chartKpiDataOne = ref(rrlTestStore.getRequests?.one)
let chartKpiDataTwo = ref(rrlTestStore.getRequests?.two)

const dataAggr = computed(() => ({
  labels: rrlTestStore.getAggregateDateTime,
  datasets: [
    {
      backgroundColor: '#f87979',
      data: rrlTestStore.getAggregateData
    }
  ]
}))

const optionsAggr = ref({
  responsive: true,
  maintainAspectRatio: false
})

const data = computed(() => ({
  labels: rrlTestStore.getDateTime,
  datasets: [
    {
      label: '192.168.0.14',
      backgroundColor: '#f87979',
      data: chartKpiDataOne.value
    },
    {
      label: '192.168.0.15',
      backgroundColor: '#5af542',
      data: chartKpiDataTwo.value
    }
  ]
}))

const chartAggrOptions = [
  {
    value: 'requests',
    label: 'Requests'
  },
  {
    value: 'success_requests',
    label: 'Success Requests'
  },
  {
    value: 'size',
    label: 'Size'
  },
  {
    value: 'resolve_time',
    label: 'Resolve Time'
  }
]

const hostOptions = [
  {
    value: '192.168.0.14',
    label: '192.168.0.14'
  },
  {
    value: '192.168.0.15',
    label: '192.168.0.15'
  }
]

const counterOptions = [
  {
    value: '34',
    label: 'tx_power_status'
  },
  {
    value: '35',
    label: 'rssi_status'
  },
  {
    value: '36',
    label: 'evm_status'
  },
  {
    value: '37',
    label: 'per_status'
  },
  {
    value: '38',
    label: 'temp_status'
  },
  {
    value: '39',
    label: 'modulation_tx_status'
  },
  {
    value: '40',
    label: 'modulation_rx_status'
  }
]

const options = ref({
  responsive: true,
  maintainAspectRatio: false
})

const tableData = computed(() => rrlTestStore.rrl)

const convertDay = str => {
  const date = new Date(str)
  const mnth = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

const setPage = val => {
  page.value = val
  fetchData()
}

const fetchData = () => {
  const data = {
    page: page.value,
    start_date: convertDay(range.value[0]),
    end_date: convertDay(range.value[1])
  }
  rrlTestStore.getRrlTable(data)

  chartKpiDataOne.value = rrlTestStore.getRequests?.one
  chartKpiDataTwo.value = rrlTestStore.getRequests?.two
}

const fetchAggrChart = () => {
  const data = {
    start_date: convertDay(range.value[0]),
    end_date: convertDay(range.value[1]),
    host: hostValue.value,
    counter: counterValue.value,
    aggr_type: timeAggrValue.value
  }

  rrlTestStore.getAggregateRrl(data)
}

const handleSelect = () => {
  if (chartAggr.value === 'requests') {
    chartKpiDataOne.value = rrlTestStore.getRequests?.one
    chartKpiDataTwo.value = rrlTestStore.getRequests?.two
  }
  if (chartAggr.value === 'success_requests') {
    chartKpiDataOne.value = rrlTestStore.getSuccessRequests?.one
    chartKpiDataTwo.value = rrlTestStore.getSuccessRequests?.two
  }
  if (chartAggr.value === 'size') {
    chartKpiDataOne.value = rrlTestStore.getSize?.one
    chartKpiDataTwo.value = rrlTestStore.getSize?.two
  }
  if (chartAggr.value === 'resolve_time') {
    chartKpiDataOne.value = rrlTestStore.getResolveTime?.one
    chartKpiDataTwo.value = rrlTestStore.getResolveTime?.two
  }
}
</script>

<style scoped lang="scss">
.rrl-content {
  .rrl-filter {
    margin-bottom: 1.2rem;
    display: inline-flex;
    align-items: center;
    .el-button {
      margin-left: 1rem;
    }
  }
  .rrl-chart {
    width: 70%;
  }
  .aggr-chart-header {
    display: flex;
  }
  .m-3 {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
  }
  .aggr-rrl-chart {
    widows: 70%;
    height: 300px;
  }
}
</style>
