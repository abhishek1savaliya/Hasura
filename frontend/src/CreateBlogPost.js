import { useMutation } from "@apollo/client";
import { BLOG_POSTS, INSERT_BLOG_POST } from "./queries";

export const CreateBlogPost = () => {

    let titleInput, contentInput
    const [insertPost] = useMutation(INSERT_BLOG_POST)

    return (
        <form
            className="flex flex-col"
            onSubmit={e => {
                e.preventDefault();
                insertPost({
                    variables: {
                        title: titleInput.value,
                        content: contentInput.value
                    },
                    refetchQueries: [{
                        query: BLOG_POSTS
                    }]
                });
                titleInput.value = '';
                contentInput.value = '';
            }}
        >
            <h2 className="text-xl font-semibold mb-4">Create a new post</h2>

            <input
                className="text-base p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter your title"
                ref={i => (titleInput = i)}
            />

            <textarea
                className="font-sans p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your post here..."
                ref={i => (contentInput = i)}
            ></textarea>

            <button
                className="h-8 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                type="submit"
            >
                Submit
            </button>
        </form>

    )
}
