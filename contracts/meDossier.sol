
pragma solidity >=0.4.22 <0.9.0;

contract meDossier{
    
    uint256 public pindex=0;
    uint256 public dindex=0;
    
    struct Records {
    string dname;
    string reason;
    string visitedDate;
    string ipfs;
    }

    struct doctor {
        uint256 id;
        string name;
        string contact;
        string hname;
        string faculty;
        address addr;
        bool isApproved;
    }
    
    struct patient{
        uint256 id;
        string name;
        string phone;
        string gender;
        string dob;
        string bloodgroup;
        Records[] records;
        address addr;
    }
 address[] private patientList;
    address[] public doctorList;

    mapping(address=>patient) patients;
    mapping(address=>doctor) doctors;
    mapping(address=>bool) isPatient;
    mapping(address=>bool) isDoctor;

    mapping(address=>mapping(address=>bool)) Authorized;


    function addRecord(string memory _dname,string memory _reason,string memory _visitedDate,string memory _ipfs, address addr) public{
        require(isPatient[addr],"No patient found at the given address");
        
        if(Authorized[addr][msg.sender] || msg.sender == addr){
                patients[addr].records.push(Records(_dname,_reason,_visitedDate,_ipfs));
        }
        else 
        revert("Record cannot be added ");
       
       
        // require(Authorized[addr][msg.sender],"You do not have permission to add records!");
        // require(isPatient[addr],"User Not registered");
        // patients[addr].records.push(Records(_dname,_reason,_visitedDate,_ipfs));
    }
    
    function addPatient(string memory _name,string memory _phone,string memory _gender,string memory _dob,string memory _bloodgroup) public {
        require(!isPatient[msg.sender],"Already Patient account exists");
        patientList.push(msg.sender);
        pindex = pindex + 1;
        isPatient[msg.sender]=true;
        patients[msg.sender].id=pindex;
        patients[msg.sender].name=_name;
        patients[msg.sender].phone=_phone;
        patients[msg.sender].gender=_gender;
        patients[msg.sender].dob=_dob;
        patients[msg.sender].bloodgroup=_bloodgroup;
        patients[msg.sender].addr=msg.sender;
        
    }
    
    function getPatientDetails(address _addr) public view returns(string memory _name,string memory _phone,string memory _gender,string memory _dob,string memory _bloodgroup){
        require(isPatient[_addr],"No Patients found at the given address");
        patient memory pat = patients[_addr];
        return (pat.name,pat.phone,pat.gender,pat.dob,pat.bloodgroup);
    }
    
     
     function getrecordlist(address _addr)  public view returns (uint256 ){
     
     return (patients[_addr].records.length);
     }
    
    function getPatientRecords(address _addr, uint256 _id) public view 
    returns(string memory dname, string memory reason ,string memory visitedDate, string memory ipfs){
        require(isPatient[_addr],"No patient found at the given address");
        if(Authorized[_addr][msg.sender] || msg.sender == _addr){
                return( patients[_addr].records[_id].dname,patients[_addr].records[_id].reason,
                patients[_addr].records[_id].visitedDate,patients[_addr].records[_id].ipfs
                    );
        }
        else 
        revert("Record cannot be accessed");
    }



    function addDoctor(string memory _name,string memory _hname,string memory _faculty,string memory _contact) public {
        require(!isDoctor[msg.sender],"Already Registered");
        address _addr = msg.sender;
        doctorList.push(_addr);

        dindex = dindex + 1;
        isDoctor[_addr]=true;
        doctors[_addr]=doctor(dindex,_name,_contact,_hname,_faculty,_addr,true);
    }
    
    function getDoctorbyId(uint256 _id) public view returns(uint256 id,string memory name , string memory contact ,string memory hname ,string memory faculty ,address addr , bool isApproved)  {
        uint256 i=0;
        for(i = 0;i<doctorList.length;i++){
        if(doctors[doctorList[i]].id==_id){
            break;
        }
    }    
        require(doctors[doctorList[i]].id==_id,"Doctor ID doesn't exists");
        doctor memory doc = doctors[doctorList[i]];
        return (doc.id,doc.name,doc.contact,doc.hname,doc.faculty,doc.addr, doc.isApproved);
    }

        function getDoctorbyName(string memory _name) public view returns(uint256 id,string memory name , string memory contact ,string memory hname ,string memory faculty ,address addr , bool isApproved)  {
        uint256 i=0;
        for(i = 0;i<doctorList.length;i++){
        if(keccak256(bytes(doctors[doctorList[i]].name)) == keccak256(bytes(_name))){
            break;
        }
    }    
        require(keccak256(bytes(doctors[doctorList[i]].name)) == keccak256(bytes(_name)),"Doctor doesn't exists with the given name");
        doctor memory doc = doctors[doctorList[i]];
        return (doc.id,doc.name,doc.contact,doc.hname,doc.faculty,doc.addr, doc.isApproved);
    }
    

    function getDoctorByAddress(address _address) public view returns(uint256 id,string memory name , string memory contact ,string memory hname ,string memory faculty ,address addr , bool isApproved) {
        require(doctors[_address].isApproved,"Doctor is not Approved or doesn't exist");
        doctor memory doc = doctors[_address];
        return (doc.id,doc.name,doc.contact,doc.hname,doc.faculty,doc.addr,doc.isApproved);
    }  

//Give access to certain address
    function grantAccess(address _addr) public returns (bool success)
    {   require(msg.sender != _addr,"You cannot add yourself");
        require(!Authorized[msg.sender][_addr],"User is already authorized");
        Authorized[msg.sender][_addr] = true;
        return true;
    }

//Revoke access of patient records fromcertain address
      function revoke_access(address _addr)  public returns (bool success){
        require(msg.sender!=_addr,"You can't remove yourself");
        require(Authorized[msg.sender][_addr],"User is not authorized yet");
        Authorized[msg.sender][_addr] = false;
        return true;
    }
    

}
