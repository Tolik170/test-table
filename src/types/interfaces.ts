export interface DataCsv {
  Id: string
  'Full Name': string
  Phone: string
  Email: string
  Age: string
  Experience: string
  'Yearly Income': string
  'Has children': string
  'License states': string
  'Expiration date': string
  'License number': string
  'Duplicated with': string
}

export interface MissingField {
  field: string
  row: number
}

export interface TableColumn<T> {
  field: keyof T
  validate?: (item: T) => boolean
  calculatedValue?: (item: T) => string
}
