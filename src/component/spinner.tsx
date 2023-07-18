import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

type SpinnerProps = {
    isLoading: boolean
}

const Spinner = (props: SpinnerProps) => {

    const { isLoading } = props;

    return (
        <>
            {isLoading &&
                <FontAwesomeIcon icon={faSpinner} className='loading' />}
        </>
    )
}

export default Spinner
