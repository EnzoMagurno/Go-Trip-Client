import Link from "next/link"
import { AiOutlineHome, AiOutlineHeart, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'


const NavBarFooter = () => {
    return (
        <nav className='center flex justify-evenly rounded-full shadow-input pt-5 pb-5 text-3xl fixed bottom-0 w-full'>
            <Link href='' ><AiOutlineHome /></Link>
            <Link href='' ><AiOutlineHeart /></Link>
            <Link href='' ><AiOutlineMail /></Link>
            <Link href='' ><AiOutlineUser /></Link>
        </nav>
    )
}
export default NavBarFooter