import { Card, Col, Form } from "react-bootstrap";
import { htmlDateFormatter } from "../../helper/Formatter";
import Input from "../shared/form/Input";
import SelectCountry from "../shared/form/SelectCountry";

function ExperienceForm({ data, onDelete, index, onChange, onRemove }) {
  const handleOnInputChange = (e) => {
    onChange(index, e);
  };



  return (
    <Col xs="12" className="g-3">
      <Card>
        <Card.Header className="bg-white">
          {data.experience_id == undefined ? (
            <button
              onClick={(e) => onRemove(index)}
              className="btn-close"
            ></button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(data.experience_id);
              }}
              className="btn btn-light text-danger"
            >
              Delete
            </button>
          )}
        </Card.Header>
        <Card.Body>
          <Form className="row justify-content-center g-2">
            <Input
              type="date"
              md="6"
              label="Year"
              name="year"
              value={
               
                   htmlDateFormatter(data.year)
              }
              onChange={handleOnInputChange}
            />
            <Input
              type="text"
              md="6"
              label="Media"
              name="media"
              value={data.media}
              onChange={handleOnInputChange}
            />
            <SelectCountry
              label="Country"
              md="6"
              name="country"
              value={data.country}
              onChange={handleOnInputChange}
            />
            <Input
              type="text"
              md="6"
              label="Product"
              name="product"
              value={data.product}
              onChange={handleOnInputChange}
            />
            <Input
              type="text"
              md="12"
              label="Details (Optional)"
              name="details"
              value={data.details}
              onChange={handleOnInputChange}
            />
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ExperienceForm;
