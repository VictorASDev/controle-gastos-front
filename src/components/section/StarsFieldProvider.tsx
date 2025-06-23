import StarsField from "../StarsField";

interface StarsFieldProviderProps {
    text: string;
    stars: number;
}

const StarsFieldProvider = (props: StarsFieldProviderProps) => {
    return (
        <div className="min-h-60 max-h-1/2 w-full bg-surface relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-1/2 top-0 left-0 absolute z-1 wave bg-background -scale-y-100 shadow-2xl"></div>
            <div className="w-full h-full absolute z-0">
                <StarsField count={props.stars} />
            </div>
            <h1 className="text-text z-2 uppercase font-title text-3xl mt-10 text-center w-full m-6 sm:text-4xl md:text-5xl">{props.text}</h1>
        </div>
    );
}
export default StarsFieldProvider;