import { Loader2 } from 'lucide-react'
import PropTypes from 'prop-types'
import React from 'react'
import tw from 'twin.macro'

const LoaderContainer = tw.div`
  flex flex-row items-center justify-center w-full h-full px-4
`

export const InlineLoader = tw(Loader2)`
  animate-spin stroke-current text-gray-400
`

export default function Loader ({ size }) {
  return (
    <LoaderContainer>
      <InlineLoader size={size || 36} aria-label="Loading..." />
    </LoaderContainer>
  )
}

Loader.propTypes = {
  size: PropTypes.number
}
