import { useState } from "react";
import PostModal from "../modal/PostModal";

interface DropdownProps {
    className?: string;
}

const Dropdown = (props: DropdownProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`absolute top-20 right-6 bg-surface rounded-lg shadow-lg flex flex-col w-1/2 h-1/2 z-20 p-4 ${props.className || ""}`}>
                <ul className="flex flex-col items-start justify-start text-text font-text p-2 gap-3">
                    <li
                        className="cursor-pointer hover:bg-accent px-2 py-1 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Postar
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {isModalOpen && (
                <PostModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};
export default Dropdown;