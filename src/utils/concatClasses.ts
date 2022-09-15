const concatClasses = (...args: (string|boolean)[]) => {
  const classes = args.reduce((retVal, classes) => {
    if (typeof classes === 'boolean') return retVal
    return retVal + ' ' + classes.replaceAll(/[\n ]+/g, ' ').trim()
  }, '')

  return classes as string
}

export default concatClasses