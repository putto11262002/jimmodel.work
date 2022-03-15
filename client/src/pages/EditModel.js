import { useEffect, useState } from "react";
import PageWrapper from "../components/shared/page/PageWrapper";
import { Form, Button, Col } from "react-bootstrap";
import Input from "../components/shared/form/Input";
import Select from "../components/shared/form/Select";
import SelectCountry from "../components/shared/form/SelectCountry";
import TextArea from "../components/shared/form/TextArea";
import ExperienceForms from "../components/experience/ExperienceForms";
import { useModelContext } from "../context/secured/modelContext";

import Loader from "../components/shared/Loader";
import Error from "../components/shared/Error";
import ReuploadImageInput from "../components/shared/form/UploadImageInput.js/ReuploadImageInput";
import {
  tattooScarOptions,
  approvedOptions,
  inTownOptions,
  underwareShootingOptions,
  genderOptions,
  eyeColourOptions,
  hairColourOptions,
} from "../components/shared/form/options/modelOptions";
import { useParams } from "react-router-dom";
import {validateUpdateModelForm} from "../helper/formValidation/modelFormValidation";
import { useAlertContext } from "../context/unsecured/alertContext";
import { useSessionContext } from "../context/unsecured/sessionContext";
const initialInputData = {
  Experiences: Array(),
  Measurement: Object(),
  profile_img: Array(),
};

