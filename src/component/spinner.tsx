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
                <div className={''}>
                    <FontAwesomeIcon icon={faSpinner} />
                </div>}
        </>
    )
}

export default Spinner
