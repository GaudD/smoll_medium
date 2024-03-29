import { useBlogs } from "../chooks"
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skelly } from "../components/Skelly";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (<div className="flex flex-col items-center">
            <Appbar></Appbar>
            <div className="flex justify-center flex-col">
                <Skelly />
                <Skelly/>
                <Skelly/>
                <Skelly/>
                <Skelly/>
                
            </div>
        </div>
        )
    }
    return (
        <div className="flex flex-col items-center min-w-screen">
            <Appbar></Appbar>
            <div className="flex justify-center flex-col">
                {blogs.map(blog =>
                    <BlogCard id={blog.id} title={blog.title} authorName={blog.author.name} published="23rd Jan 2024" content={blog.content} />
                )}
            </div>
        </div>
    )
}