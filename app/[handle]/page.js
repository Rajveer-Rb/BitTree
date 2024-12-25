import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {

    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bitTree");
    const collection = db.collection("links");

    const item = await collection.findOne({ handle: handle });
    if (!item) {
        return notFound()
    }

    return <div className="flex min-h-screen bg-[#e42c4d] justify-center items-start py-10">

        <Link href="/"><img className="h-6 absolute left-8 top-8" src="/logo2.svg" alt="" /></Link>

        <div className="profile flex flex-col gap-3 justify-center items-center my-20 md:my-0">
            <div className="bg-slate-400 h-[10vw] rounded-[100%] px-10 border border-gray-200 border-solid  flex justify-center items-center">
                <img className="h-32" src={item.pic} alt="" />
            </div>
            <span>@{handle}</span>
            <span className="desc w-80 text-center">{item.desc}</span>

            <div className="links w-full">
                {item.links.map((item, idx) => {
                    return <Link key={idx} href={item.link}><div className="flex justify-center items-center w-full px-4 py-3 bg-white rounded-md my-3 shadow-md md:min-w-[20vw] border border-gray-200 hover:scale-105 transition-transform">
                        <p>{item.linktext}</p>
                    </div></Link>
                })}
            </div>

        </div>

    </div>

}