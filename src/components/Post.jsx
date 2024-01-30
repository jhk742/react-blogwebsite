import React from 'react'

export default function Post({ doc }) {
    const {author, title, postText} = doc
    return (
        <div className="container--post">
            <div className="content--wrapper">
                <div className="content--header">
                    <h3>{title}</h3>
                    <p>@{author.name}</p>
                </div>
                <p class="postText">{postText}</p>
                {/* <p>{author.id}</p> */}
            </div>
        </div>
    )
}
