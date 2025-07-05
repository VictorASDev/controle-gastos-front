import { useNavigate } from "react-router-dom";

interface PostProps {
    tweetId: number,
    username: string,
    content: string,
    creation: Date
    onClick: (e: any) => void;
}

const Post = (post: PostProps) => {
    const navigate = useNavigate();

    return (
        <div
            key={post.tweetId}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/post/${post.tweetId}`)}
        >
            <div className="p-5">
                <div 
                    className="flex items-center space-x-3 mb-3"
                    onClick={(post.onClick)}
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {post.username?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {post.username}
                    </span>
                </div>
                <p className="text-gray-800 mb-4">{post.content}</p>
                
                <div className="flex items-center justify-between text-gray-500 text-sm">
                    <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>42</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>156</span>
                    </button>
                    <span className="text-gray-400">{new Date(post.creation).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}
export default Post;