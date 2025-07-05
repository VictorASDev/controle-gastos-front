import { useState, useEffect, useRef } from "react";
import sendPost from "../../services/sendPost";
import Button from "../Button";
import Textarea from "../inputs/Textarea";

interface PostModalProps {
    onClose: () => void;
    onPostCreated?: () => void; // Callback para quando um post é criado
}

const PostModal = ({ onClose, onPostCreated }: PostModalProps) => {
    const [postContent, setPostContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Focar no textarea quando o modal abre
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleSubmit = async () => {
        if (!postContent.trim()) {
            setError("O post não pode estar vazio");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await sendPost(postContent);
            console.log("Post enviado com sucesso");
            setPostContent("");
            onPostCreated?.();
            onClose();
        } catch (err) {
            console.error("Erro ao enviar post:", err);
            setError("Erro ao enviar post. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSubmit();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full animate-scale-in">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Criar novo post</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Fechar modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <Textarea
                        ref={textareaRef}
                        value={postContent}
                        onChange={(e) => {
                            setPostContent(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="No que você está pensando?"
                        className="min-h-[120px]"
                        maxLength={280}
                    />

                    <div className="flex justify-between items-center mt-2">
                        <span className={`text-sm ${postContent.length > 250 ? 'text-red-500' : 'text-gray-500'}`}>
                            {postContent.length}/280
                        </span>
                        {error && <span className="text-sm text-red-500">{error}</span>}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <Button
                            onClick={handleSubmit}
                            text={isSubmitting ? "Publicando..." : "Publicar"}
                            className="px-4 py-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;