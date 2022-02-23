import { useRef } from "react"
import { Button, Dropdown } from "react-bootstrap"

export default function DropdownWrapper({children}) {
    const toggleBtnRef = useRef(null)
  return (
    <Dropdown className="d-inline mx-2" align="end">
      
    <Dropdown.Toggle ref={toggleBtnRef}  className="bg-white text-white border-white p-0 m-0 outline-none " id="dropdown-autoclose-true">
    <Button variant="white" onClick={() => toggleBtnRef.current.click()}><i className="bi bi-three-dots"></i></Button>
    </Dropdown.Toggle>

    <Dropdown.Menu>
     {children}
    </Dropdown.Menu>
  </Dropdown>

  )
}
