pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Patient{
    
    uint256 public index=0;
    
    struct Records {
    string dname;
    string reason;
    string visitedDate;
    string ipfs;
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
    mapping(address=>patient) patients;
    mapping(address=>bool) isPatient;

    
    function addRecord(string memory _dname,string memory _reason,string memory _visitedDate,string memory _ipfs) public{
        require(isPatient[msg.sender],"User Not registered");
        patients[msg.sender].records.push(Records(_dname,_reason,_visitedDate,_ipfs));
    }
    
    function addPatient(string memory _name,string memory _phone,string memory _gender,string memory _dob,string memory _bloodgroup) public {
        require(!isPatient[msg.sender],"Already Patient account exists");
        patientList.push(msg.sender);
        index = index + 1;
        isPatient[msg.sender]=true;
        patients[msg.sender].id=index;
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
    
    function getPatientRecords(address _addr) public view returns(string[] memory _dname,string[] memory _reason,string[] memory _visitedDate,string[] memory ipfs){
        require(isPatient[_addr],"patient not signed in to our network");
        require(patients[_addr].records.length>0,"patient record doesn't exist");
        string[] memory Dname = new string[](patients[_addr].records.length);
        string[] memory Reason = new string[](patients[_addr].records.length);
        string[] memory VisDat = new string[](patients[_addr].records.length);
        string[] memory IPFS = new string[](patients[_addr].records.length);
        for(uint256 i=0;i<patients[_addr].records.length;i++){
            Dname[i]=patients[_addr].records[i].dname;
            Reason[i]=patients[_addr].records[i].reason;
            VisDat[i]=patients[_addr].records[i].visitedDate;
            IPFS[i]=patients[_addr].records[i].ipfs;
        }
        return(Dname,Reason,VisDat,IPFS);
    }
    

}