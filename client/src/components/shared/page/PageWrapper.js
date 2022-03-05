import { useEffect, useRef } from 'react';
import {Container} from 'react-bootstrap'
export default function PageWrapper({children}) {
    const pageRef = useRef(null);
    useEffect(() => {
        pageRef.current.scrollTo(0, 0);
        return () =>  pageRef.current = null
    }, [])
  return (
      <Container ref={pageRef} fluid="lg" className="my-3">
          {children}
      </Container>
  );
}