export default function EditModel() {
    const param = useParams()
  const { modelActions } = useModelContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputData, setInputData] = useState(initialInputData);
  const [fetchedModel, setFetchedModel] = useState({});
  const {alertActions} = useAlertContext();
  const {sessionActions} = useSessionContext();

  useEffect(async() => {
      try{
          const model = await modelActions.getModel(param.model_id);
          setFetchedModel(model)
          setInputData(model)
          setLoading(false)
      }catch(err){
       
          console.error(err);
          setError(true)
          setLoading(false)
      }

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

  function handleProfileImageProfile(e) {
    setInputData((prevInputData) => {
      return { ...prevInputData, [e.target.name]: e.target.files[0] };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const validatedInputData = await  validateUpdateModelForm(inputData);
 
      try{
        const updatedModel = await modelActions.updateModel(param.model_id,validatedInputData);
      setInputData(updatedModel);
      setLoading(false);
      setError(false);
      }catch(err){
        
        console.error(err);
        setError(true);
        setLoading(false)
      }
      
    } catch (err) {
     
      alertActions.setShow(err.errors[0], 'warning');
      setLoading(false)
    }
  }

  function PageOne() {
    return (
      <PageWrapper>
        <Form className="row">
          <h5>Personal Details</h5>

          <Input
            type="text"
            md="4"
            label="First name"
            name="first_name"
            value={inputData.first_name}
            onChange={handlePersonalDetailsInputChange}
          />
          <Input
            type="text"
            md="4"
            label="Last name"
            name="last_name"
            value={inputData.last_name}
            onChange={handlePersonalDetailsInputChange}
          />
           <Input
            type="text"
            md="4"
            label="Card name"
            name="nickname"
            value={inputData.nickname}
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
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
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

          <h5>Experience</h5>
          <ExperienceForms
            value={inputData.Experiences}
            onChange={handleOnExperienceChange}
          />

          <h5>Profile images</h5>
          <ReuploadImageInput
          model_id={inputData.model_id}
            md="4"
            value={inputData.profile_img_1}
            onChange={handleProfileImageProfile}
            name="1"
            label="Close up"
          />

<ReuploadImageInput
          model_id={inputData.model_id}
            md="4"
            value={inputData.profile_img_2}
            onChange={handleProfileImageProfile}
            name="2"
            label="Profile"
          />

<ReuploadImageInput
          model_id={inputData.model_id}
            md="4"
            value={inputData.profile_img_3}
            onChange={handleProfileImageProfile}
            name="3"
            label="Middle"
          />

<ReuploadImageInput
          model_id={inputData.model_id}
            md="4"
            value={inputData.profile_img_4}
            onChange={handleProfileImageProfile}
            name="4"
            label="Full"
          />

<ReuploadImageInput
          model_id={inputData.model_id}
            md="4"
            value={inputData.profile_img_5}
            onChange={handleProfileImageProfile}
            name="5"
            label="Other"
          />

<ReuploadImageInput
          model_id={inputData.model_id}
            md="4"
            value={inputData.profile_img_6}
            onChange={handleProfileImageProfile}
            name="6"
            label="Other"
          />



          {/* <UploadImageInput
            md="4"
            value={inputData.profile_img[1]}
            onChange={handleFileInputChange}
            name="1"
            label="Profile Image 1"
          />

          <UploadImageInput
            md="4"
            value={inputData.profile_img[2]}
            onChange={handleFileInputChange}
            name="2"
            label="Profile Image 1"
          />

          <UploadImageInput
            md="4"
            value={inputData.profile_img[3]}
            onChange={handleFileInputChange}
            name="3"
            label="Profile Image 1"
          />

          <UploadImageInput
            md="4"
            value={inputData.profile_img[4]}
            onChange={handleFileInputChange}
            name="4"
            label="Profile Image 1"
          />

<UploadImageInput
            md="4"
            value={inputData.profile_img[5]}
            onChange={handleFileInputChange}
            name="5"
            label="Profile Image 1"
          /> */}

          <Col xs="12 d-flex justify-content-center mb-5">
            <Button
              onClick={() => setCurrentPage(2)}
              variant="light"
              type="button"
              className=" mb-3 text-primary w-25"
            >
              Next
            </Button>{" "}
          </Col>
        </Form>
      </PageWrapper>
    );
  }

  <h5>Address</h5>;

  function PageTwo() {
    return (
      <PageWrapper>
        <Form className="row">
          <h5>Measurement</h5>

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
            label="Collar"
            onChange={handleMeasurementsInputChange}
            name="collar"
            type="text"
            value={inputData.Measurement.collar}
          />
          <Input
            md="4"
            label="Around armpit"
            onChange={handleMeasurementsInputChange}
            name="around_armpit"
            type="text"
            value={inputData.Measurement.around_armpit}
          />
          <Input
            md="4"
            label="Around Thick To Ankle"
            onChange={handleMeasurementsInputChange}
            name="around_thick_to_ankle"
            type="text"
            value={inputData.Measurement.around_thick_to_ankle}
          />
          <Input
            md="4"
            label="Around arm to wrist 1"
            onChange={handleMeasurementsInputChange}
            name="around_arm_to_wrist1"
            type="text"
            value={inputData.Measurement.around_arm_to_wrist1}
          />
          <Input
            md="4"
            label="Around arm to wrist 2"
            onChange={handleMeasurementsInputChange}
            name="around_arm_to_wrist2"
            type="text"
            value={inputData.Measurement.around_arm_to_wrist2}
          />
          <Input
            md="4"
            label="Around arm to wrist 3"
            onChange={handleMeasurementsInputChange}
            name="around_arm_to_wrist3"
            type="text"
            value={inputData.Measurement.around_arm_to_wrist3}
          />
          <Input
            md="6"
            label="Arm length 1"
            onChange={handleMeasurementsInputChange}
            name="arm_length1"
            type="text"
            value={inputData.Measurement.arm_length1}
          />
          <Input
            md="6"
            label="Arm length 2"
            onChange={handleMeasurementsInputChange}
            name="arm_length2"
            type="text"
            value={inputData.Measurement.arm_length2}
          />
          <Input
            md="4"
            label="Trousers length"
            onChange={handleMeasurementsInputChange}
            name="trousers_length"
            type="text"
            value={inputData.Measurement.trousers_length}
          />
          <Input
            md="4"
            label="Chest height"
            onChange={handleMeasurementsInputChange}
            name="chest_height"
            type="text"
            value={inputData.Measurement.chest_height}
          />
          <Input
            md="4"
            label="Chest width"
            onChange={handleMeasurementsInputChange}
            name="chest_width"
            type="text"
            value={inputData.Measurement.chest_width}
          />
          <Input
            md="4"
            label="Waist"
            onChange={handleMeasurementsInputChange}
            name="waist"
            type="text"
            value={inputData.Measurement.waist}
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
            label="Shoulder"
            onChange={handleMeasurementsInputChange}
            name="shoulder"
            type="text"
            value={inputData.Measurement.shoulder}
          />
          <Input
            md="6"
            label="Front shoulder"
            onChange={handleMeasurementsInputChange}
            name="front_shoulder"
            type="text"
            value={inputData.Measurement.front_shoulder}
          />
          <Input
            md="6"
            label="Front length"
            onChange={handleMeasurementsInputChange}
            name="front_length"
            type="text"
            value={inputData.Measurement.front_length}
          />
          <Input
            md="6"
            label="Back shoulder"
            onChange={handleMeasurementsInputChange}
            name="back_shoulder"
            type="text"
            value={inputData.Measurement.back_shoulder}
          />
          <Input
            md="6"
            label="Back length"
            onChange={handleMeasurementsInputChange}
            name="back_length"
            type="text"
            value={inputData.Measurement.back_length}
          />
          <Input
            md="4"
            label="Crotch"
            onChange={handleMeasurementsInputChange}
            name="crotch"
            type="text"
            value={inputData.Measurement.crotch}
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
            label="Bra size"
            onChange={handleMeasurementsInputChange}
            name="bra_size"
            type="text"
            value={inputData.Measurement.bra_size}
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
          {!fetchedModel.approved && <Select
            md="4"
            label="Approve"
            onChange={handlePersonalDetailsInputChange}
            name="approved"
            options={approvedOptions}
            value={inputData.approved}
          />}

          <Col xs="12 d-flex justify-content-center mb-5">
            <Button
              onClick={() => setCurrentPage(1)}
              variant="light"
              type="button"
              className="text-primary w-25"
            >
              Previous
            </Button>{" "}
            <Button onClick={handleSubmit} variant="light text-primary mx-4 w-25">
              Update
            </Button>
          </Col>
        </Form>
      </PageWrapper>
    );
  }
  if (!loading) {
    if (error) {
      return (
        <PageWrapper>
          <Error />
        </PageWrapper>
      );
    }
    if (currentPage === 1) {
      return PageOne();
    }
    if (currentPage === 2) {
      return PageTwo();
    }
  } else {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }
}
