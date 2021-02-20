export type Order = {
  id: number
  uuid: string
  timeCreated: string
  state: number
}

export type OrdersFilter = {
  state: number
}
