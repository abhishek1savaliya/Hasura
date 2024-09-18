import { useMutation } from "@apollo/client";
import React from "react";
import { BLOG_POSTS, SET_BLOG_POST_PUBLISHED } from "./queries";

export const BlogPost = ({ blogPost }) => {

  const [setBlogPostPublished] = useMutation(SET_BLOG_POST_PUBLISHED)

  const onSetPublish = (published) => {
    setBlogPostPublished({
      variables: {
        id: blogPost.id,
        published
      },
      refetchQueries: [{
        query: BLOG_POSTS
      }]
    })
  }

  let postedBy = ""
  if (blogPost.user?.name) postedBy = "by " + blogPost.user?.name
  else if (blogPost.user_id) postedBy = "by " + blogPost.user_id

  return (
    <div className="border-2 border-black rounded-md p-4 mt-4">
      <h2 className="text-xl font-semibold">{blogPost.title}</h2>
      <h4 className="text-sm text-gray-600">{new Date(blogPost.date).toDateString()} {postedBy}</h4>
      <p className="mt-2">{blogPost.content}</p>

      {
        blogPost.is_published
          ? (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onSetPublish(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Unpublish
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => onSetPublish(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Publish
              </button>
            </div>
          )
      }

      <div className="text-xs italic text-gray-500 mt-4">
        {blogPost.activities.map(a => (
          <p key={a.id}>{a.type} {new Date(a.date).toDateString()}</p>
        ))}
      </div>
    </div>
  )
}