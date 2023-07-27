type PricingBoxProps = {
    plan: string,
    price: string,
    credits: string,
    popular?: boolean,
    promotion?: string,
    eachCost?: string,
    saving?: string
    handleClick?: () => void
}

const PricingBox = (props: PricingBoxProps) => {

    const { plan, price, credits, popular, promotion, eachCost, saving, handleClick } = props;

    return (
        <div className={['relative w-full md:w-[70%] lg:w-[35%] lg:h-[30rem] md:h-[40rem] h-[30rem] m-auto border-gray-500 border rounded-[10px]', popular ? 'lg:h-[33rem] md:h-[40rem] h-[33rem] lg:w-[40%] md:w-[70%] rounded-[12px]' : null].join(' ')}>
            <div role='pricing category'
                className={['w-full h-full rounded-[inherit] p-[6%]', popular ? 'bg-gray-800' : 'bg-gray-900'].join(' ')}
            >
                <article className='h-full text-center'>
                    <h3 className='text-center text-[1.5rem] mb-[6%] text-blue'>
                        {plan}
                    </h3>
                    {
                        popular &&
                        <h4 className="text text-[1.2rem] w-[50%] text-white mx-auto mb-[1%] rounded bg-gradient-to-r from-sky-500 to-indigo-500">
                            {saving || 'test'} SAVINGS
                        </h4>
                    }
                    <h4 className='text-[3rem] text-center text-gray-100'>
                        {price}
                    </h4>
                    <h3 className="text-[1.7rem] text-center font-thin text-gray-100">
                        {credits} credits
                    </h3>
                    <p className='text-gray-100 text-center font-thin my-[10%]'>
                        As low as {eachCost} per generation
                    </p>
                    <p className='text-gray-200 bg-gray-900 w-[12rem] text-center mx-auto rounded border-[0.5px] border-gray-400 mt-[5%] animateCharacter'>
                        {promotion}
                    </p>


                    <button className='w-[80%] py-[3.5%] text-[1.2rem] text-gray-100 rounded absolute bottom-[10%] left-[50%] translate-x-[-50%] bg-gradient-to-r from-sky-500 to-indigo-500'
                        onClick={handleClick}>
                        Get Started
                    </button>
                </article>
            </div>
        </div>
    )
}

export default PricingBox
