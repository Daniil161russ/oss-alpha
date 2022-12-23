<template>
  <div class="statistics-content">
    <div class="statistics-filter">
      Регион:
      <el-select v-model="regionValue" class="m-2" placeholder="Select">
        <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <el-button type="primary" @click="useStatisticsStore().addWidget">
        <el-icon><Plus /></el-icon>
        <span>Add widget</span>
      </el-button>
    </div>
    <div class="widget-list">
      <AppWidget
        v-for="widget in widgets"
        :key="widget.id"
        :widgetData="widget"
        @widget:change-request="setRequestPayload($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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
import AppWidget from '@/components/AppStatistcs/AppWidget.vue'
import { useFilterStore } from '@/stores/filterStore'
import { useStatisticsStore } from '@/stores/statisticsStore'
import type { ReqWidget } from '@/models'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const widgets = ref<ReqWidget[]>()

onMounted(() => {
  widgets.value = useStatisticsStore().widgets
})

watch(
  () => useStatisticsStore().widgets,
  () => {
    widgets.value = useStatisticsStore().widgets
  }
)

// filter
const regionValue = ref('')
// widget filters
const requestPayload = ref<ReqWidget>()

const setRequestPayload = payload => {
  console.log('SAVE_PAYLOAD::', payload)
  requestPayload.value = payload
}

const regionOptions = useFilterStore().regions
</script>

<style scoped lang="scss">
.statistics-content {
  .statistics-filter {
    margin-bottom: 1.2rem;
    .el-select {
      margin-right: 1.25rem;
    }
    .el-button {
      line-height: normal;
    }
  }

  .widget-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
