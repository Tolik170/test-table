import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'

import AppTable from '~/components/app-table/AppTable'
import AppTableRow from '~/components/app-table-row/AppTableRow'

import { validateCsvData } from '~/utils/helper-functions'
import {
  columns,
  requiredFields
} from '~/containers/UserTableContainer.constants'
import { DataCsv } from '~/types'
import { styles } from './UserTableContainer.styles'

interface UserTableContainerProps {
  data: DataCsv[]
}

export const UserTableContainer: FC<UserTableContainerProps> = ({ data }) => {
  const validData = validateCsvData(data, requiredFields)

  const headColumns = columns.map((column, index) => (
    <TableCell key={index}>{column.field}</TableCell>
  ))

  const bodyColumns = data.map((row, index) => {
    const validatedRow = {
      ...row,
      Id: String(index + 1)
    }

    const nearestDuplicate = data.findIndex((otherRow, otherIndex) => {
      if (otherIndex !== index) {
        return (
          otherRow.Email?.trim().toLowerCase() ===
            row.Email?.trim().toLowerCase() ||
          otherRow.Phone?.trim().slice(-10) === row.Phone?.trim().slice(-10)
        )
      }
    })

    nearestDuplicate !== -1
      ? (validatedRow['Duplicated with'] = String(nearestDuplicate + 1))
      : (validatedRow['Duplicated with'] = '')

    return (
      <AppTableRow<DataCsv> columns={columns} item={validatedRow} key={index} />
    )
  })

  return validData.isValid ? (
    <AppTable bodyColumns={bodyColumns} headColumns={headColumns} />
  ) : (
    <Typography sx={styles.notValid}>File format is not correct</Typography>
  )
}

export default UserTableContainer
