type PricingBoxProps = {
    plan: string,
    price: string,
    credits: string,
    popular?: boolean,
    promotion?: string,
    eachCost?: string,
    handleClick?: () => void
}

const PricingBox = (props: PricingBoxProps) => {

    const { plan, price, credits, popular, promotion, eachCost, handleClick } = props;

    return (
        <div className='relative w-[20rem] h-[28rem] m-auto'>
            <p className='text-center bg-transparent text-gray-100 text-2xl absolute left-[50%] top-[-5%] lg:top-[-8%] rounded-tr rounded-tl w-full py-[0] translate-x-[-50%]'
                style={{ display: popular ? 'block' : 'none' }}>
                Most Popular
            </p>
            <div role='pricing category'
                className='w-full h-full rounded-[10px] bg-gray-800 p-[6%]'
                style={{ border: popular ? '12px solid rgb(38, 132, 247)' : '' }}
            >
                <article className='h-full'>
                    <h3 className='text-left text-[1.5rem] mb-[10%]' style={{ color: 'rgb(38, 132, 247)' }}>
                        {plan}
                    </h3>
                    <h4 className='text-[3rem] text-gray-100'>
                        {price}
                    </h4>
                    <h3 className="text-[1.7rem] font-thin text-gray-100">
                        for {credits} credits
                    </h3>
                    <p className='text-gray-100 font-thin my-[10%]'>
                        As low as {eachCost} per generation
                    </p>
                    <p className='text-gray-200 bg-gray-900 w-[12rem] text-center rounded border-[0.5px] border-gray-400 mt-[5%]'>
                        {promotion}
                    </p>


                    <button className='btn absolute bottom-[10%] left-[50%] translate-x-[-50%]'
                        style={{ background: 'rgb(38, 132, 247)' }}
                        onClick={handleClick}>
                        Get Started
                    </button>
                </article>
            </div>
        </div>
    )
}

export default PricingBox
