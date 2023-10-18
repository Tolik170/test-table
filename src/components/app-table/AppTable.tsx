import { FC } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface AppTableProps {
  headColumns: JSX.Element[]
  bodyColumns: JSX.Element[]
}

const AppTable: FC<AppTableProps> = ({ headColumns, bodyColumns }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: '#d1e8ed' }}>
          <TableRow>{headColumns}</TableRow>
        </TableHead>
        <TableBody>{bodyColumns}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default AppTable
