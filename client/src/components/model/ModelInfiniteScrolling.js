import { Col, Row } from "react-bootstrap";
import { useModelContext } from "../../context/secured/modelContext";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import ModelCard from "./ModelCard";
import { useRef, useCallback } from "react";
export default function ModelInfiniteScrolling() {
    const {models, infiniteScrolling, modelActions} = useModelContext();
    const  {error, loading, hasMore, loadMore} = infiniteScrolling;
    const observer = useRef();

    const lastModelRef = useCallback(
        (node) => {
          if (loading) return;
          if (!hasMore) return;
          if (observer.current) observer.current.disconnect();
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
               
             loadMore()
            }
          });
          if (node) observer.current.observe(node);
        },
        [loading, hasMore]
      );
     

  return (
     <Row className="g-3 my-2">
         {error? <Error/> : models.map((model, index) => {
          if(index + 1 === models.length){
              return (
                  <Col ref={lastModelRef} key={model.model_id} md="4">
                      <ModelCard data={model}/>
                  </Col>

              )
          }else{
              return (
                <Col key={model.model_id}  md="4">
                <ModelCard data={model}/>
            </Col>
              )
          }

      })}
      {(loading && hasMore) && <Loader/>}
     </Row>

  );
}