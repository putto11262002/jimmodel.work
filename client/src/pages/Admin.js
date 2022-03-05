import {useState} from 'react';
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import CreateUserModal from "../components/Modal/user/CreateUserModal";
import UpdateUserModal from '../components/Modal/user/UpdateUserModal';
import PageWrapper from "../components/shared/page/PageWrapper";
import UserCard from "../components/user/UserCard";
import { useUserContext } from '../context/secured/userContext';

export default function Admin() {
  const { users } = useUserContext();
 const [showCreateUserModal, setShowCreateUserModal] = useState(false);
 const [showUpdateUserModal, setShowUpdateUserModal] = useState({user_id: null, show: false });
 
  return (
    <PageWrapper>
      {showCreateUserModal && <CreateUserModal onClose={() => setShowCreateUserModal(false)}/>}
      {showUpdateUserModal.show && <UpdateUserModal user_id={showUpdateUserModal.user_id} onClose={() => setShowUpdateUserModal({user_id: null, show: false})}/> }
      <Row className="g-3">
        <Col lg="3">
          <Button onClick={() => setShowCreateUserModal(true)} variant="light" className="text-primary w-100">
            Create user
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="booker" className="my-3">
        <Tab eventKey="booker" title="Booker">
          <Row className="g-3">
            {users.filter((user) => user.role === 'booker').map((user, index) => {
              return (
                <Col key={index} lg="4">
                  <UserCard data={user} onShowUpdateUserModal={() => {
                 
                    setShowUpdateUserModal({user_id: user.user_id, show: true})
                  }}/>
                </Col>
              );
            })}
          </Row>
        </Tab>
        <Tab eventKey="scout" title="Scout">
        {users.filter((user) => user.role === 'scout').map((user, index) => {
              return (
                <Col key={index} lg="4">
                  <UserCard data={user} onShowUpdateUserModal={() => {
                 
                    setShowUpdateUserModal({user_id: user.user_id, show: true})
                  }}/>
                </Col>
              );
            })}
        </Tab>
        <Tab eventKey="admin" title="Admin">
        {users.filter((user) => user.role === 'admin').map((user, index) => {
              return (
                <Col key={index} lg="4">
                  <UserCard data={user} onShowUpdateUserModal={() => {
                 
                    setShowUpdateUserModal({user_id: user.user_id, show: true})
                  }}/>
                </Col>
              );
            })}
        </Tab>
      </Tabs>
    </PageWrapper>
  );
}
