import { describe, expect, it } from 'vitest'
import { createLabel, getCartesianProduct } from '../lib/cartesian'

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

describe('createLabel', () => {
  it('returns short labels (default behaviour)', () => {
    expect(createLabel({ variant: 'primary' }))
      .toBe('primary')

    expect(createLabel({ variant: 'primary' }, { verbosity: 'short' }))
      .toBe('primary')

    expect(createLabel({ variant: 'primary' }, { verbosity: true }))
      .toBe('primary')

    expect(createLabel({ variant: 'primary', size: 'md' }))
      .toBe('primary, md')

    expect(createLabel({ variant: 'primary', disabled: true }), 'handles booleans')
      .toBe('primary, disabled=true')
  })

  it('returns long labels', () => {
    expect(createLabel({ variant: 'primary' }, { verbosity: 'long' }))
      .toBe('variant: primary')

    expect(createLabel({
      variant: 'primary',
      size: 'md',
      obj: { hello: 'world' }
    }, { verbosity: 'long' }))
      .toBe('variant: primary\nsize: md\nobj: object')
  })

  it('handles functions and symbols (short)', () => {
    expect(createLabel({
      variant: 'primary',
      cb: (/** @type {Event} */ e) => {
        e.preventDefault()
      },
      obj: { hello: 'world' },
      sym: Symbol('foo')
    }))
      .toBe('primary')
  })

  it('returns object contents', () => {
    expect(createLabel({
      variant: 'primary',
      cb: (/** @type {Event} */ e) => {
        e.preventDefault()
      },
      obj: { hello: 'world' }
    }, { verbosity: 'long-with-objects' }))
      .toBe(
        'variant: primary\n\
cb: (/** @type {Event} */ e) => {\n\
        e.preventDefault()\n\
      }\n\
obj: {\n\
 "hello": "world"\n\
}')
  })
})
