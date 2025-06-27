import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { getPosts } from "../services/getPosts";
import { useEffect, useState } from "react";

const Profile = () => {
    const navigate = useNavigate();
    const [feed, setFeed] = useState<any[]>([]);

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

    return (
        <div className="">
            <Header />
            {feed.length === 0 ? (
                <div className="text-center text-surface mt-10">Nenhum post encontrado.</div>
            ) : (
                feed.map((post) => (
                    <div key={post.tweetId} className="bg-red-900 text-yellow-200 m-4 p-4 rounded">
                        <h2 className="font-bold">{post.username}</h2>
                        <p className="post-content">{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Profile;