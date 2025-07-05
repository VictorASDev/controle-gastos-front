import { useState, useRef, useEffect } from "react";
import PostModal from "../modal/PostModal";

interface DropdownProps {
    className?: string;
    onClose?: () => void;
}

const Dropdown = ({ className, onClose }: DropdownProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handlePostClick = () => {
        setIsModalOpen(true);
        onClose?.();
    };

    return (
        <>
            <div 
                ref={dropdownRef}
                className={`absolute top-14 right-4 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col w-48 py-1 z-30 animate-fade-in ${className || ""}`}
            >
                <ul className="flex flex-col text-gray-800 text-sm">
                    <DropdownItem 
                        icon={
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        }
                        onClick={handlePostClick}
                    >
                        Criar post
                    </DropdownItem>
                    <DropdownItem 
                        icon={
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        onClick={() => console.log("Configurações clicado")}
                    >
                        Configurações
                    </DropdownItem>
                    <DropdownItem 
                        icon={
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        }
                        onClick={() => {
                            console.log("Sair clicado");
                            // Adicione lógica de logout aqui
                        }}
                    >
                        Sair
                    </DropdownItem>
                </ul>
            </div>

            {isModalOpen && (
                <PostModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

// Componente auxiliar para itens do dropdown
interface DropdownItemProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const DropdownItem = ({ children, icon, onClick }: DropdownItemProps) => {
    return (
        <li
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
            onClick={onClick}
        >
            {icon}
            <span>{children}</span>
        </li>
    );
};

export default Dropdown;