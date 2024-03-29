import { useParams } from "react-router-dom";
import { useBlog } from "../chooks";
import { Appbar } from "../components/Appbar";
import { Skelly } from "../components/Skelly";
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {

    const { id }=useParams()

    const { loading, blog } = useBlog({
        id : String(id)
    });

    if (loading || !blog) {
        return (<div className="flex flex-col items-center">
            <Appbar></Appbar>
            <div className="flex justify-center flex-col">
                <Skelly/>
                <Skelly/>
                <Skelly/>
                <Skelly/>
                <Skelly/>
            </div>
        </div>
        )
    }
    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}