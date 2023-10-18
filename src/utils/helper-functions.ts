import { DataCsv, MissingField } from '~/types'

export const validateCsvData = (data: DataCsv[], requiredFields: string[]) => {
  const missingFields: MissingField[] = []

  data.forEach((row, index) => {
    requiredFields.forEach((field) => {
      if (!row[field as keyof DataCsv]) {
        missingFields.push({ field, row: index + 1 })
      }
    })
  })

  const isValidCsv = Array.isArray(data) && data.length > 0

  return {
    isValid: isValidCsv && missingFields.length === 0,
    missingFields
  }
}
