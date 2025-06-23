import React, { useState } from "react";

interface InputProps {
    onSubmit: (value: string) => void;
    onChange?: (value: string) => void; // <-- Adicione isso
    type?: "text" | "number" | "email" | "password";
    placeholder?: string;
}

const Input = (props: InputProps) => {
    const [value, setValue] = useState("");
    
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full p-6">
                <input
                    type={props.type || "text"}
                    placeholder={props.placeholder || ""}
                    value={value}
                    onChange={e => {
                      setValue(e.target.value);
                      props.onChange?.(e.target.value); // <-- Chama o onChange do pai, se existir
                    }}
                    onSubmit={e => {
                        e.preventDefault();
                        props.onSubmit(value);
                        setValue("");
                    }}
                    required
                    className="w-full font-text sm:w-2/3 md:1/3 lg:w-1/2 rounded text-surface outline-none focus:ring focus:ring-accent sm:text-xl md:text-2xl"

                />
         
                <div className="h-[1px] w-full mb-1 bg-accent sm:w-2/3 md:1/3 lg:w-1/2"></div>
            </div>
          
        </>
    );
};

export default Input;