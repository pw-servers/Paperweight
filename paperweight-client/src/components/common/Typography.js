import tw from "twin.macro";

export const Title = tw.h1`
  font-black text-5xl uppercase font-title leading-none tracking-tighter -mb-2.5
  // Gradient text
  text-transparent bg-gradient-to-tl from-violet-700 to-violet-300 bg-clip-text 
`

export const SubtleTitle = tw(Title)`
  bg-none
  text-neutral-400 dark:text-neutral-600
`