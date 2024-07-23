interface Props {
    text: string
}
const Heading = ({ text }: Props) => {
    return (
        <div className="mt-5 pt-5 flex justify-center items-center text-4xl">
            {text}
        </div>
    )
}

export default Heading;