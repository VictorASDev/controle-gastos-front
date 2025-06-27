import Button from "../components/Button";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/signup";
import { useState } from "react";
import ErrorModal from "../components/modal/ErrorModal";
import StarsFieldProvider from "../components/section/StarsFieldProvider";



const SignUp = () => {

    async function handleSubmit(username: string, password: string) {
        signup(username, password).then(() => {
            navigate("/login");
        }).catch(() => {
            setIsModalOpen(true);
        });

    }  

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex-col rounded  w-11/12 h-full sm:w-4/6">
                    <StarsFieldProvider text="Seja bem Vindo ao Starsfield!" stars={50} className="wave"/>
                    <div className="flex flex-col items-center justify-center min-h-1/2 w-full bg-fuchsia-100 rounded-b shadow-2xl">
                        <h1 className="font-title w-full text-surface z-2 uppercase text-3xl text-center m-6 mt-4 sm:text-4xl md:text-5xl">Cadastre-se</h1>
                        <Input
                            type="text"
                            placeholder="Username"
                            onSubmit={setUsername}
                            onChange={setUsername}
                        />
                        <Input 
                            type="password"
                            placeholder="Senha"
                            onSubmit={setPassword}
                            onChange={setPassword}
                        />

                        <div className="flex gap-1 text-xs text-surface font-text justify-start w-full px-6 sm:px-4 mt-2 mb-5 sm:w-2/3 md:1/3 lg:w-1/2">
                            <p>Já possui uma conta?</p>
                            <Link to="/login" className="underline hover:opacity-80 hover:text-accent transition duration-200 cursor-pointer ">
                                Faça login
                            </Link>
                        </div>
                        <Button text="concluir" className="m-5" onClick={() => handleSubmit(username, password)}/>
                    </div>

                {isModalOpen && (  
                    <ErrorModal 
                        message="Erro ao cadastrar usuário. Verifique suas credenciais."
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default SignUp;