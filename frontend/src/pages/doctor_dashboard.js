import react from 'react'

function DocDashboard(){
    return(
        <div className ="dashboard">
            <h1>
                Meet Your Patient
            </h1>
            <span>Examine your Patients Record Everywhere</span>
            <div className="details">
                <p>
                    <b>Name :</b> <span></span><br></br>
                    <b>Address :</b>
                </p>
            </div>

            <div className="patient_details">
                <h1>Your Patients</h1>
            </div>

            <div className = "ask for permission">
                Get New Patient's Record :
                
            </div>
        
        </div>
    )
}
export default DocDashboard;