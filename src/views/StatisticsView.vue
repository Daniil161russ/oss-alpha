<template>
  <div class="statistics-content">
    <div class="statistics-filter">
      Регион:
      <el-select v-model="regionValue" class="m-2" placeholder="Select">
        <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="widget">
      <div class="header">
        <el-date-picker v-model="dateValue" type="date" placeholder="Pick a day" />

        <el-select v-model="timeAggrValue" class="m-2" placeholder="Select">
          <el-option v-for="item in timeAggrOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="chart">
        <Line :data="data" :options="options" />
      </div>
      <div class="footer">
        <el-select v-model="networkElemOneValue" class="m-2" placeholder="Select">
          <el-option v-for="item in networkElemOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-select v-model="networkElemTwoValue" class="m-2" placeholder="Select">
          <el-option v-for="item in networkElemOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-select v-model="groupValue" class="m-2" placeholder="Select">
          <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-select v-model="kpiValue" class="m-2" placeholder="Select">
          <el-option v-for="item in kpiOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
import { useFilterStore } from '@/stores/filterStore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// filter
const regionValue = ref('')
// widget header
const dateValue = ref('')
const timeAggrValue = ref<number>()
// widget footer
const networkElemOneValue = ref('')
const networkElemTwoValue = ref('')
const groupValue = ref('')
const kpiValue = ref('')

const regionOptions = useFilterStore().regions

const timeAggrOptions = useFilterStore().timeAggr

const networkElemOptions = [
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

const groupOptions = [
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

const kpiOptions = [
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

const data = computed(() => ({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
}))

const options = ref({
  responsive: true,
  maintainAspectRatio: false
})
</script>

<style scoped lang="scss">
.statistics-content {
  .statistics-filter {
    margin-bottom: 1.2rem;
  }

  .widget {
    width: 48%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-select {
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
