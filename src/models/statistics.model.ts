type NetworkElemOptions = {
  value: string
  label: string
}

type GroupOptions = {
  value: string
  label: string
}

type KpiOptions = {
  value: string
  label: string
}

type ReqWidget = {
  id: string
  region: string
  dateValue: string
  timeAggrValue: number | undefined
  networkElemOneValue: string
  networkElemTwoValue: string
  groupValue: string
  kpiValue: string
}

export type { NetworkElemOptions, GroupOptions, KpiOptions, ReqWidget }
