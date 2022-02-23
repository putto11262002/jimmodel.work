import { Form } from "react-bootstrap";

export default function TextArea({md, label, onChange, name, value, rows}) {
  return   <Form.Group className={`mb-3 col-12 col-md-${md}`}>
  <Form.Label className="form-label">{label}</Form.Label>
    <Form.Control as="textarea" rows={rows}
      value={value ||""}
      onChange={onChange}
      

      name={name}
    
      
    />
  </Form.Group>;
}
