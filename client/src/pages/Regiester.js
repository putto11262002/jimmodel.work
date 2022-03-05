import { useEffect, useState } from "react";
import PageWrapper from "../components/shared/page/PageWrapper";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import Input from "../components/shared/form/Input";
import Select from "../components/shared/form/Select";
import SelectCountry from "../components/shared/form/SelectCountry";
import TextArea from "../components/shared/form/TextArea";
import ExperienceForms from "../components/experience/ExperienceForms";
import { useModelContext } from "../context/secured/modelContext";
import UploadImageInput from "../components/shared/form/UploadImageInput.js/UploadImageInput";
import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";
import {validateCreateModelForm }from "../helper/formValidation/modelFormValidation";
import {
  tattooScarOptions,
  approvedOptions,
  inTownOptions,
  underwareShootingOptions,
  genderOptions,
  eyeColourOptions,
  hairColourOptions,
} from "../components/shared/form/options/modelOptions";
import { useAlertContext } from "../context/unsecured/alertContext";
import modelService from "../services/model.service";
import { useSessionContext } from "../context/unsecured/sessionContext";

const initialInputData = {
  Experiences: Array(),
  Measurement: Object(),
  approved: false
};

export default function Register() {
  const {  modelActions } = useModelContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {sessionActions} = useSessionContext()
 
  const [inputData, setInputData] = useState(initialInputData);
  const {alertActions} = useAlertContext();

  useEffect(() => {

    sessionActions.logout();

    return () => {};
  }, [])
 

  function handlePersonalDetailsInputChange(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  function handleMeasurementsInputChange(e) {
    setInputData({
      ...inputData,
      Measurement: {
        ...inputData.Measurement,
        [e.target.name]: e.target.value,
      },
    });
  }
  function handleOnExperienceChange(experience) {
    setInputData({ ...inputData, Experiences: experience });
  }

  function handleFileInputChange(e) {
    setInputData((prevInputData) => {
   
      return { ...prevInputData, [e.target.name]: e.target.files[0] };
    });
  }



  async function handleSubmit(e) {
    e.preventDefault();
    try{
      setLoading(true)
      const validatedInputData = await validateCreateModelForm(inputData);

      try {
       validatedInputData.Experiences = JSON.stringify(validatedInputData.Experiences);
       validatedInputData.Measurement = JSON.stringify(validatedInputData.Measurement);
       
  
        const formData = new FormData();
        for (let key in validatedInputData) {
         
          formData.append([key], validatedInputData[key]);
        }
  
       const createdModel = await modelService.create(formData);
       alertActions.setShow('Form has successfully been submited', 'success')
       setInputData(initialInputData)
       setLoading(false)
      } catch (err) {
      
        console.error(err);
        alertActions.setShow(err.response.data, 'danger')
        setError(true);
        setLoading(false);
      }

    }catch(err){
      alertActions.setShow(err.errors[0], 'warning');
      setLoading(false)
    }
  
   
  }



  
  if (loading) {
    return (
        <PageWrapper>
          <Loader />
        </PageWrapper>
      );
  } else {
      if(error){
          return (
              <PageWrapper><Error/></PageWrapper>
          )
      }else{
        return (
            <PageWrapper>
              <Form  className="row mt-5">
                <h5 className="mt-5">Personal Details</h5>
      
                <Input
                  type="text"
                  md="6"
                  label="First name"
                  name="first_name"
                  value={inputData.first_name}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="6"
                  label="Last name"
                  name="last_name"
                  value={inputData.last_name}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="date"
                  md="4"
                  label="Date of birth"
                  name="date_of_birth"
                  value={inputData.date_of_birth}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="Age"
                  name="age"
                  value={inputData.age}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Select
                  md="4"
                  label="Gender"
                  name="gender"
                  value={inputData.gender}
                  options={genderOptions}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="Ethnicity"
                  name="ethnicity"
                  value={inputData.ethnicity}
                  onChange={handlePersonalDetailsInputChange}
                />
                <SelectCountry
                  md="4"
                  label="Nationality"
                  name="nationality"
                  value={inputData.nationality}
                  onChange={handlePersonalDetailsInputChange}
                />
                <SelectCountry
                  md="4"
                  label="Country of residence"
                  name="country_of_residence"
                  value={inputData.country_of_residence}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="Spoken language"
                  name="spoken_language"
                  value={inputData.spoken_language}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="Passport number"
                  name="passport_no"
                  value={inputData.passport_no}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="ID card"
                  name="id_card"
                  value={inputData.id_card}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="Tax ID"
                  name="tax_id"
                  value={inputData.tax_id}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Select
                  md="4"
                  label="Underware shooting"
                  name="underware_shooting"
                  value={inputData.underware_shooting}
                  options={underwareShootingOptions}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Select
                  md="4"
                  label="In town"
                  name="in_town"
                  value={inputData.in_town}
                  options={inTownOptions}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Select
                  md="4"
                  label="Tattoo or Scar"
                  name="tattoo_scar"
                  value={inputData.tattoo_scar}
                  options={tattooScarOptions}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Input
                  type="text"
                  md="4"
                  label="Education"
                  name="education"
                  value={inputData.education}
                  onChange={handlePersonalDetailsInputChange}
                />
                <Input
                  type="text"
                  md="4"
                  label="Occupation"
                  name="occupation"
                  value={inputData.occupation}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <TextArea
                  md="12"
                  label="Medical background e.g. allergies"
                  name="medical_background"
                  value={inputData.medical_background}
                  onChange={handlePersonalDetailsInputChange}
                />
                <TextArea
                  md="12"
                  label="Special talent"
                  name="talent"
                  value={inputData.talent}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <h5>Contact details</h5>
      
                <Input
                  type="text"
                  md="6"
                  label="Phone number"
                  name="phone_number"
                  value={inputData.phone_number}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Input
                  type="text"
                  md="6"
                  label="Email"
                  name="email"
                  value={inputData.email}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Input
                  type="text"
                  md="4"
                  label="Line ID"
                  name="line_id"
                  value={inputData.line_id}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Input
                  type="text"
                  md="4"
                  label="WhatsApp"
                  name="whatsApp"
                  value={inputData.whatsApp}
                  onChange={handlePersonalDetailsInputChange}
                />
      
                <Input
                  type="text"
                  md="4"
                  label="WeChat"
                  name="weChat"
                  value={inputData.weChat}
                  onChange={handlePersonalDetailsInputChange}
                />
      
      <Input
                  type="text"
                  md="4"
                  label="Facebook"
                  name="facebook"
                  value={inputData.facebook}
                  onChange={handlePersonalDetailsInputChange}
                />
      
      <Input
                  type="text"
                  md="4"
                  label="Imstagram"
                  name="instagram"
                  value={inputData.instagram}
                  onChange={handlePersonalDetailsInputChange}
                />
                <h5>Address</h5>
      
                <Input
                  md="12"
                  label="Address"
                  onChange={handlePersonalDetailsInputChange}
                  name="address"
                  type="text"
                  value={inputData.address}
                />
      
                <Input
                  md="4"
                  label="City"
                  onChange={handlePersonalDetailsInputChange}
                  name="city"
                  type="text"
                  value={inputData.city}
                />
      
                <Input
                  md="4"
                  label="Zip Code"
                  onChange={handlePersonalDetailsInputChange}
                  name="zip_code"
                  type="text"
                  value={inputData.zip_code}
                />
      
                <SelectCountry
                  md="4"
                  label="Country"
                  onChange={handlePersonalDetailsInputChange}
                  name="country"
                  type="text"
                  value={inputData.country}
                />
      
                <h5>Emergency contact</h5>
      
                <Input
                  md="4"
                  label="Name"
                  onChange={handlePersonalDetailsInputChange}
                  name="emergency_contact_name"
                  type="text"
                  value={inputData.emergency_contact_name}
                />
      
                <Input
                  md="4"
                  label="Relationship"
                  onChange={handlePersonalDetailsInputChange}
                  name="emergency_contact_relationship"
                  type="text"
                  value={inputData.emergency_contact_relationship}
                />
      
                <Input
                  md="4"
                  label="Contact details"
                  onChange={handlePersonalDetailsInputChange}
                  name="emergency_contact_details"
                  type="text"
                  value={inputData.emergency_contact_details}
                />
                <h5>Measurements</h5>
      
      <Input
                  md="4"
                  label="Height"
                  onChange={handleMeasurementsInputChange}
                  name="height"
                  type="text"
                  value={inputData.Measurement.height}
                />
                <Input
                  md="4"
                  label="Weight "
                  onChange={handleMeasurementsInputChange}
                  name="weight"
                  type="text"
                  value={inputData.Measurement.weight}
                />
      
      <Input
                  md="4"
                  label="Chest/Bust/Cup"
                  onChange={handleMeasurementsInputChange}
                  name="chest_bust_cup"
                  type="text"
                  value={inputData.Measurement.chest_bust_cup}
                />
      
      <Input
                  md="4"
                  label="Hips"
                  onChange={handleMeasurementsInputChange}
                  name="hips"
                  type="text"
                  value={inputData.Measurement.hips}
                />
      
                <Input
                     md="4"
                  label="Suit/Dress size"
                  onChange={handleMeasurementsInputChange}
                  name="suit_dress"
                  type="text"
                  value={inputData.Measurement.suit_dress}
                />
      
               
                <Input
                  md="4"
                  label="Shoes size"
                  onChange={handleMeasurementsInputChange}
                  name="shoes_size"
                  type="text"
                  value={inputData.Measurement.shoes_size}
                />
      
                <Select
                  md="4"
                  label="Hair colour"
                  onChange={handleMeasurementsInputChange}
                  name="hair_colour"
                  options={hairColourOptions}
                  value={inputData.Measurement.hair_colour}
                />
                <Select
                  md="4"
                  label="Eyes colour"
                  onChange={handleMeasurementsInputChange}
                  name="eye_colour"
                  options={eyeColourOptions}
                  value={inputData.Measurement.eye_colour}
                />
               
                <h5>Experience</h5>
                <ExperienceForms
                  value={inputData.Experiences}
                  onChange={handleOnExperienceChange}
                />
      
                <h5>Profile images</h5>
                <UploadImageInput
                  md="4"
                  value={inputData['1']}
                  onChange={handleFileInputChange}
                  name="1"
                  label="Close up"
                />
      
                <UploadImageInput
                  md="4"
                  value={inputData['2']}
                  onChange={handleFileInputChange}
                  name="2"
                  label="Profile"
                />
      
                <UploadImageInput
                  md="4"
                  value={inputData['3']}
                  onChange={handleFileInputChange}
                  name="3"
                  label="Middle"
                />
      
                <UploadImageInput
                  md="4"
                  value={inputData['4']}
                  onChange={handleFileInputChange}
                  name="4"
                  label="Full"
                />
      
                <UploadImageInput
                  md="4"
                  value={inputData['5']}
                  onChange={handleFileInputChange}
                  name="5"
                  label="Other"
                />
      
      <UploadImageInput
                  md="4"
                  value={inputData['6']}
                  onChange={handleFileInputChange}
                  name="6"
                  label="Other"
                />
      
                <Col xs="12 d-flex justify-content-center mb-5">
                  <Button
                  onClick={handleSubmit}
                   
                    variant="light"
                    type="button"
                    className=" mb-3 text-primary w-25"
                  >
                    Submit
                  </Button>{" "}
                </Col>
              </Form>
            </PageWrapper>
          );

      }
    
  }
}
