interface Props {
    text: string;
    size?: number;
    pt?: number,
    mt?: number,
}

const Heading = ({ text, size, pt, mt }: Props) => {
    return (
        <div className={`flex justify-center items-center text-${size}xl pt-${pt} mt-${mt}`}>
            {text}
        </div>
    );
}

Heading.defaultProps = {
    size: 5,
    pt: 0,
    mt: 0,
};

export default Heading;
