import "./Profile.css"
import Choice from "../../component/Choice/Choice"
import profileImage from '../../assets/profile.jpg';
import Field from "../../component/Field/Field";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from "react";

export default function Profile() {
const [formData, setFormData] = useState({
    name:"Aoues charaf eddine",
    Gender:"Male",
    Date:"june 26th, 2005",
    Nationality:"Algerian",
    Phone:"0784558544",
    Email:"charafaoues@gmail.com"

});

const handleChange = (e)=>{
    const {name,value}=e.target
    setFormData(prev =>({
        ...prev,
        [name]:value
    }))

    console.log(formData.name)
}
  return (
    <div className="ProfilePage">
        <div className="window">
        <div className="leftSide">
            <div className="header">
                <img src="/Lumora.svg" alt="" />
                <p>Lumora</p>
            </div>
            <Choice text="Account" icon1={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21.5 16.052V7.948a4.14 4.14 0 0 0-1.236-2.945a4.25 4.25 0 0 0-2.985-1.22H6.72a4.25 4.25 0 0 0-2.985 1.22A4.14 4.14 0 0 0 2.5 7.948v8.104c0 1.105.445 2.164 1.236 2.945a4.25 4.25 0 0 0 2.985 1.22H17.28c1.12 0 2.193-.44 2.985-1.22a4.14 4.14 0 0 0 1.236-2.945"/><path d="M8.552 12.14a2.054 2.054 0 1 0 0-4.108a2.054 2.054 0 0 0 0 4.108m3.081 3.828c0-.812-.324-1.59-.902-2.165a3.09 3.09 0 0 0-4.358 0a3.05 3.05 0 0 0-.902 2.165m9.097-7.049h3.594M14.568 12h1.54m-1.54 3.081h3.594"/></g></svg>} icon2={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m10 17l5-5m0 0l-5-5"/></svg>}/>
        </div>
        <div className="rightSide">
            <div className="header">
                <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="20" stroke-dashoffset="20" d="M21 12h-17.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M3 12l7 7M3 12l7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0"/></path></g></svg>
                    <p>Back</p>
                </div>
                <div className="rightElement">
                    <div className="notification"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2 2 0 0 1-.212-.894V9a5 5 0 0 0-5-5"/></g></svg></div>
                    <div className="photo"><img src={profileImage} alt="" /></div>
                </div>
            </div>
            <p className="title">Personal Details</p>
            <div className="personalDetails">
                <div className="photo">
                    <img src={profileImage} alt="" />
                </div>
                
                <div className="information">
                    <div className="column">
                        
                        <Field fontSize="" textLabel="Name" focusColor="#333333" height="35px" value={formData.name} onChange={handleChange} name="name"/>
                        <Field fontSize="" textLabel="Gender" focusColor="#333333" height="35px" value={formData.Gender} onChange={handleChange} name="Gender"/>
                        <Field fontSize="" textLabel="Date of Birth" focusColor="#333333" height="35px" value={formData.Date} onChange={handleChange} name="Date"/>
                        <Button width="25%" variant="outlined" sx={{ color: "#F42D7E", height:"40px",border:"3px solid #F42D7E"}}>Apply changes</Button>
                    </div>
                    <div className="column">
                        <Field textLabel="Nationality" focusColor="#333333" height="35px" value={formData.Nationality} onChange={handleChange} name="Nationality"/>
                        <Field textLabel="Phone number" focusColor="#333333" height="35px" value={formData.Phone} onChange={handleChange} name="Phone"/>
                    </div>   
                </div>
            </div>
            
            <div className="accountInformation">
                <p className="title second">Account information</p>
                <p className="titleSecondary">Email</p>
                <div className="emailFeild">
                    <Field textLabel="Current Email" width="30%" focusColor="#333333" height="35px" value={formData.Email}/>
                    <Field textLabel="Change Email" width="30%" focusColor="#333333" height="35px" />
                    <Button width="25%" variant="outlined" sx={{ color: "#F42D7E", height:"40px",border:"3px solid #F42D7E"}}>Apply changes</Button>
                </div>
                <p className="titleSecondary">Password</p>
                <div className="passwordFeild">
                    <Field type="password" textLabel="Current password" width="25%" focusColor="#333333" height="35px"/>
                    <Field textLabel="New passowrd" width="25%" focusColor="#333333" height="35px"/>
                    <Field textLabel="Confirm password" width="25%" focusColor="#333333" height="35px"/>
                    <Button width="25%" variant="outlined" sx={{ color: "#F42D7E", height:"40px",border:"3px solid #F42D7E"}}>Apply changes</Button>
                </div>

            </div>
        </div>
    </div>
    </div>
    
            
  )
}
