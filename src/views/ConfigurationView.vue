<template>
  <div class="configuration-content">
    <div class="configuration-filter">
      Регион:
      <el-select v-model="regionValue" class="m-2" placeholder="Select">
        <el-option v-for="item in regionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="configuration-body">
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

      <div class="configuration-topology">
        <h3>Topology</h3>
        <el-tree :data="dataSource" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <a @click="append(data)" style="color: #4ade80"> Append </a>
                <a style="margin-left: 8px; color: #f0312e" @click="remove(node, data)"> Delete </a>
              </span>
            </span>
          </template>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFilterStore } from '@/stores/filterStore'
import type Node from 'element-plus/es/components/tree/src/model/node'

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

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

let id = 1000

const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'ENBFunction',
    children: [
      {
        id: 4,
        label: 'ENodeB 1-1',
        children: [
          {
            id: 9,
            label: 'Cell-1-1-1'
          },
          {
            id: 10,
            label: 'Cell-1-1-2'
          }
        ]
      }
    ]
  }
])

const append = (data: Tree) => {
  const newChild = { id: id++, label: `ENodeB-${id}`, children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  dataSource.value = [...dataSource.value]
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex(d => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}
</script>

<style scoped lang="scss">
.configuration-content {
  .configuration-filter {
    margin-bottom: 1.2rem;
  }

  .configuration-body {
    display: flex;
    justify-content: space-between;

    .configuration-table {
      width: 60%;

      .header {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        .el-select {
          margin-right: 0.5rem;
        }
      }
    }

    .configuration-topology {
      width: 38%;

      h3 {
        line-height: 32px;
        margin-bottom: 0.5rem;
      }

      .el-tree {
        padding: 15px;
      }

      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
  }
}
</style>
