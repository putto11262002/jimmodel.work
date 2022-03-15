import {useNavigate} from 'react-router-dom'
import { Dropdown, ListGroup } from 'react-bootstrap'

import docService from '../../services/doc.service';

import ProfileImage from '../shared/image/ProfileImage';
import { useModelContext } from '../../context/secured/modelContext';
import { dateFormatter } from '../../helper/Formatter';
export default function ModelListGroupItem({data}) {
 
  
   const {modelActions} = useModelContext()
  
  
    const navigate = useNavigate()
    async function getModelProfile(){
      try{
        const res = await docService.getModelProfile(data.model_id);
        const resData = await res.data;
        const file = new Blob(
          [resData],
          {type: 'application/pdf'}
        );
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL)
      }catch(err){
        console.error(err)
      }
    }
  
    async function handleDeleteModel(){
      try{
        await modelActions.deleteModel(data.model_id);
      }catch(err){
        console.error(err);
      }
    }
  return (
    <ListGroup.Item

  
    className="d-flex align-items-center"
   
  >
     <ProfileImage
                        width={1.5}
                        height={1.5}
                        src={
                          process.env.REACT_APP_API_END_POINT +
                          data.profile_img_1
                        }
                      />
                      <span className="mx-3 my-0">
                        {data.first_name + " " + data.last_name}  {data.nickname && " (" + data.nickname + ")"}
                      </span>

    
      <Dropdown className="ms-auto d-inline mx-2" align="end">
        <Dropdown.Toggle
          variant="white"
          className="m-0 p-0"
          id="dropdown-autoclose-true"
        >
          <i className="bi bi-three-dots"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => navigate(`/model/${data.model_id}`)}
        
          >
            View model
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => navigate(`/edit-model/${data.model_id}`)}
         
          >
           Edit model
          </Dropdown.Item>
        { data.approved &&  <Dropdown.Item
            onClick={() => getModelProfile(data.model_id)}
         
          >
            Model profile
          </Dropdown.Item>}

       
          
        </Dropdown.Menu>
      </Dropdown>

  </ListGroup.Item>
  )
}
