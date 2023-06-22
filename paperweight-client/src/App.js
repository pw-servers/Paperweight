import React from 'react';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';
import { BarLink } from './components/common/Link.js';
import ProfileButton from './components/common/ProfileButton.js';
import { ReactComponent as Icon } from './svg/pw_icon.svg';

const Container = tw.div`
  px-2 md:px-10
  flex flex-col
  container mx-auto
`

const TopBar = tw.div`
  fixed top-0 left-0 right-0
  flex flex-row items-center px-5 py-4 w-full
  backdrop-blur bg-white/20 dark:bg-neutral-900/20 container mx-auto
`

const IconAndName = tw.div`
  flex flex-row items-end h-10 gap-1
`

const Version = tw.div`
  mb-5 text-sm text-gray-400 ml-1
`

const QuickLinks = tw.div`
  grow flex items-center justify-around px-5 gap-1
`

const StyledIcon = tw(Icon)`
  h-full -mb-0.5
`

const OutletContainer = tw.div`
  mt-24
`

function App() {

  return (
    <Container>
      <TopBar>
        <IconAndName>
          <StyledIcon /><Version>{process.env.REACT_APP_VERSION}</Version>
        </IconAndName>
        <QuickLinks>
          <BarLink to='servers'>Servers</BarLink>
          <BarLink to='users'>Users</BarLink>
        </QuickLinks>
        <ProfileButton />
      </TopBar>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  )
}

export default App;
