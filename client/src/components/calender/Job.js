import { ListGroupItem } from "react-bootstrap";


export default function Job({data}) {
  return (
    <ListGroupItem  action className="fs-sm py-1 px-2 overflow-hidden border-white bg-dark text-white fw-bold">

       {data.title}
   </ListGroupItem>
  )
}
