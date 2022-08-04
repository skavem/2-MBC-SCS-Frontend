const concatClasses = (...args: (string|boolean)[]) => {
  const classes = args.reduce((retVal, classes) => {
    if (typeof classes === 'boolean') return retVal
    return retVal + ' ' + classes.trim()
  }, '')

  return classes as string
}

export default concatClasses