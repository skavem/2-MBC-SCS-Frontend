import React from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { WSSingletone } from '../../../websocket/wsSingletone'
import ShowHideButton from '../../ShowHideButton'

const ShowHideCoupletButton = ({className=''}:{className?: string}) => {
  const isShown = useAppSelector(state => state.recv.couplet) !== null
  const activeCouplet = useAppSelector(state => state.couplets.active)

  const onClick = () => {
    if (isShown) {
      WSSingletone.get().hideCouplet()
    } else {
      WSSingletone.get().showCouplet(activeCouplet?.id!)
    }
  }

  return (
      <ShowHideButton 
      className={className}
      isShown={isShown}
      onButtonClick={onClick}
      />
  )
}

export default ShowHideCoupletButton