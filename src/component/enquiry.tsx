import React, { useState } from 'react'
import FormLabel from './formLabel';


const inputCSS = 'mt-[1%] mb-[8%] h-[2.5rem] w-full text-gray-200 lg:text-[1.5rem] px-[2%] outline-gray-800 bg-transparent border-b border-white';

const EnquiryForm = () => {

    const [request, setRequest] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    const updateRequest = (key: string, value: string | boolean | number | string[]) => {
        setRequest(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = async () => {
        // setLoading(true);
        // await fetch(url, {
        //     method: 'POST',
        //     header: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         posterName: userName.value,
        //         posterEmail: email.value,
        //         postMsg: message.value
        //     })
        // });
        // return response
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormLabel
                label="Name"
            />
            <input
                className={inputCSS}
                value={request.name}
                onChange={e => updateRequest('name', e.target.value)}
            />
        </form>
    )
}

export default EnquiryForm
