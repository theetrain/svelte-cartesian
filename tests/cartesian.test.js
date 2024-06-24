import { describe, expect, it } from 'vitest'
import { getCartesianProduct } from '../src/cartesian'

describe('getCartesianProduct', () => {
  it('returns prop combinations', () => {
    const propSet1 = {
      one: ['two', 'three'],
      four: ['five', 'six']
    }
    const propSet2 = {
      one: ['two', 'three'],
      four: ['five', 'six', 'seven'],
      eight: ['nine', 'ten']
    }

    const results1 = getCartesianProduct(propSet1)
    const results2 = getCartesianProduct(propSet2)

    expect(results1).toEqual([
      { one: 'two', four: 'five' },
      { one: 'two', four: 'six' },
      { one: 'three', four: 'five' },
      { one: 'three', four: 'six' }
    ])
    expect(results2).toEqual([
      { one: 'two', four: 'five', eight: 'nine' },
      { one: 'two', four: 'five', eight: 'ten' },
      { one: 'two', four: 'six', eight: 'nine' },
      { one: 'two', four: 'six', eight: 'ten' },
      { one: 'two', four: 'seven', eight: 'nine' },
      { one: 'two', four: 'seven', eight: 'ten' },
      { one: 'three', four: 'five', eight: 'nine' },
      { one: 'three', four: 'five', eight: 'ten' },
      { one: 'three', four: 'six', eight: 'nine' },
      { one: 'three', four: 'six', eight: 'ten' },
      { one: 'three', four: 'seven', eight: 'nine' },
      { one: 'three', four: 'seven', eight: 'ten' }
    ])
  })
})
