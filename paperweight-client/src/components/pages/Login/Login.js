import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { redirect } from 'react-router-dom'
import tw from 'twin.macro'
import useAuth from '../../../hooks/useAuth.js'
import { ReactComponent as Icon } from '../../../svg/pw_icon.svg'
import Button from '../../common/Button.js'
import Separator from '../../common/Separator.js'

const Background = tw.div`
  absolute top-0 bottom-0 left-0 right-0 z-10
  text-neutral-50 dark:text-neutral-950 select-none
  [font-size:300px] md:[font-size: 500px] opacity-20 text-justify
  font-title font-black overflow-hidden break-words tracking-tighter leading-none
`

const WindowContainer = tw.div`
  absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center
`

const Window = tw.div`
  min-h-[384px] w-96 bg-white dark:bg-neutral-800 shadow-md rounded-md z-20
  flex flex-col py-4 px-6 mx-4
`

const StyledIcon = tw(Icon)`
  h-10 mt-2 mb-4
`

const SignInOptions = tw.div`
  flex flex-col gap-2 grow items-center justify-center
`

const Version = tw.div`
  text-sm w-full text-center text-neutral-200 dark:text-neutral-600
`

export default function Login(props) {
  const { auth } = useAuth()
  const [waitingForAuth, setWaiting] = useState(false)

  const signIn = async () => {
    setWaiting(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      redirect('/app')
    } catch (e) {
      console.log(e)
    }
    setWaiting(false)
  }

  return (
    <WindowContainer>
      <Background>
        PAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHTPAPERWEIGHT
      </Background>
      <Window>
        <StyledIcon />
        <Separator />
        <SignInOptions>
          <Button color='default' onClick={signIn} loading={waitingForAuth}>Sign in with Google</Button>
        </SignInOptions>
        <Version>{process.env.REACT_APP_VERSION}</Version>
      </Window>
    </WindowContainer>
  )
}
