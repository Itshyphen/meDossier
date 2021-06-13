//SPDX License Identifier: MIT

pragma solidity ^0.8.4;
contract Register{
    
    struct Records{
        string d_name;
        string hash;
        string hospital;
        uint256 visiteddate;
    }
    
    struct patient{
        string name;
        uint age;
        bool registered;
        Records[] record;
        address [] doctorPermissions;

    }
    struct doctor{
        string name;
        string faculty;
        bool registered;
    } 
    
    address[] patientlist; //Not necessary
    address[]doctorlist;
    
    mapping(address=>patient)  public patients;
    mapping(address=>doctor) doctors;
    
    event patientregistered(address patientaddr);
    event doctorregistered(address doctoraddr);

modifier onlyregisteredpatient(){
    require(patients[msg.sender].registered == true,"Not registered as patient");
                _; }

//  To Register the patient
    function registerpatient(string memory name,uint age) public  {
        require(!patients[msg.sender].registered,"Already registered as patient");

        patients[msg.sender].name = name;
        patients[msg.sender].age = age;
        patients[msg.sender].registered = true;
        patientlist.push(msg.sender);
        emit patientregistered(msg.sender);
        
    }
    // To Register the doctor
    function registerdoctor(string memory _name, string memory _faculty) public{
    require(doctors[msg.sender].registered,"Already registered as doctor");

        doctors[msg.sender].name = _name;
        doctors[msg.sender].faculty = _faculty;
        doctors[msg.sender].registered = true;
        doctorlist.push(msg.sender);
        emit doctorregistered(msg.sender);
    }
    
    // To Get patient details 
    function getpatient( address addr) view public returns(string memory name, uint age){
        require(patients[addr].registered,"Not registered as patient");
        return (patients[addr].name, patients[addr].age);
    }
    
    //To Get doctor details 
    function getdoctor(address addr) view public returns(string memory name, string memory faculty){
        require(doctors[addr].registered ,"Not registered as doctor");
        return(doctors[addr].name, doctors[addr].faculty);
    }
    

    function getpatientlist() public view returns(address[]  memory){
        return patientlist;
    }
     function getdoctornum() public view returns(address[] memory){
        return doctorlist;
    }
    //To grant access to the doctor 
    function grant_access(address addr)  public onlyregisteredpatient  {
            require(doctors[addr].registered == true,"No such address is registered as doctor");
            patients[msg.sender].doctorPermissions.push(addr);
    }
    
}