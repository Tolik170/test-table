export const styles = {
  column: (isValid: boolean) => ({
    ...(!isValid && { backgroundColor: '#ff9696' })
  })
}
