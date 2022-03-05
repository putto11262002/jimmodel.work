
import { Form } from "react-bootstrap";
export default function Select({value, label, onChange, name, md,  options }) {
  return (
    <Form.Group className={`mb-3 col-12 col-md-${md}`}>
    <Form.Label className="form-label">{label}</Form.Label>
    <Form.Select
      onChange={onChange}
      value={value || ""}
     
      name={name}
    >
      <option>Select</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
 </Form.Group>
  );
}
