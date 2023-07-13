import React, { useState } from "react";

type ReadMoreProps = {
    children: string,
    cutoff: number,
}

const ReadMore = ({ children, cutoff }: ReadMoreProps) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text-gray-400">
            {isReadMore ? text?.slice(0, cutoff) : text}
            <span onClick={toggleReadMore} className="mt-[5%] text-right cursor-pointer text-white block">
                {isReadMore ?
                    "read more"
                    :
                    " show less"}
            </span>
        </p>
    );
};

export default ReadMore;