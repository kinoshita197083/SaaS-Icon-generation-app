import styles from './poster.module.css';

type PosterProps = {
    heading?: string,
    src?: string,
    alt?: string
}

const Poster = (props: PosterProps) => {

    const { src, alt } = props;

    return (
        <section className={[styles.poster, 'max-w-full]'].join(' ')}>
            <div className='relative'>
                <img className={styles.portrait} src={'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e53552ff5fa1a9d22f727e2_peep-35.svg'} alt={alt} />
                <img className={styles.portrait} src={'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535652f5fa1ac5ecf7d744_peep-40.svg'} alt={alt} />
                <img className={styles.portrait} src={'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e53578d550b76b873f53c46_peep-51.svg'} alt={alt} />
                <img className={styles.portrait} src={'https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5357a8c992500f5fc84f40_peep-52.svg'} alt={alt} />
            </div>

            <article className={['text-left', 'lg:px-[18%] lg:py-[5%] px-[5%] py-[5%]'].join(' ')}>
                <h2 className={styles.posterHeading}><span>Img</span>aginations</h2>
                <p className={styles.posterParagraph}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                <p className={styles.posterParagraph}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                <p className={styles.posterParagraph}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
            </article>
        </section>
    )
}

export default Poster
