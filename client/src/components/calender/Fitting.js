import { ListGroupItem } from "react-bootstrap";


export default function Fitting({data}) {
  return (
    <ListGroupItem  action className="fs-sm py-1 px-2 overflow-hidden border-white bg-fitting fw-bold" >

    {data.title}
</ListGroupItem>
  )
}
