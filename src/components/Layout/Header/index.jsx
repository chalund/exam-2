import Logo from "../Logo"
import Nav from "../Nav"

const Header = () => {
  return (
    <div className='bg-slate-50 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-gray-500 p-8 '>
      <Logo />
      <Nav />
    </div>
  )
}

export default Header
