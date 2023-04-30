import {useState} from "react";


const items = ["cur",
    "muie",
    "alte cuvinte obscene"
]
//et selectedIndex = -1;

function ListGroup() {
    const [selectedIndex,setSelectedIndex] = useState(-1)
    return (
        <>
            <h1>Listoasa</h1>
            <ul className="list-group">
                {items.map((x,index) => (
                    <li className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'} key={x} onClick={() => setSelectedIndex(index)}>
                    {x}
                </li>))}
            </ul>
        </>);
}

export default ListGroup;