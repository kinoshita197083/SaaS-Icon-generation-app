import { NextPage } from "next"
import Collection from "~/component/collection"

const Generate: NextPage = () => {
    return (
        <div className="bg- h-[100vh] p-[8%]">
            <section className="bg-gradient-to-r from-violet-500 to-blue-500 background-position: center rounded-[25px]">
                <Collection collectionName="Generate">
                    <form>
                        <div className="">
                            <label>Describe your icon</label><br />
                            <input></input>
                        </div>
                        <div className="">
                            <label>Describe your icon</label><br />
                            <input></input>
                        </div>
                        <div className="">
                            <label>Describe your icon</label><br />
                            <input></input>
                        </div>
                    </form>
                </Collection>
            </section>
        </div>
    )
}

export default Generate
