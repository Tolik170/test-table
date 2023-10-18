import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { TableColumn } from '~/types'
import { styles } from '~/components/app-table-row/AppTableRow.styles'

interface AppTableRowProps<T> {
  columns: TableColumn<T>[]
  item: T
}

const AppTableRow = <T,>({ columns, item }: AppTableRowProps<T>) => {
  const tableCells = columns.map(({ field, validate, calculatedValue }, i) => {
    const isValid = validate?.(item) ?? true
    const value = calculatedValue?.(item) ?? String(item[field])

    return (
      <TableCell key={i} sx={styles.column(isValid)}>
        {value}
      </TableCell>
    )
  })

  return <TableRow hover>{tableCells}</TableRow>
}

export default AppTableRow
