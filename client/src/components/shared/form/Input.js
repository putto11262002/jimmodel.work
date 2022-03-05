import { Form } from "react-bootstrap";

export default function Input({value, label, onChange, name, placeholder, md, type }) {
  return (
    <Form.Group className={`mb-3 col-12 col-md-${md}`}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
    value={value || ""}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  </Form.Group>
  );
}
