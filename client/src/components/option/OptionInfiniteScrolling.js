import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useJobContext } from '../../context/secured/jobContext';
import { useRef, useCallback } from 'react';
import Error from '../shared/Error';
import Loader from '../shared/Loader';
import OptionCard from './OptionCard';

export default function OptionInfiniteScrolling() {
    const {options, infiniteScrolling, jobActions} = useJobContext();
   
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
  return( <Row className="g-3 my-2">
      {error ? <Error/> : options.map((option, index) => {
        
             if(index + 1 === options.length){
                return (
                    <Col ref={lastModelRef} key={option.job_id} md="4">
                    <OptionCard data={option}/>
                    </Col>
                )
            }else{
              return (
                  <Col key={option.job_id} md="4">
                  <OptionCard data={option}/>
                  </Col>
              )

      }})}
      {loading && <Loader/>}

  </Row>);
}
