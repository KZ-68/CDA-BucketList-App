import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <nav className="flex justify-between py-4 pr-7 bg-gray-300 text-black text-xl font-bold">
            <Link href="/" className="">
                Home
            </Link>
            <div className="flex flex-row-reverse items-center gap-3">
                <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                    <Link href="/collections/user" className="">
                        My collections
                    </Link>
                </SignedIn>
            </div>
        </nav>
    );
}
