import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import Papa, { ParseResult } from 'papaparse'

import { ComponentEnum } from '~/types'

interface CsvFileUploadProps<T> {
  setData: Dispatch<SetStateAction<T[]>>
}

const CsvFileUpload = <T,>({ setData }: CsvFileUploadProps<T>) => {
  const complete = (result: ParseResult<T>) => setData(result.data)

  const parseCSV = (file: File) => Papa.parse(file, { complete, header: true })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    selectedFile && parseCSV(selectedFile)
  }

  return <input accept='.csv' onChange={onChange} type={ComponentEnum.File} />
}

export default CsvFileUpload
