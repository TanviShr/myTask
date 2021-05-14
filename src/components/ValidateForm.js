const ValidateForm = (values) => {
    let errors = {};
    if(!values.Name){
        errors.Name = "Name is required."
    }else if (values.Name.length < 4){
        errors.Name = "Name must have at least 3 characters."
    }
    if(!values.Phone){
        errors.Phone = "Phone No is required."
    }else if (values.Phone.length !== 10){
        errors.Phone = "Phone number entered is invalid."
    }
    if(!values.Zipcode){
        errors.Zipcode = "Zipcode is required."
    }else if (values.Zipcode.length < 5){
        errors.Zipcode = "Zip Code entered is invalid."
    }
    if(!values.City){
        errors.City = "City is required."
    }
    if(!values.Username){
        errors.Username = "Username is required."
    }
    if(!values.Address){
        errors.Address = "Address is required."
    }
    if(!values.Email){
        errors.Email = "Email is required."
    }else if(!/\S+@\S+\.\S+/.test(values.Email)){
        errors.Email ="Email is invalid"
    }
    if(!values.Password){
        errors.Password = "Password is required."
    }else if(values.Password.length < 5){
        errors.Password = "Password must be more than five characters"
    }
    return errors;
}

export default ValidateForm

