import React from 'react'
import { Link } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { InlineLoader } from './Loader.js'
import continuousStyles from './continuousStyles.js'

const buttonStyles = tw`
  bg-white border text-neutral-800 font-semibold pb-1 pt-1.5 px-4 rounded-md shadow select-none
  dark:(bg-neutral-800 text-white)
  inline-flex items-center gap-1
  cursor-pointer
  hover:bg-opacity-100! hover:shadow-lg
  focus:ring focus:border-indigo-300! focus:ring-opacity-100!
`

const disabledStyles = tw`
  bg-opacity-100 bg-neutral-200! text-neutral-400! border-neutral-300! pointer-events-none shadow-none
  hover:(bg-gradient-to-tr! from-neutral-500 to-neutral-400 text-neutral-600! border-neutral-300! shadow-none)
  dark:(bg-neutral-700! text-neutral-500! border-neutral-600!)
`

const smallStyles = tw`text-sm`

const wideStyles = tw`w-full justify-center`

/*
 *  Button type styles
 */

const defaultStyles = tw`
  border-indigo-600 text-indigo-600
  hover:(bg-gradient-to-tr! from-indigo-700 to-indigo-500 border-transparent text-white)
`

const grayStyles = tw`
  border-neutral-400 text-neutral-600
  hover:bg-gradient-to-tr! hover:from-neutral-800 hover:to-neutral-700 hover:border-neutral-700 hover:text-neutral-100
`

const redStyles = tw`
  border-red-500 text-red-600!
  hover:bg-gradient-to-tr! hover:from-red-600 hover:to-red-500 hover:text-white!
`

const colors = {
  default: defaultStyles,
  red: redStyles,
  gray: grayStyles
}

const StyledButton = styled.button(({ disabled, small, wide, continuous, color = 'default' }) => {
  return [
    buttonStyles,
    disabled && disabledStyles,
    small && smallStyles,
    wide && wideStyles,
    continuous && continuousStyles,
    colors[color]
  ]
})

export const Button = React.forwardRef(({ loading, children, disabled, to, ...props }, ref) => {
  const isDisabled = disabled ?? loading
  return <StyledButton ref={ref} disabled={isDisabled} {...(to ? { as: Link, to: to } : {})} {...props}>
   {!loading ? children : <InlineLoader />}
  </StyledButton>
})

Button.displayName = 'Button'

export default Button
