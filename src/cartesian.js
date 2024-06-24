/**
 *
 * @param {{[key: string]: any[]}} obj
 * @returns {{ [key: string]: any }[]}
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
