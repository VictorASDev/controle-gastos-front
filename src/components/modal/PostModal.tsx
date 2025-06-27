import sendPost from "../../services/sendPost";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";

interface PostModalProps {
    onClose: () => void;
}

const PostModal = ({ onClose }: PostModalProps) => {
    const [post, setPost] = useState<string>("");

    const fetchData = async () => {
        try {
            const res = await sendPost(post);
            console.log("Post enviado com sucesso:", res);
            setPost(""); 
            onClose(); 
        } catch (err) {
            console.error("Erro ao enviar post:", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Post</h2>
                <Input onSubmit={setPost} onChange={setPost} type="text" placeholder="Digite seu post..." />
                <div className="flex justify-around items-center mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                    <Button onClick={fetchData} text="Enviar" />
                </div>
            </div>
        </div>
    );
};

export default PostModal;