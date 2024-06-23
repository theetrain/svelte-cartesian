export function product() {
  Object.values(props).reduce((acc, cur) => {
    return acc * cur.length
  }, 1)
}

export function getCartesianProps(props = {}) {
  const propNames = Object.keys(props)
  // const product = 

  // for (let i = 0; )
}
