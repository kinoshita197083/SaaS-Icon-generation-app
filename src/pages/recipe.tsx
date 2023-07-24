import { NextPage } from 'next'
import Link from 'next/link'
import RecipeSection from '../component/recipe'
import { recipes } from '../material/recipes'
import Head from 'next/head'

const Recipe: NextPage = () => {


    return (
        <>
            <Head>
                <title>Icon Recipe - Imagin</title>
                <meta name='description' content='Explore our icon recipe to boost your imagination further. Find the perfect icons for your projects.' />
                <meta name='robots' content='index, follow' />
                <link rel="icon" href="logo_bulb.png" />
            </Head>

            <div className='min-h-[100vh] p-[8%] pt-[18%] lg:pt-[8%] md:pt-[8%] lg:px-[15%] md:px-[10%] px-[2%]'>
                <h1 className='lg:text-6xl md:text-5xl text-4xl font-thin lg:mb-[8%] md:mb-[6%] mb-[15%] animate-fadein '>Prompt Recipes</h1>

                {
                    recipes.map(recipe => {
                        return (
                            <RecipeSection
                                key={recipe.id}
                                prompt={recipe.prompt}
                                style={recipe.style}
                                color={recipe.color}
                                imageSrc={recipe.image}
                                reverse={recipe.id % 2 === 0}
                            />
                        )
                    })
                }


                <div className='flex justify-center items-center mt-[8%]'>
                    <Link href={'/prompt-engineer'}>
                        <button type='button' className='btn'>Learn more about prompt</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Recipe
