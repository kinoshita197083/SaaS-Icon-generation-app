import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RecipeSection from '../component/recipe'
import { recipes } from '../material/recipes'

const Recipe: NextPage = () => {


    return (
        <div className='min-h-[100vh] p-[8%] pt-[18%] lg:pt-[8%] md:pt-[8%] lg:px-[15%] md:px-[10%] px-[2%]'>
            <h1 className='lg:text-6xl md:text-5xl text-4xl font-thin lg:mb-[8%] md:mb-[6%] mb-[15%] animate-fadein '>Prompt Recipes</h1>

            {
                recipes.map(recipe => {
                    return (
                        <RecipeSection
                            key={recipe.id}
                            prompt={recipe.prompt}
                            style={recipe.style}
                            imageSrc={recipe.image}
                            reverse={recipe.id % 2 === 0}
                        />
                    )
                })
            }


            <div className='flex justify-center items-center mt-[8%]'>
                <Link href={'/recipe'}>
                    <button type='button' className='btn'>Learn more about prompt</button>
                </Link>
            </div>
        </div>
    )
}

export default Recipe
