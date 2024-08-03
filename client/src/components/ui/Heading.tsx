interface Props {
    text: string;
    className: string,
}

const Heading = ({ text, className }: Props) => {
    return (
        <div className={className}>
            {text}
        </div>
    );
}

export default Heading;
