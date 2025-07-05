import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFollows } from "../services/getFollows";
import type User from "../types/user";
import { postFollow } from "../services/postFollow";
import { getUser } from "../services/getUser";
import { getProfile } from "../services/getProfile";
import { unfollow } from "../services/unfollow";
import Post from "../components/post/Post";

const ProfileDetail = () => {
    const { username } = useParams<string>();
    const [currentUser, setCurrentUser] = useState<User>();
    const [profileUser, setProfileUser] = useState<User>();
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");


    useEffect(() => {
        const fetchFollows = async () => {
            if (!profileUser?.username) {
                return;
            }
            try {
                const data = await getFollows(profileUser.username);
                console.log("follows fetched:", data);
            } catch (error) {
                sessionStorage.removeItem("token");
                console.error("Erro ao buscar seguidos:", error);
            }
        };
        fetchFollows();
    }, [username]);

    useEffect(() => {
        const fetchProfile = async () => {
            if(!username) {
                return;
            }
            try {
                const data = await getProfile(username);
                console.log("Profile fetched:", data);
                setProfileUser(data);
            } catch (error) {
                sessionStorage.removeItem("token");
                console.error("Erro ao buscar seguidos:", error);
            }
        };
        fetchProfile();
    }, [username]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if(!username) {
                return;
            }
            try {
                const data = await getUser();
                console.log("User fetched:", data);
                setCurrentUser(data);
            } catch (error) {
                sessionStorage.removeItem("token");
                console.error("Erro ao buscar seguidos:", error);
            }
        };
        fetchCurrentUser();
    }, [username]);

    useEffect(() => {
        if (
            currentUser?.username &&
            profileUser?.username &&
            currentUser.following.some(f => f.username === profileUser.username)
        ) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [currentUser, profileUser]);

    const handleFollow = async () => {
        if (!username) return;
        try {
            await postFollow(username);
            setIsFollowing(true);
        } catch (error) {
            console.error("Failed to follow user:", error);
        }
    };

    const handleUnfollow = async () => {
        if(!username) return;
        try {
            await unfollow(username);
            setIsFollowing(false);
        }
        catch(error) {
            console.error("Failed to follow user:", error);
        }
    };

    const isOwnProfile = username === currentUser?.username;    
    
    return (
        <div className="min-h-screen bg-gray-50">            
            {/* Cabeçalho do perfil */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative bg-white rounded-xl shadow-sm mt-6 overflow-hidden">
                    {/* Banner */}
                    <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                    
                    {/* Seção de informações do usuário */}
                    <div className="px-6 pb-6 relative">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between">
                            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-6xl shadow-lg">
                                    {username?.[0]?.toUpperCase() ?? "U"}
                                </div>
                                <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                                    <h1 className="text-2xl font-bold text-gray-900">{profileUser?.username}</h1>
                                    <p className="text-gray-600">Designer & Fotógrafo</p>
                                </div>
                            </div>
                            
                            {/* Botões de ação */}
                            <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end space-x-3">
                                {!isOwnProfile ? (
                                    isFollowing ? (
                                        <button
                                            onClick={handleUnfollow}
                                            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm flex items-center"
                                        >
                                            <span>Seguindo</span>
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleFollow}
                                            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-200 shadow-sm flex items-center"
                                        >
                                            <span>Seguir</span>
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    )
                                ) : (
                                    <button className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm">
                                        Editar perfil
                                    </button>
                                )}
                                <button className="p-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        {/* Bio */}
                        <div className="mt-6 text-gray-700 max-w-2xl">
                            <p>Designer digital apaixonado por criar experiências incríveis. Amante de fotografia, viagens e café. Trabalhando na @empresa.</p>
                        </div>
                        
                        {/* Estatísticas */}
                        <div className="mt-6 flex space-x-8">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900">{profileUser?.followers.length}</span>
                                <span className="text-sm text-gray-500">Seguidores</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900">{profileUser?.following.length}</span>
                                <span className="text-sm text-gray-500">Seguindo</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900">{profileUser?.posts.length}</span>
                                <span className="text-sm text-gray-500">Posts</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Abas de navegação */}
                    <div className="border-t border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("posts")}
                                className={`px-6 py-4 text-sm font-medium ${activeTab === "posts" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                Posts
                            </button>
                            <button
                                onClick={() => setActiveTab("likes")}
                                className={`px-6 py-4 text-sm font-medium ${activeTab === "likes" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                Curtidas
                            </button>
                            <button
                                onClick={() => setActiveTab("saved")}
                                className={`px-6 py-4 text-sm font-medium ${activeTab === "saved" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                            >
                                Salvos
                            </button>
                        </nav>
                    </div>
                </div>
                
                {/* Conteúdo das abas */}
                <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden p-6">
                    {activeTab === "posts" && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Posts recentes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Placeholder para posts */}
                                {profileUser?.posts.slice().reverse().map((post) => (
                                    <Post key={post.tweetId} tweetId={post.tweetId} username={profileUser.username} 
                                    content={post.content} creation={post.creationTimeStamp} 
                                    onClick={() => {
                                        console.log(post.creationTimeStamp)
                                    } } ></Post>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === "likes" && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Publicações curtidas</h3>
                            <p className="text-gray-500">Nenhuma publicação curtida ainda.</p>
                        </div>
                    )}
                    {activeTab === "saved" && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Publicações salvas</h3>
                            <p className="text-gray-500">Nenhuma publicação salva ainda.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;