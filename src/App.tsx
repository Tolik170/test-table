import { useState } from 'react'
import Box from '@mui/material/Box'

import CsvFileUpload from '~/components/csv-file-upload/CsvFileUpload'
import UserTableContainer from '~/containers/UserTableContainer'

import { DataCsv } from '~/types'
import '~/App.css'

function App() {
  const [data, setData] = useState<DataCsv[]>([])
  return (
    <Box>
      <CsvFileUpload<DataCsv> setData={setData} />
      {data.length > 0 && <UserTableContainer data={data} />}
    </Box>
  )
}

export default App
