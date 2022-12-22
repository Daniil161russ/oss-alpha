<template>
  <div class="configuration-content">
    <div class="configuration-filter">
      Регион:
      <el-select v-model="regionValue" class="m-2" placeholder="Select">
        <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="configuration-table">
      <div class="header">
        <el-select v-model="featureValue" class="m-2" placeholder="Select">
          <el-option v-for="item in featureOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-select v-model="timeAggrValue" class="m-2" placeholder="Select">
          <el-option v-for="item in timeAggrOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/stores/filterStore'

// filter
const regionValue = ref('')

// table filter
const featureValue = ref('')
const timeAggrValue = ref<number>()

const regionOptions = useFilterStore().regions

const timeAggrOptions = useFilterStore().timeAggr

const featureOptions = [
  {
    value: 'feature 1',
    label: 'feature 1'
  },
  {
    value: 'feature 2',
    label: 'feature 2'
  },
  {
    value: 'feature 3',
    label: 'feature 3'
  }
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style scoped lang="scss">
.configuration-content {
  .configuration-filter {
    margin-bottom: 1.2rem;
  }

  .configuration-table {
    width: 50%;

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      .el-select {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
