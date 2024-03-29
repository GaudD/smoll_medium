import { useMemo, useState } from "react";
import { useBlogs } from "../chooks"
import { BlogCard } from "../components/BlogCard"
import { Skelly } from "../components/Skelly";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const UserBlogs = () => {
    const { loading, blogs } = useBlogs();
    const [uid, setUid] = useState("")

    useMemo(() => {
        function uname() {
            axios.get(`${BACKEND_URL}/api/v1/blog/user`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("authorization"),
                    }
            })
                .then((res) => {
                    setUid(res.data.uid)
                }).catch(error => {
                console.error(error);
            })
            
        }
        uname()
    },[])

    if (loading) {
        return (<div className="flex flex-col items-center">
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
            <div className="flex justify-center flex-col">
                {blogs.filter(blogs => blogs.author.id === uid).map(blog =>
                    <BlogCard id={blog.id} title={blog.title} authorName={blog.author.name} published="23rd Jan 2024" content={blog.content} />
                )}
            </div>
        </div>
    )
}