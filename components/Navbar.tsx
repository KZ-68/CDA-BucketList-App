import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { GoHomeFill,  } from "react-icons/go"
import { CiViewList } from "react-icons/ci";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import { LuPlus } from "react-icons/lu";

export default function Navbar() {
    return (
        <>
        {/* // Navbar mobile */}
        <nav className=" fixed md:hidden bottom-0 w-full h-[75px] flex items-center justify-between py-5 px-10 bg-darkGrey text-neutralWhite rounded-[20px_20px_0_0]">
            <Link href="/" className="text-2xl hover:text-accentColor">
                <GoHomeFill />
            </Link>
            <Link href="/collections/user" className="text-2xl hover:text-accentColor">
                <CiViewList />
            </Link>
            <Link href="#" className="text-2xl bg-accentColor text-darkGrey rounded-[50%] p-3 hover:bg-thirdColor">
                <LuPlus />
            </Link>
            <Link href="#" className="text-2xl hover:text-accentColor">
                <HiOutlineChartBarSquare />
            </Link>
            <div className="flex flex-row-reverse items-center">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn >
                    <UserButton 
                     appearance={{
                        elements: {
                        //   userButtonAvatarBox: "rounded-full border-2 border-blue-500",
                        },
                      }}/>
                   
                </SignedIn>
            </div>
        </nav>

        
        {/* // Navbar desktop */}
        <nav className=" hidden md:flex  fixed top-0 w-full h-[125px] items-center justify-between py-5 px-10 bg-darkGrey text-neutralWhite ">
            <Link href="/" className="text-2xl hover:text-accentColor">
                <GoHomeFill />
            </Link>
            <Link href="/collections/user" className="text-2xl hover:text-accentColor">
                <p>My collections </p>
            </Link>

            <Link href="#" className="text-2xl hover:text-accentColor">
                My Progress
            </Link>
            <div className="flex flex-row-reverse items-center">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn >
                    <UserButton 
                     appearance={{
                        elements: {
                        //   userButtonAvatarBox: "rounded-full border-2 border-blue-500",
                        },
                      }}/>
                   
                </SignedIn>
            </div>
        </nav>
        </>
        
    );
}

