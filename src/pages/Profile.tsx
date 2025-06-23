import { getPosts } from "../services/getPosts";
import { useEffect, useState } from "react";

const Profile = () => {
    const [feed, setFeed] = useState<any[]>([]);

    console.log("Estado atual do feed:", feed); // Isso será logado em cada renderização

    useEffect(() => {
        getPosts().then((data) => {
            console.log("Dados recebidos:", data);
            setFeed(data.feedItens);
            console.log("Dados completos recebidos:", JSON.stringify(data));
        });
    }, []); 

    return (
        <div className="">
            {feed.length == 0 ? (
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