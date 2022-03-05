import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Input from "../components/shared/form/Input";
import Loader from "../components/shared/Loader";
import PageWrapper from "../components/shared/page/PageWrapper";
import { useSessionContext } from "../context/unsecured/sessionContext";

export default function Login() {
  const [inputData, setInputData] = useState({});
  const {loading,  sessionActions, loginStatus} = useSessionContext();
  const navigate = useNavigate()
  function handleInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  useEffect(() => {
      if(loginStatus && !loading){
          navigate("/")
      }
  }, [loginStatus, loading]);
 
  async function handleSubmit(e){
      e.preventDefault();
      try{
          await sessionActions.login(inputData.username, inputData.password);
          navigate("/");
      }catch(err){
          
      }
  };

  return (
    <PageWrapper>
     {loading ? <Loader/> : (
          <Row
          style={{ height: "90vh" }}
          className="justify-content-center align-items-center p-0 m-0"
       
        >
            <Col md="6">
            <h4 className="text-primary text-center">Jimmodel</h4>
          <Form className="mt-5"> 
           
            <Input
              label="Usernamne"
              name="username"
              onChange={handleInputChange}
              value={inputData.username}
              type="text"
            />
             <Input
              label="Password"
              name="password"
              onChange={handleInputChange}
              value={inputData.password}
              type="password"
            />
           <Button className="w-100 mt-5" variant="primary" onClick={handleSubmit}>Login</Button>
            </Form>
            </Col>
          </Row>
       
     )}
    </PageWrapper>
  );
}
