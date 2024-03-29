import { useMemo, useState } from "react"
import { Appbar } from "../components/Appbar"
import { UserBlogs } from "../components/UserBlogs"
import { BACKEND_URL } from "../config"
import axios from "axios"


export const Profile = () => {
    
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")

    useMemo(() => {
        function uname() {
            axios.get(`${BACKEND_URL}/api/v1/blog/user`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("authorization"),
                    }
            })
                .then((res) => {
                    setName(res.data.data.name)
                    setMail(res.data.data.email)
                }).catch(error => {
                console.error(error);
            })
            
        }
        uname()
    },[])

    return (
        <div className="flex flex-col">
            <Appbar />
            <div className="min-w-full bg-slate-100 h-48 border-b-2 gird grid-cols-10 flex">
                <div className="flex flex-col justify-center col-span-2 bg-transparent w-[20%] border-r-2 border-slate-300">
                    <div className="flex flex-col justify-center">
                        <div className="flex justify-center">
                            <Avatar authorName="Gaurav"/>
                        </div>
                    </div>
                </div>
                <div className="col-span-8 w-[80%] flex flex-col justify-center ml-16">
                    <div className="my-6 text-lg">
                        Name :  { name }
                    </div>
                    <div className="mb-6 text-lg">
                        Email :  { mail }
                    </div>
                </div>
            </div>
            <UserBlogs/>
        </div>
    )
}


const Avatar = ({ authorName }: { authorName: string }) => {
    

    const fn = authorName==null ? "A" : authorName.split(' ')[0]
    const sn = authorName==null ? " " : authorName.split(' ')[1]

    let n = fn=="A"? "A": fn[0]
    if (sn != null) {
        n+=sn[0]
    }

    return (
        <div className={`relative inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`text-3xl text-gray-600 dark:text-gray-300`}>{n}</span>
        </div>
    )
}