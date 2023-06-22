import { Link as RouterLink } from "react-router-dom";
import tw from "twin.macro";

export const Link = tw(RouterLink)`
  underline text-blue-600 hover:(text-blue-400) transition-colors
  dark:(text-blue-500 hover:text-blue-300)
  cursor-pointer
`

export const BarLink = tw(RouterLink)`
  text-sm text-neutral-800 transition-colors
  hover:(text-neutral-500)
  dark:(text-neutral-200 hover:text-neutral-400)
`