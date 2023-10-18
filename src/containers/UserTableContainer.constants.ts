import {
  yyyyMMDDFormat,
  mmDDYYYYFormat,
  numbersAndSymbols
} from '~/utils/regex'
import { TableColumn, DataCsv } from '~/types'

const statesAbbreviations: { [key: string]: string } = {
  Alabama: 'AL',
  California: 'CA'
}

export const requiredFields = ['Full Name', 'Phone', 'Email']

export const columns: TableColumn<DataCsv>[] = [
  {
    field: 'Id'
  },
  {
    field: 'Full Name'
  },
  {
    field: 'Phone',
    validate: (item: DataCsv) => {
      const value = item['Phone'].replace(/\D/g, '').trim()

      if (value.length === 10) {
        item['Phone'] = '+1' + value
        return true
      } else if (value.length === 11 && value.startsWith('1')) {
        item['Phone'] = '+' + value
        return true
      } else if (value.length === 12 && value.startsWith('+1')) {
        return true
      }

      return false
    }
  },
  {
    field: 'Email'
  },
  {
    field: 'Age',
    validate: (item: DataCsv) => Number(item.Age) > 21
  },
  {
    field: 'Experience',
    validate: (item: DataCsv) =>
      Number(item.Experience) <= Number(item.Age) &&
      Number(item.Experience) >= 0
  },
  {
    field: 'Yearly Income',
    validate: (item: DataCsv) => {
      const value = parseFloat(item['Yearly Income'].trim())

      if (isNaN(value)) return false
      if (value < 0 || value > 1000000) return false

      item['Yearly Income'] = value.toFixed(2)

      return true
    }
  },
  {
    field: 'Has children',
    validate: (item: DataCsv) => {
      const value = item['Has children'].trim()

      if (value === 'TRUE' || value === 'FALSE' || value === '') {
        if (value === '') item['Has children'] = 'FALSE'

        return true
      }

      return false
    }
  },
  {
    field: 'License states',
    validate: (item: DataCsv) => {
      const licenseStates = item['License states'].trim()
      const validAbbreviations: string[] = []

      const stateValues = licenseStates.split('|').map((state) => state.trim())

      const allValid = stateValues.every((stateValue) => {
        if (
          /^[A-Z]{2}$/.test(stateValue) &&
          Object.values(statesAbbreviations).includes(stateValue)
        ) {
          validAbbreviations.push(stateValue)
        } else if (statesAbbreviations[stateValue]) {
          validAbbreviations.push(statesAbbreviations[stateValue])
        } else {
          return false
        }
        return true
      })

      if (allValid) {
        item['License states'] = validAbbreviations.join(' | ')
      }

      return allValid
    }
  },
  {
    field: 'Expiration date',
    validate: (item: DataCsv) => {
      const dateValue = item['Expiration date'].trim()

      if (!yyyyMMDDFormat.test(dateValue) && !mmDDYYYYFormat.test(dateValue)) {
        return false
      }

      if (new Date(dateValue) < new Date()) return false

      return true
    }
  },
  {
    field: 'License number',
    validate: (item: DataCsv) => {
      const licenseNumber = item['License number'].trim()

      if (licenseNumber.length === 6 && numbersAndSymbols.test(licenseNumber)) {
        return true
      }

      return false
    }
  },
  {
    field: 'Duplicated with'
  }
]
