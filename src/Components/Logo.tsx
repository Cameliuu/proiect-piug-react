function Logo(props) {

    return (
        <img
            src={props.src}

            width="100"
            height="100"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
        />
    );
}
interface props{
    src:string
}
export default Logo