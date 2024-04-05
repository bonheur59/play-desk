interface ButtonProps {
  type?: "submit" | "button" | undefined;
  size?: string;
  font?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  disabled?: boolean;
  children: string;
}

const Button = ({
  type,
  size,
  font,
  color,
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  const fontVariants = {
    medium: "font-medium",
    semiBold: "font-semibold",
    bold: "font-bold",
  };

  const sizeVariants = {
    type1: "flex justify-center items-center gap-2 w-full",
  };
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
    main: "bg-sub-color text-white hover:bg-main-color",
  };

  return (
    <button
      type={type || "button"}
      className={`py-3 px-4 rounded-md border-none cursor-pointer ${fontVariants[font]}  ${colorVariants[color]} ${sizeVariants[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
