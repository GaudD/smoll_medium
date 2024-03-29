import { SignupInput } from "@gaud001/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const nav = useNavigate()
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password:""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,
            postInputs)
            const jwt = response.data
            localStorage.setItem("authorization", "Bearer " + jwt.jwt)
            nav("/blogs")
            if(type=="signin"){
                toast.success("Signed in successfully !")
            }
            else if (type == "signup") {
                toast.success("Signed up successfully !")
            }
        } catch (e) {
            if(type=="signin"){
                toast.error("Invalid Credentials")
            }
            else if (type == "signup") {
                toast.error("Email alredy in use")
            }
            console.log("Error 404 not Found");            
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="flex flex-col px-10">
                    <div className="font-extrabold text-3xl text-center px-10">
                        Create an Account
                    </div>
                    <div className="text-slate-400 text-center mt-2 mb-2">
                        {type == "signup" ? "Already have an account?" : "Don't have an Account?"}
                        <Link to={type == "signin" ? "/signup" : "/signin"} className="underline underline-offset-2 ml-1">{type == "signin" ? "Signup" : "Login"}</Link>
                    </div>
                    {type == "signup" ?<Input label="Name" placeholder="User" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value
                      })  
                    }}/>:null}
                    <Input label="Username" placeholder="abc@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                    <Input label="Password" type="password" placeholder="xyz123" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 mt-3.5 ">{type == "signin" ? "Login" : "Signup"}</button>
                    
                </div>
            </div>

        </div>
    )
}

interface LabelInput {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

const Input = ({label, placeholder, onChange, type}:LabelInput) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-black mt-2 ">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder={placeholder} required />
        </div>
    )
}
