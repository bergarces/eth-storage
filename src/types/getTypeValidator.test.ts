import { getBasicTypes } from './getBasicTypes'
import { getTypeValidator } from './getTypeValidator'

const basicTypes = getBasicTypes()

describe('simple validator', () => {
  const isValidType = getTypeValidator([], [], [])

  test('validator is generated', () => {
    expect(isValidType).toBeDefined()
  })

  test.each(basicTypes)('type %p returns true', type => {
    const isValid = isValidType(type)
    expect(isValid).toBe(true)
  })

  test.each(basicTypes.map(t => `${t}[]`))('type %p returns true', type => {
    const isValid = isValidType(type)
    expect(isValid).toBe(true)
  })

  test('multidimensional array returns true', () => {
    const isValid = isValidType('uint[][]')
    expect(isValid).toBe(true)
  })

  test('mapping returns true', () => {
    const isValid = isValidType('mapping (address => uint)')
    expect(isValid).toBe(true)
  })

  test('mapping with invalid key type returns false', () => {
    const isValid = isValidType('mapping (address[] => uint)')
    expect(isValid).toBe(false)
  })

  test('nested mapping returns true', () => {
    const isValid = isValidType('mapping (address => mapping (uint256 => bool[]))')
    expect(isValid).toBe(true)
  })

  test('mapping array returns true', () => {
    const isValid = isValidType('mapping (address => uint)[]')
    expect(isValid).toBe(true)
  })

  test('unknown type returns false', () => {
    const isValid = isValidType('unknowntype')
    expect(isValid).toBe(false)
  })
})
