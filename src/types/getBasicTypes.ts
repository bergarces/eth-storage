
export const getBasicTypes = () => {
  const integerSizes = Array(32).fill(0).map((_, i) => (i + 1) * 8)
  const signedIntegers = integerSizes.map(v => `int${v}`)
  const unsignedIntegers = integerSizes.map(v => `uint${v}`)

  const byteSizes = Array(32).fill(0).map((_, i) => i + 1)
  const bytes = byteSizes.map(v => `bytes${v}`)

  return [
    'bool',
    'address',
    'address payable',
    'int',
    ...signedIntegers,
    'uint',
    ...unsignedIntegers,
    'byte',
    ...bytes,
    'bytes',
    'string'
  ]
}
