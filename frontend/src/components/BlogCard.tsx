import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    published: string,
    id:string
}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    published }: BlogCardProps) => {
            
        
        const fn = authorName==null? "Anonymous": authorName.split(' ')[0]
        const sn = authorName==null? " ": authorName.split(' ')[1]
    
        let n = fn
        if (sn != null) {
            n+=" "+sn[0]+"."
        }
    
    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b border-slate-200 p-4 cursor-pointer">
                <div className="flex gap-1.5">
                    
                    <Avatar authorName={authorName} />

                    <div className="font-light text-sm scroll-mt-0.5 flex flex-col justify-center">
                        {n}
                    </div>
                    <div className="text-xs mt-2.5">
                        <Circle/>
                    </div>
                    <div className="font-thin text-slate-400 text-sm flex flex-col justify-center">
                        {published}
                    </div>
                </div>
                <div className="text-xl font-bold my-1">
                    {title}
                </div>
                <div className="font-normal">
                    {content.slice(0,100) + "..."}
                </div>
                <div className="text-slate-400 font-light text-sm pt-5">
                    {`${Math.ceil(content.length/100)} min read`}
                </div>
            </div>
        </Link>
    )
}

const Circle = () => {
    return (
        <div className="w-1 h-1 rounded-full bg-slate-500">
        </div>
    )
}


export const Avatar = ({ authorName, size = "small" }: { authorName: string , size ?: "small" | "big"}) => {
    

    const fn = authorName==null ? "A" : authorName.split(' ')[0]
    const sn = authorName==null ? " " : authorName.split(' ')[1]

    let n = fn=="A"? "A": fn[0]
    if (sn != null) {
        n+=sn[0]
    }

    return (
        <div className={`relative inline-flex items-center justify-center ${ size == "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`${ size == "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{n}</span>
        </div>
    )
}