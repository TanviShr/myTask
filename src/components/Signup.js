import {  Form, FormGroup, Label, Input} from 'reactstrap';
import React,{useState} from 'react'
import ValidateForm from './ValidateForm'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {useHistory} from 'react-router-dom'

const initialValues ={
  UserId:"",
  Name: "",
  Username:"",
  Address:"",
  City:"",
  Phone:"",
  Zipcode:"",
  Email:"",
  Password:""
}

function SignUp(){
      const [values, setValues] = useState(initialValues);
      const[errors, setErrors] = useState({})
      const [dataIsCorrect,setDataIsCorrect] = useState(false);
      let history = useHistory();
      const handleChange =(e) =>{
        const {name,value}= e.target;
        setValues({
          ...values,
          [name]:value,
        });
      };
      const handleSubmit = (e) => { 
        setErrors(ValidateForm(values));
        axios.post('https://jsonplaceholder.typicode.com/users',  {
          "UserId":1,          
          "Name":values.Name,
          "Username":values.Username,
          "Address":values.Address,
          "City":values.City,
          "Phone":values.Phone,
          "Zipcode":values.Zipcode, 
          "Email":values.Email
        })
        .then(response => {
          if(dataIsCorrect && Object.keys(errors).length === 0){
          console.log(response);
          let formData ={
            id:uuidv4(),
            Name: values.Name
          }
          localStorage.setItem("formData",JSON.stringify(formData))
          }
        }).catch((error) => {
          console.log(error);
        });
      
        setDataIsCorrect(true);
        if (dataIsCorrect && Object.keys(errors).length === 0) {
          history.push({
            pathname: '/Dashboard',
            search: '?UserId=1',  // query string
          });
        }
        e.preventDefault();

      };
      
  
    return (
        <Form style={{padding:"20px"}} className = "container" onSubmit={handleSubmit}>
          <FormGroup>
            <Label> Name</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "text" name ="Name" value={values.Name} 
            onChange={handleChange}
            placeholder = "Enter Name" />
            {errors.Name && <p style={{color:'green', fontSize:"12px"}}>{errors.Name}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Userame</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "text" name ="Username" value={values.Userame} 
            onChange={handleChange}
            placeholder = "Enter Username" />
            {errors.Username && <p style={{color:'green', fontSize:"12px"}}>{errors.Username}</p>}
           </FormGroup>
           <FormGroup>
            <Label>City</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "text" name ="City" value={values.City} 
            onChange={handleChange}
            placeholder = "Enter City" />
            {errors.City && <p style={{color:'green', fontSize:"12px"}}>{errors.City}</p>}
            </FormGroup>
            <FormGroup>
            <Label>Address</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "text" name ="Address" value={values.Address} 
            onChange={handleChange}
            placeholder = "Enter Address" />
            {errors.Address && <p style={{color:'green', fontSize:"12px"}}>{errors.Address}</p>}
            </FormGroup>
            <FormGroup>
            <Label>Phone No.</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "number" name ="Phone" value={values.Phone} 
            onChange={handleChange}
            placeholder = "Enter Phone No." />
            {errors.Phone && <p style={{color:'green', fontSize:"12px"}}>{errors.Phone}</p>}
            </FormGroup>
            <FormGroup>
            <Label>Zip Code</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "number" name ="Zipcode" value={values.Zipcode} 
            onChange={handleChange}
            placeholder = "Enter Zip Code" />
           {errors.Zipcode && <p style={{color:'green', fontSize:"12px"}}>{errors.Zipcode}</p>}
           </FormGroup>
           <FormGroup>
            <Label>Email</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "Email" name ="Email" value={values.Email} 
            onChange={handleChange}
            placeholder = "Enter Email" />
            {errors.Email && <p style={{color:'green', fontSize:"12px"}}>{errors.Email}</p>}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input style={{width:"60%"}} bsSize="sm" type = "password" name= "Password"value={values.Password} 
            onChange={handleChange}
            placeholder="Enter Password" />
            {errors.Password && <p style={{color:'green', fontSize:"12px"}}>{errors.Password}</p>}
            </FormGroup>
            <Input style={{width:"60%"}} bsSize="sm" type ="submit" value ="Sign Up"/>
        </Form>
    );
    
} 
export default SignUp