import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const Publish = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                
                <div className="max-w-screen-lg w-full pt-2">
                    <textarea onChange={(x) => {
                        setTitle(x.target.value)
                    }} placeholder="Your Blog Title"
                        className="peer w-full resize-none border-b border-blue-gray-200 bg-transparent pt-4 font-sans text-3xl font-extrabold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50">
                    </textarea>
                    <textarea onChange={(x) => {
                        setContent(x.target.value)
                    }} placeholder="Your Content goes here"
                        className="peer w-full min-h-96 resize-none border-b border-blue-gray-200 bg-transparent pt-4 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50">
                    </textarea>
                    <button
                        onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content
                            }, {
                                headers: {
                                    "Authorization": localStorage.getItem("authorization"),
                                } 
                            });
                            navigate(`/blog/${res.data.id}`)
                            toast.success("Blog Published!")
                        }}
                        className="mt-4 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                    >
                        Publish
                    </button>

                </div>

            </div>
        </div>    
    )
}