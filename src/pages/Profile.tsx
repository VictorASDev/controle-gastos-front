import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { getPosts } from "../services/getPosts";
import { useEffect, useState } from "react";
import type User from "../types/user";
import { getUser } from "../services/getUser";

const Profile = () => {
    const navigate = useNavigate();
    const [feed, setFeed] = useState<any[]>([]);
    const [user, setUser] = useState<User>();
    const [activeTab, setActiveTab] = useState("forYou");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                console.log("Posts fetched:", data);
                setFeed(data.feedItens ?? []);
            } catch (error) {
                sessionStorage.removeItem("token");
                setFeed([]);
                console.error("Erro ao buscar posts:", error);
                navigate("/login");
            }
        };
        fetchPosts();
    }, [navigate]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUser();
                setUser(res);        
            } catch(err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    const goToProfileDetail = (username: string) => {
        navigate(`/profile/${username}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <div 
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl cursor-pointer"
                            onClick={() => goToProfileDetail(user?.username || "")}
                        >
                            {user?.username?.[0]?.toUpperCase() ?? "U"}
                        </div>
                        <div>
                            <h2 
                                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
                                onClick={() => goToProfileDetail(user?.username || "")}
                            >
                                {user?.username || "usuário"}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <nav className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab("forYou")}
                            className={`px-6 py-4 text-sm font-medium flex-1 text-center ${activeTab === "forYou" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                        >
                            Para você
                        </button>
                        <button
                            onClick={() => setActiveTab("following")}
                            className={`px-6 py-4 text-sm font-medium flex-1 text-center ${activeTab === "following" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                        >
                            Seguindo
                        </button>
                    </nav>
                </div>

                <div className="space-y-4">
                    {feed.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum post encontrado</h3>
                            <p className="mt-1 text-gray-500">Quando você seguir pessoas ou criar posts, eles aparecerão aqui.</p>
                        </div>
                    ) : (
                        feed.map((post) => (
                            <div
                                key={post.tweetId}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => navigate(`/post/${post.tweetId}`)}
                            >
                                <div className="p-5">
                                    <div 
                                        className="flex items-center space-x-3 mb-3"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            goToProfileDetail(post.username);
                                        }}
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
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;