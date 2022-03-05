import { forwardRef } from "react";
import { ListGroupItem } from "react-bootstrap";


 const Option = ({data}) => {
  return (
   
   <ListGroupItem  action className="fs-sm py-1 px-2 overflow-hidden border-white fw-bold" style={{background: `${data.User.colour}`}}>

       {data.title}
   </ListGroupItem>
  
  
  )
}

export default Option
