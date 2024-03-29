import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string,
    title: string,
    id: string,
    author: {
        name: string,
    },
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [error, setError] = useState(null); // Added an error state

    useEffect(() => {        
        axios.get(`${BACKEND_URL}/api/v1/blog/single/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("authorization"),
            }            
        }).then(res => {
            console.log("Raw response:", res);
            setBlog(res.data);
            setLoading(false);
        }).catch(error => {
            setError(error); // Set error state
            console.error("Error fetching blog:", error);

            setLoading(false);
        });
    }, [id]);
    
    return {
        loading,
        blog,
        error // Include error in the return object if you want to handle it outside
    };
};

export const useBlogs = () => {

    interface Blogs {
        "content": string,
        "title": string,
        "id": string,
        "published": string,
        "author": {
            "name": string,
            "id": string
        }
        
    }
    
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("authorization")
            }
        }).then(
            res => {
                setBlogs(res.data)
                setLoading(false)
            }
            
        )
            , []
    })
    
    return {
        loading,
        blogs
    }
}