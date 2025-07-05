import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { getPosts } from "../services/getPosts";
import { useEffect, useState } from "react";
import type User from "../types/user";
import { getUser } from "../services/getUser";
import Post from "../components/post/Post";

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
                            <Post key={post.tweetId} tweetId={post.tweetId} username={post.username} 
                            content={post.content} creation={post.creation} 
                            onClick={(e) => {
                                e.stopPropagation();
                                goToProfileDetail(post.username);
                            } } ></Post>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;