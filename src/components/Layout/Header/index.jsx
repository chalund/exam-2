import Logo from "../Logo"
import Nav from "../Nav"

const Header = () => {
  return (
    <div className='bg-zinc-100 sticky top-0 z-[20] flex-wrap mx-auto flex w-full items-center justify-between border-b-2'>
       <div className="mx-auto max-w-screen-lg px-4 py-2 flex w-full items-center justify-between flex-wrap">
      <Logo />
      <Nav />
      </div>
    </div>
  )
}

export default Header
