import { getBasicTypes } from './getBasicTypes'

export const getTypeValidator = (structTypes: string[], enumTypes: string[], contractTypes: string[]) => {
  const userTypes = [...structTypes, ...enumTypes, ...contractTypes]

  const isValidType = (type: string): boolean => {
    const mappingMatch = type.match(/^mapping\s*\((.*?) => (.*)\)$/)
    const arrayMatch = type.match(/^(.*)\[\]$/)

    console.log({ mappingMatch, type })

    if (mappingMatch) {
      return isValid(mappingMatch[1], [...enumTypes, ...contractTypes]) && isValidType(mappingMatch[2])
    } else if (arrayMatch) {
      return isValidType(arrayMatch[1])
    } else {
      return isValid(type, userTypes)
    }
  }

  return isValidType
}

const isValid = (type: string, userTypes: string[]) => {
  return getBasicTypes().includes(type) || userTypes.includes(type)
}
