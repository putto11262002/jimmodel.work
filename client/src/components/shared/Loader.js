import { Spinner } from "react-bootstrap";
export default function Loader() {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-start">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
