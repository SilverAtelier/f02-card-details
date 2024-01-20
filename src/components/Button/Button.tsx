
type btnProps = {
    classname: string;
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({classname, text, onClick}:btnProps) => {
    return (
        <>
            <button className={classname} onClick={onClick}>{text}</button>
        </>
    );
};

export default Button;
