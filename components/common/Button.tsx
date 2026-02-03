interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border rounded-full text-sm hover:bg-blue-600 hover:text-white whitespace-nowrap"
    >
      {label}
    </button>
  );
};

export default Button;
