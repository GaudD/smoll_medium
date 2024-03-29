import { Blog } from "../chooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:Blog}) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center pt-4">
                <div className="grid grid-cols-12 px-10 w-full max-w-screen-2xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="pt-2 text-gray-600">
                            Posted on XX XX 2024
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 flex flex-col">
                        <div className="text-lg font-semibold">
                            Author
                        </div>
                        <div className="pt-4 flex">
                            <Avatar authorName={blog.author.name} size="big" />
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold pl-4 pt-1">
                                    {blog.author.name || "Anonymous"}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}