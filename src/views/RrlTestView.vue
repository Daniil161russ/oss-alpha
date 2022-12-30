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
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
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
        <div class="rrl-chart">
          <el-select v-model="chartAggr" class="m-1" placeholder="Select">
            <el-option v-for="item in chartAggrOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <Line :data="data" :options="options" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination layout="prev, pager, next" :currentPage="page" :total="rrlTestStore.count" @current-change="setPage"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRrlTestStore } from '@/stores/rrlTestStore'

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

const range = ref('')
const activeName = ref('first')
const chartAggr = ref('requests')
let page = ref(1)

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

const options = ref({
  responsive: true,
  maintainAspectRatio: false
})

const tableData = computed(() => rrlTestStore.rrl)

// const tableData = rrlTestStore.rrl

const convertDay = str => {
  const date = new Date(str)
  const mnth = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

const setPage = (val) => {
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
}
</style>
