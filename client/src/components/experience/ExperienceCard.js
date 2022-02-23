import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { dateFormatter, textFormatter } from "../../helper/Formatter";

export default function ExperienceCard({data}) {
  return (
    <Card>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Year</div>
              {dateFormatter(data.year)}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Country</div>
              {textFormatter(data.country)}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Media</div>
              {textFormatter(data.media)}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Product</div>
              {textFormatter(data.product)}
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Details</div>
              {textFormatter(data.details)}
            </div>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
