import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function UploadImageInput({ value, label, onChange, name, md }) {
  const fileInputRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState(null);
  const [file, setFile] = useState(null);

  function handleClick(e) {
    fileInputRef.current.click();
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
    onChange(e);
  }


  useEffect(() => {
    if (file !== null) {
      const url = URL.createObjectURL(file);
      setBlobUrl(url);
    }
    return () => URL.revokeObjectURL(blobUrl);
  }, [file]);

  return (
    <Form.Group className={`mb-3 col-12 col-md-${md}`}>
      <Form.Label className="d-block">{label}</Form.Label>
      <div
        onClick={handleClick}
        className="w-100 d-flex justify-content-center align-items-center rounded bg-light"
        style={{
          height: "12rem",
          backgroundImage:
            blobUrl === null
              ? `url(${process.env.REACT_APP_API_END_POINT}${value})`
              : `url(${blobUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <i className="bi bi-upload fs-2"></i>
      </div>
      <Form.Control
        ref={fileInputRef}
        type="file"
        className="d-none"
        name={name}
        onChange={handleChange}
      />
    </Form.Group>
  );
}
