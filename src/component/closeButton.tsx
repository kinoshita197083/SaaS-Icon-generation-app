import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const CloseButton = () => {
    return (
        <Link href='/'>
            <span className="absolute aspect-square bg-red-500 w-[1.5rem] rounded-full text-transparent hover:text-gray-700 flex justify-center items-center cursor-pointer top-[1%] right-[3%] lg:top-[3%]"><FontAwesomeIcon icon={faXmark} /></span>
        </Link>
    )
}

export default CloseButton
