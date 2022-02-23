import React, { useState } from "react";
import { Button, Col, Row, FormControl, ButtonGroup, ToggleButton, Tabs, Tab } from "react-bootstrap";
import PageWrapper from "../components/shared/page/PageWrapper";
import ModelInfiniteScrolling from "../components/model/ModelInfiniteScrolling";
import { useNavigate } from "react-router";
import RequestedModelInfiniteScrolling from "../components/requestedModel/RequestedModelInfiniteScrolling";
import SearchModel from "../components/model/SearchModel";
export default function Model() {
  const navigate = useNavigate();
  const [displayedData, setDisplayedData] = useState('model')
  return (
    <PageWrapper>
      <Row className="justify-content-between g-3">
        <Col md="3">
          {" "}
          <Button
            onClick={() => navigate("/create-model")}
            variant="light"
            className="text-primary w-100"
          >
            Create Model
          </Button>
        </Col>
        <Col md="4">
         <SearchModel/>
        </Col>
      </Row>
      {/* <Row className="mt-3">
    <Col md="3">
      <ButtonGroup className="w-100">
      <ToggleButton
           
         
            type="radio"
            variant="outline-light"
            className="text-primary border-light" 
            name="radio"
          
            checked={displayedData === 'model'}
            onClick={() => setDisplayedData('model')}
            
          >
           Models
            </ToggleButton>
            <ToggleButton
           
         
           type="radio"
           variant="outline-light"
           className="text-primary border-light"
           name="radio"
         
           checked={displayedData === 'requestedModel'}
           onClick={() => setDisplayedData('requestedModel')}

           
         >
           Requested models
           </ToggleButton>
      </ButtonGroup>
    </Col>
    </Row> */}

    <Tabs defaultActiveKey="model" id="uncontrolled-tab-example" className="my-3">
  <Tab eventKey="model" title="Model">
  <ModelInfiniteScrolling />
  </Tab>
  <Tab eventKey="requested-model" title="Requested model">
  <RequestedModelInfiniteScrolling/>
  </Tab>
 
</Tabs>
     {/* {displayedData === 'model' && <ModelInfiniteScrolling />}
    {displayedData === 'requestedModel' && <RequestedModelInfiniteScrolling/>} */}
    </PageWrapper>
  );
}
