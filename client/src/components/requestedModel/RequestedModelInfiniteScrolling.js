import { Col, Row } from "react-bootstrap";

import { useModelContext } from "../../context/secured/modelContext";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import RequestedModelCard from "./RequestedModelCard";



export default function RequestedModelInfiniteScrolling() {
    const {requestedModels, infiniteScrolling, modelActions} = useModelContext();
    const  {error, loading} = infiniteScrolling

  return (
     <Row className="g-3 my-2">
         {error? <Error/> : requestedModels.map((model, index) => {
         
         
              return (
                <Col key={model.model_id} md="4">
                <RequestedModelCard data={model}/>
            </Col>
              )
          

      })}
      
     </Row>

  );
}
