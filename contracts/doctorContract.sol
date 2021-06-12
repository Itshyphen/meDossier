pragma solidity >=0.4.22 <0.9.0;

contract Doctor  {
    uint256 public index;
    mapping(address=>bool) isDoctor;
    struct doctor {
        uint256 id;
        string name;
        string contact;
        address addr;
        bool isApproved;
    }
    mapping(address=>doctor) doctors;
    address[] public doctorList;
    
    
    function addDoctor(string memory _name,string memory _contact,address _addr) public {
        require(!isDoctor[_addr],"Already Registered");
        doctorList.push(_addr);
        index = index + 1;
        isDoctor[_addr]=true;
        doctors[_addr]=doctor(index,_name,_contact,_addr,true);
    }
    
    function getDoctorbyId(uint256 _id) public view returns(uint256 id,string memory name , string memory contact ,address addr , bool isApproved)  {
        uint256 i=0;
        for(;i<doctorList.length;i++){
        if(doctors[doctorList[i]].id==_id){
            break;
        }
    }    
        require(doctors[doctorList[i]].id==_id,"Doctor ID doesn't exists");
        doctor memory doc = doctors[doctorList[i]];
        return (doc.id,doc.name,doc.contact,doc.addr, doc.isApproved);
    }
    
    function getDoctorByAddress(address _address) public view returns(uint256 id,string memory name, string memory contact ,address addr , bool isApproved) {
        require(doctors[_address].isApproved,"Doctor is not Approved or doesn't exist");
        doctor memory doc = doctors[_address];
        return (doc.id,doc.name,doc.contact,doc.addr,doc.isApproved);
    }    
    
}
