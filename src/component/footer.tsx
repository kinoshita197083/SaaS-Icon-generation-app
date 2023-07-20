import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="h-[7rem] w-[100%] flex justify-center items-center text-gray-700 flex-col">
            <p>Developed with Love <FontAwesomeIcon className="text-[0.8rem]" icon={faHeart} /> in Melbourne 2023</p>

            <div className="mt-[2%] flex flex-col justify-center items-center">
                <Link href={'/terms-of-service'}>
                    <p className="text-gray-400 text-[0.8rem] font-thin">Terms of Service</p>
                </Link>
                <Link href={'/privacy-policy'}>
                    <p className="text-gray-400 text-[0.8rem] font-thin">Privacy Policy</p>
                </Link>
            </div>

        </footer>
    )
}

export default Footer
