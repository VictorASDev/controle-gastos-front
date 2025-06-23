interface ButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`bg-surface text-white text-2xl font-bold py-4 px-6 rounded-xl ` + props.className}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
export default Button;