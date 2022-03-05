import { Form } from "react-bootstrap";
import DatePicker from 'react-multi-date-picker'
import { useEffect, useState } from "react";
export default function DateInput({label, md, value, onChange}) {
    const [inputValue, setInputValue] = useState(Array.isArray(value) ? value : Array());

    function handleChange(dates){
       
      
       
       
        const tempValues = dates.map(date => new Date(date.year, date.month.index, date.day));
        onChange(tempValues)
        setInputValue(tempValues)
    }

   

    
  return (
    <Form.Group className={`mb-3 col-12 col-md-${md}`}>
        <Form.Label className="d-block">{label}</Form.Label>
        <DatePicker sort containerStyle={{width: '100%'}} onChange={handleChange} value={inputValue}   inputClass="form-control w-100 d-block" multiple format="DD MMMM"/>

    </Form.Group>
  )
}
