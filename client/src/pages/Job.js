import {
  Button,
  ButtonGroup,
  Col,
  FormControl,
  Row,
  ToggleButton,
  Tabs,
  Tab,
} from "react-bootstrap";
import PageWrapper from "../components/shared/page/PageWrapper";

import { useCreateOptionModalContext } from "../context/secured/createOptionModalContext";
import { useCreateJobModalContext } from "../context/secured/createJobModalContext";
import JobInfiniteScrolling from "../components/job/JobInfiniteScrolling";
import { useState } from "react";
import OptionInfiniteScrolling from "../components/option/OptionInfiniteScrolling";
import SearchJob from "../components/job/searchJob";
import { useBlockModelModalContext } from "../context/secured/BlockModelModalContext";
export default function Job() {
  const { createJobModalActions } = useCreateJobModalContext();
  const { createOptionModalActions } = useCreateOptionModalContext();
  const [displayedData, setDisplayedData] = useState("job");
  const {blockModelModalActions} = useBlockModelModalContext()
  return (
    <PageWrapper>
      <Row className="justify-content-between g-3">
        <Col md="6">
          <Row className="justify-content-around g-3">
            <Col md="4">
              <Button
                onClick={() => createJobModalActions.setShow()}
                variant="light"
                className="text-primary w-100"
              >
                Create job
              </Button>
            </Col>
            <Col md="4">
              <Button
                onClick={() => createOptionModalActions.setShow()}
                variant="light"
                className="text-primary w-100"
              >
                Create option
              </Button>
            </Col>
            <Col md="4">
              <Button
                onClick={() => blockModelModalActions.setShow()}
                variant="light"
                className="text-primary w-100"
              >
                Block model
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md="4">
        <SearchJob/>
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
         
           checked={displayedData === 'job'}
           onClick={() => setDisplayedData('job')}

           
         >
           Jobs
           </ToggleButton>
      <ToggleButton
           
         
            type="radio"
            variant="outline-light"
            className="text-primary border-light" 
            name="radio"
          
            checked={displayedData === 'option'}
            onClick={() => setDisplayedData('option')}
            
          >
            Options
            </ToggleButton>
          
      </ButtonGroup>
    </Col>
    </Row> */}
      {/* {displayedData === "job" && <JobInfiniteScrolling/>}
   {displayedData === 'option' && <OptionInfiniteScrolling/>} */}
      <Tabs
        defaultActiveKey="job"
        id="uncontrolled-tab-example"
        className="my-3"
      >
        <Tab eventKey="job" title="Job">
          <JobInfiniteScrolling />
        </Tab>
        <Tab eventKey="option" title="Option">
          <OptionInfiniteScrolling />
        </Tab>
      </Tabs>
    </PageWrapper>
  );
}
