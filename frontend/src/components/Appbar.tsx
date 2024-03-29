import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"

export const Appbar = () => {

    const [name, setName] = useState("")

    useEffect(() => {
        function uname() {
            axios.get(`${BACKEND_URL}/api/v1/blog/user`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("authorization"),
                    }
            })
                .then((res) => {
                    console.log(res.data);
                    setName(res.data.data.name)
                }).catch(error => {
                console.error(error);
                
            })
            
        }
        uname()
    },[])

    return (
        <div className="border w-full flex justify-between px-8 py-4">
            <Link to="/blogs">
                <div className="font-semibold flex flex-col justify-center cursor-pointer mt-2 text-2xl">
                    Medium
                </div>
            </Link>
            <div className="w-25% flex justify-between">
                <Link to={"/publish"}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
                </Link>
                <Link to={"/profile"}>
                    <Avatar size="big" authorName={name} />
                </Link>
            </div>
        </div>
    )
}