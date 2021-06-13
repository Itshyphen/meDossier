//SPDX License Identifier: MIT
pragma solidity ^0.8.4;
import "./Register.sol";

contract Store is Register{
    Register private  register;
    constructor(){
        register = new Register();

    }
    function addrecord(string memory _dname, string memory hospital, string memory _hash ,address addr) public{
        require(patients[addr].registered," Not registered as patients");
        
        
        patients[addr].record.push(Records(_dname,hospital,_hash,block.timestamp));
        
    }
    function getrecord( address addr,uint256 _id) public view returns(string memory dname , string memory hospital, string memory hash, uint256 visiteddate ){
        
        for (uint256 i = 0;i< patients[addr].doctorPermissions.length;i++){
                // To check if doctor's permission
            if(msg.sender ==patients[addr].doctorPermissions[i ]){
            return(
                patients[addr].record[_id].d_name,
            patients[addr].record[_id].hospital,
            patients[addr].record[_id].hash,
            patients[addr].record[_id].visiteddate
                );
                
            } //To check whether the caller is the patient itself 
                else if(msg.sender == addr){
            return( patients[addr].record[_id].d_name,
            patients[addr].record[_id].hospital,
            patients[addr].record[_id].hash,
            patients[addr].record[_id].visiteddate
                );

        }}
        
        revert("No access");

    }
    
}