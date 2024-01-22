
type btnProps = {
    classname: string;
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: "button" | "submit" | "reset" ;
}

const Button = ({classname, text, type , onClick}:btnProps) => {
    return (
        <>
            <button className={classname} onClick={onClick} type={type}>{text}</button>
        </>
    );
};

export default Button;
