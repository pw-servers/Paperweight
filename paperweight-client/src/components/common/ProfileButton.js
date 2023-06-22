import { Menu, Transition } from '@headlessui/react'
import { signOut as signOutFirebase } from 'firebase/auth'
import { UserIcon } from 'lucide-react'
import React, { useState } from 'react'
import tw from 'twin.macro'
import useAuth from '../../hooks/useAuth.js'
import { dropdown } from '../../util/transitions.js'
import { Link } from './Link.js'
import Separator from './Separator.js'

const User = tw(Menu.Button)`
  shrink-0 relative
  rounded-full h-10 w-10 md:(h-12 w-12) overflow-clip border-2 border-neutral-300 dark:border-neutral-600
  hover:(scale-105) transition-all ui-open:(border-violet-700)
`

const UserImage = tw.img`
  w-full h-full stroke-neutral-600
`

const Items = tw(Menu.Items)`
  bg-white border border-neutral-300 rounded shadow
  dark:(bg-neutral-800 border-neutral-600)
  px-3 py-2
  absolute top-0 right-0
  mt-8
  text-sm
  flex flex-col
`



export default function ProfileButton(props) {
  const { user, auth } = useAuth()
  const [imageLoadFail, setImageLoadFail] = useState(false)

  const signOut = async () => {
    await signOutFirebase(auth)
  }

  return (
    <Menu>
      <User>
        {
          (user?.photoURL && !imageLoadFail)
            ? <UserImage src={user?.photoURL} onError={() => setImageLoadFail(true)} />
            : <UserImage className='p-1' as={UserIcon} />
        }
      </User>
      <Transition {...dropdown}>
        <Items>
          <strong>{user?.displayName}</strong>
          <span>{user?.email}</span>
          <Separator />
          <Link as='span' onClick={signOut}>Log out</Link>
        </Items>
      </Transition>
    </Menu>
  )
}
