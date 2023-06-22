export const simple = {
  enter: 'transition-all ease-in-out duration-200',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'transition-all ease-in-out duration-200 w-full',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0'
}

export const popUp = {
  enter: 'transition-all ease-in-out duration-200',
  enterFrom: 'opacity-0 blur-sm scale-90',
  enterTo: 'opacity-100 blur-none scale-100',
  leave: 'transition-all ease-in-out duration-200 w-full',
  leaveFrom: 'opacity-100 blur-none scale-100',
  leaveTo: 'opacity-0 blur-sm scale-90'
}

export const dropdown = {
  enter: 'transition ease-out duration-100',
  enterFrom: 'transform opacity-0 scale-95',
  enterTo: 'transform opacity-100 scale-100',
  leave: 'transition ease-in duration-75',
  leaveFrom: 'transform opacity-100 scale-100',
  leaveTo: 'transform opacity-0 scale-95'
}
