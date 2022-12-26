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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRrlTestStore } from '@/stores/rrlTestStore'

const rrlTestStore = useRrlTestStore()

const range = ref('')

const tableData = computed(() => rrlTestStore.rrl)

// const tableData = rrlTestStore.rrl

const convertDay = str => {
  const date = new Date(str)
  const mnth = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return [date.getFullYear(), mnth, day].join('-')
}

const fetchData = () => {
  const data = {
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
}
</style>
