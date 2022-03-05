import { Col, Row } from "react-bootstrap";
import JobCard from "./JobCard";
import Error from "../shared/Error";
import { useJobContext } from "../../context/secured/jobContext";
import Loader from "../shared/Loader";
import { useRef, useCallback } from "react";

export default function JobInfiniteScrolling() {
    const {jobs, infiniteScrolling, jobActions} = useJobContext();
    const {error, loading, hasMore, loadMore} = infiniteScrolling;
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
          {error ? <Error/> : jobs.map((job, index) => {
           
              if(index + 1 === jobs.length){
                  return (
                      <Col ref={lastModelRef} key={job.job_id} md="4">
                         <JobCard data={job}/>
                      </Col>
                  )
              }else{
                return (
                    <Col key={job.job_id} md="4">
                        <JobCard data={job}/>
                    </Col>
                )
                  
              }
          })}

        {loading && <Loader/>}


      </Row>
  );
}
