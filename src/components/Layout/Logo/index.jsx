import { Link } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";


const Logo = () => {
  return (
    <div className=" text-violet-600">
      <Link to="/" className='flex items-center'>
        <RiHome2Line size={40}/>
        <h1 className="text-2xl mt-2">Holidaze</h1>
      </Link>
    </div>
  )
}

export default Logo
