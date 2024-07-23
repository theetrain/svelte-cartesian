/**
 * @typedef {{ [key: string]: any }} CartesianProp
 */

/**
 * Convert props with arrays of values into their
 * Cartesian Product: an array of prop combinations.
 * @param {{[key: string]: any[]}} obj
 * @returns {CartesianProp[]}
 */
export function getCartesianProduct (obj) {
  const entries = Object.entries(obj)

  // Base case: if the entries array is empty, return an array with an empty object
  if (entries.length === 0) {
    return [{}]
  }

  // Recursive case: extract the first key-value pair from the entries
  const [key, values] = entries[0]

  const remainingProduct = getCartesianProduct(
    Object.fromEntries(entries.slice(1))
  )

  const result = []

  for (const value of values) {
    // Iterate over each combination of the remaining product
    for (const product of remainingProduct) {
      // Create a new object with the current key-value pair and merge it with the remaining product
      result.push({ [key]: value, ...product })
    }
  }

  return result
}

/**
 * Creates a label to render for a given component combination.
 * @param {CartesianProp} innerProps
 * @param {{verbosity?: boolean | 'short' | 'long' | 'long-with-objects'}} [options={ verbosity: 'short' }]
 */
export function createLabel (
  innerProps,
  { verbosity } = { verbosity: 'short' }
) {
  const shortValues = ['string', 'number', 'boolean']
  const label = []
  const shortVerbosity = verbosity === 'short' || verbosity === true
  const joinCharacter = shortVerbosity ? ', ' : '\n'

  for (const [key, value] of Object.entries(innerProps)) {
    const isShortValue = shortValues.includes(typeof value)

    if (
      shortVerbosity
      && !isShortValue
    ) {
      // Skip symbols and objects for 'short' labels
      continue
    }

    let refinedValue = value

    // Long verbosity treatment
    if (
      verbosity === 'long'
      && !isShortValue
    ) {
      refinedValue = typeof value
    } else if (verbosity === 'long-with-objects' && typeof value === 'object') {
      refinedValue = JSON.stringify(value, null, 1)
    }

    if (verbosity === 'long' || verbosity === 'long-with-objects') {
      label.push(`${key}: ${refinedValue}`)
    } else if (shortVerbosity && typeof value === 'boolean') {
      label.push(`${key}=${value}`)
    } else {
      label.push(refinedValue)
    }
  }

  return label.join(joinCharacter)
}
