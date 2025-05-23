import "./Dashboard.css";
import Choice from "../../component/Choice/Choice";
import React from 'react';
import profileImage from '../../assets/profile.jpg';

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="window">
      <div className="leftSide">
        <div className="header">
          <img src="/Lumora.svg" alt="" />
          <p>Lumora</p>
        </div>
        <Choice text="Account" icon1={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M21.5 16.052V7.948a4.14 4.14 0 0 0-1.236-2.945a4.25 4.25 0 0 0-2.985-1.22H6.72a4.25 4.25 0 0 0-2.985 1.22A4.14 4.14 0 0 0 2.5 7.948v8.104c0 1.105.445 2.164 1.236 2.945a4.25 4.25 0 0 0 2.985 1.22H17.28c1.12 0 2.193-.44 2.985-1.22a4.14 4.14 0 0 0 1.236-2.945"/><path d="M8.552 12.14a2.054 2.054 0 1 0 0-4.108a2.054 2.054 0 0 0 0 4.108m3.081 3.828c0-.812-.324-1.59-.902-2.165a3.09 3.09 0 0 0-4.358 0a3.05 3.05 0 0 0-.902 2.165m9.097-7.049h3.594M14.568 12h1.54m-1.54 3.081h3.594"/></g></svg>} ></Choice>
        <Choice text="Dashboard" icon1={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"/></svg>} icon2={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m10 17l5-5m0 0l-5-5"/></svg>}/>
        <Choice text="Shop" icon1={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9"/><path strokeMiterlimit="16" d="M14.833 21v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6"/><path d="m21.818 9.364l-1.694-5.929A.6.6 0 0 0 19.547 3H15.5l.475 5.704a.58.58 0 0 0 .278.45c.39.233 1.152.663 1.747.846c1.016.313 2.5.2 3.346.096a.57.57 0 0 0 .472-.732Z"/><path d="M14 10c.568-.175 1.288-.574 1.69-.812a.58.58 0 0 0 .28-.549L15.5 3h-7l-.47 5.639a.58.58 0 0 0 .28.55c.402.237 1.122.636 1.69.811c1.493.46 2.507.46 4 0Z"/><path d="m3.876 3.435l-1.694 5.93a.57.57 0 0 0 .472.73c.845.105 2.33.217 3.346-.095c.595-.183 1.358-.613 1.747-.845a.58.58 0 0 0 .278-.451L8.5 3H4.453a.6.6 0 0 0-.577.435Z"/></g></svg>} ></Choice>
        <Choice text="Orders" icon1={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="17" x="5" y="4" rx="2"/><path strokeLinecap="round" d="M9 9h6m-6 4h6m-6 4h4"/></g></svg>} ></Choice>
        <Choice text="Withdrawal" icon1={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22 2H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1M7 20v-2a2 2 0 0 1 2 2Zm10 0h-2a2 2 0 0 1 2-2Zm0-4a4 4 0 0 0-4 4h-2a4 4 0 0 0-4-4V8h10Zm4-6h-2V7a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3H3V4h18Zm-9 5a3 3 0 1 0-3-3a3 3 0 0 0 3 3m0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1"/></svg>} ></Choice>
      </div>
      <div className="rightSide">
        <div className="header">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="20" strokeDashoffset="20" d="M21 12h-17.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0"/></path><path strokeDasharray="12" strokeDashoffset="12" d="M3 12l7 7M3 12l7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0"/></path></g></svg>
            <p>Back</p>
          </div>
          <div className="rightElement">
            <div className="notification"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2 2 0 0 1-.212-.894V9a5 5 0 0 0-5-5"/></g></svg></div>
            <div className="photo"><img src={profileImage} alt="" /></div>
          </div>
        </div>
        
        <div className="title">Dashboard</div>
        
        <div className="statsContainer">
          <div className="statCard">
            <div className="statHeader">
              <span className="statLabel">Products</span>
              <span className="statDate">Today</span>
            </div>
            <div className="statValue">9460</div>
          </div>
          
          <div className="statCard">
            <div className="statHeader">
              <span className="statLabel">Hire vs Cancel</span>
              <span className="statDate">Today</span>
            </div>
            <div className="pieChartContainer">
              <div className="pieChart"></div>
            </div>
            <div className="chartLegend">
              <div className="legendItem">
                <div className="legendLabel">
                  <span className="legendColor" style={{backgroundColor: '#006AFF'}}></span>
                  <span className="legendText">in way</span>
                </div>
                <span className="legendPercentage">54%</span>
              </div>
              <div className="legendItem">
                <div className="legendLabel">
                  <span className="legendColor" style={{backgroundColor: '#52C93F'}}></span>
                  <span className="legendText">Delivered</span>
                </div>
                <span className="legendPercentage">20%</span>
              </div>
              <div className="legendItem">
                <div className="legendLabel">
                  <span className="legendColor" style={{backgroundColor: '#FF2727'}}></span>
                  <span className="legendText">Not delivered</span>
                </div>
                <span className="legendPercentage">26%</span>
              </div>
            </div>
          </div>
          
          <div className="statCard">
            <div className="statHeader">
              <span className="statLabel">Balance</span>
              <span className="statDate">Today</span>
            </div>
            <div className="statValue">$5660.00</div>
            <div className="statChange">
              <span className="arrow up">↑</span> 2.5%
            </div>
            <div className="statNote">Last week expenses: $22658.00</div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}