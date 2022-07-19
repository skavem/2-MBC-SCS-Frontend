const isScrollNeeded = (child: HTMLElement, parent: HTMLElement) => {
  const childRect = child.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()

  return (childRect.top < parentRect.top) || (childRect.bottom > parentRect.bottom)
}

export default isScrollNeeded