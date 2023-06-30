'use client';
import Logo_GoTrip from './images/Go-Trip-logo.svg';
import Logo_GoTrip_Dark from './images/Go-Trip-logo_Dark.svg';
import Image from 'next/image';
import { useState } from 'react';
import UserOptions from '../UserOptions/UserOptions';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter } from "next/navigation";


const NavBarTop = () => {
	

    const router = useRouter();
    
    const [tokenSession, setTokenSession] = useLocalStorage('token', ''); //!MantenerCodigo

    const handleReload = () => {
        router.push('/');
      };

    const [ themeIsDark, setThemeIsDark ] = useState(false)

    const setTheme = (): void => {
        
        if (!themeIsDark) {

            setThemeIsDark(true)
             document.body.classList.add('dark');
        } else {

            setThemeIsDark(false)
             document.body.classList.remove('dark');
        }
    };

    const [windowIsOpen, setWindow] = useState('hidden');

	const closeWindow = () => {
		if (windowIsOpen === '') {
			setWindow('hidden');
		} else { 
			setWindow('');
		}
	};


    return (
        <nav className=" relative z-30 left-0 shadow-input top-0 w-full h-24 flex justify-between items-end p-5 pb-3 dark:bg-neutral-900 dark:shadow-Orange ">

            <button onClick={handleReload} className=" inline-block w-sizeLogo">
                <Image 
                src={ !themeIsDark ? Logo_GoTrip : Logo_GoTrip_Dark} 
                alt="Logo_GoTrip"
                className=""
                />
            </button>


            			{/* MANTENER CODIGO */}
			{tokenSession ? (
				<button
					onClick={closeWindow}
					className=' h-6 w-6 flex flex-col justify-evenly'
				>
					<div className='h-0 w-full border-b-2 border-b-solid border-b-iconsPurple'></div>
					<div className='h-0 w-full border-b-2 border-b-solid border-b-iconsPurple'></div>
					<div className='h-0 w-full border-b-2 border-b-solid border-b-iconsPurple'></div>
				</button>
			) : (
				''
			)}
            <UserOptions window={windowIsOpen} closeWindow={closeWindow} /> 
                {/* <label htmlFor="check"  className=" shadow-inset_custom w-14 h-8 cursor-pointer rounded-full  relative dark:shadow-inset_BlueSky ">
                    <input type="checkbox" onChange={setTheme} id="check" className=" sr-only peer" />
                    <span className="w-6 h-6 top-1 left-1 bg-iconsPurple absolute rounded-full peer-checked:bg-orangeBg peer-checked:left-7 transition-all duration-300"></span>
                </label> */}
        </nav>
    )
};

export default NavBarTop;