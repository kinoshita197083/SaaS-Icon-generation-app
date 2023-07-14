type PricingBoxProps = {
    plan: string,
    price: string,
    popular?: boolean,
    promotion?: string,
    eachCost?: string
}

const PricingBox = (props: PricingBoxProps) => {

    const { plan, price, popular, promotion, eachCost } = props;

    return (
        <div className='relative w-[23rem] h-[28rem] m-auto'>
            <p className='text-center bg-transparent bg-emerald-500 text-gray-100 absolute left-[50%] top-[-4%] rounded-tr rounded-tl w-full py-[0] translate-x-[-50%]'
                style={{ display: popular ? 'block' : 'none' }}>
                Most Popular
            </p>
            <div role='pricing category'
                className='w-full h-full rounded-[10px] bg-gray-800 p-[6%]'
                style={{ border: popular ? '12px solid rgb(16 185 129)' : '' }}
            >
                <article className='h-full'>
                    <h3 className='text-left text-[1.5rem] text-emerald-500 mb-[10%]'>
                        {plan}
                    </h3>
                    <h4 className='text-[3rem] text-gray-100'>
                        {price}
                    </h4>
                    <p className='text-gray-100 my-[10%]'>
                        As low as {eachCost} per generation
                    </p>
                    <p className='text-emerald-500 bg-gray-900 w-[12rem] text-center rounded border-[0.5px] border-gray-400 mt-[5%]'>
                        {promotion}
                    </p>
                    <button className='btn absolute bottom-[10%] left-[50%] translate-x-[-50%]' style={{ background: 'rgb(16 185 129)' }}>
                        Get Started
                    </button>
                </article>
            </div>
        </div>
    )
}

export default PricingBox
