const concatClasses = (...args: (string|boolean|undefined)[]) => {
  const classes = args.reduce((retVal, classes) => {
    if (typeof classes === 'boolean' || typeof classes === 'undefined') return retVal
    return retVal + ' ' + classes.replaceAll(/[\n ]+/g, ' ').trim()
  }, '')

  return classes as string
}

export default concatClasses