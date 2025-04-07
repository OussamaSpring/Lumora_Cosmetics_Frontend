

export default function Validation(data) {
    const errors={};

    const emial_forme= /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

    const password_forme=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if(data.email===""){
        errors.email="Email is not should be emepty ";
    }else if(!emial_forme.test(data.email)){
        errors.email="Email is not correct";
    }


    if(data.password===""){
        errors.password="password is not should be emepty ";
    }else if(!password_forme.test(data.password)){
        errors.email="password is not correct";
    }


    return errors;


    

  
}
