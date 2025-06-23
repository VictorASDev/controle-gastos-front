const ErrorModal = ({ message, onClose }: { message: string; onClose: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Erro</h2>
                <p className="mb-4">{message}</p>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default ErrorModal;