// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Owner{
    address private owner;
    
    event transferOwnerEvent(address indexed _prevOwner, address indexed _newOwner);
    
    constructor(){
        owner = msg.sender;
        emit transferOwnerEvent(address(0), msg.sender);
    }
    
    modifier isOwner(){
        require(msg.sender == owner);
        _;
    }
    
    function transferOwner(address _address) external isOwner{
        owner = _address;
        emit transferOwnerEvent(msg.sender, _address);
    }
}

contract Picture is Owner{
    
    event pictureCreated(string name, string pixels);
    
    struct PictureStats{
        string name;
        string pixels;
        mapping (string => uint) stats;
    }
    
    mapping (string => uint) defaultStats;
    
    mapping (uint => address) idToOwner;
    
    mapping (address => uint) ownerToPictureCount;
    
    uint private pictureIndex = 0;
    mapping (uint => PictureStats) allPictures;
    
    
    function createPicture(string calldata pixels, string calldata _name) external{
        
  
        PictureStats storage stats = allPictures[pictureIndex++];
        stats.name = _name;
        stats.pixels = pixels;
        
        idToOwner[pictureIndex] = msg.sender;
        ownerToPictureCount[msg.sender]++;
        
        
        emit pictureCreated(stats.name, stats.pixels);
    }
    
    function getPicture(uint _id) external view returns(string memory){
        return allPictures[_id].pixels;
    }
    
    function getPictureCount(address _address) external view returns(uint){
        return ownerToPictureCount[_address];
    }
    
    function getPictureOwner(uint _id) external view returns(address){
        return idToOwner[_id];
    }
    
}


contract PictureCompare is Picture{
    using StringHelpers for string;
    
    event Compare(uint indexed _attackerId, uint indexed _defenderId, string _stat, bool won);

    
    modifier ownsPicture(uint _id){
        require(msg.sender == idToOwner[_id]);
        _;
    }
    
    modifier notOwnsPicture(uint _id){
        require(msg.sender != idToOwner[_id]);
        _;
    }
    
    function compare(uint _id1, uint _id2, string calldata _stat) external ownsPicture(_id1) notOwnsPicture(_id2){
        if(allPictures[_id1].stats[_stat] > 0){
            bool won = allPictures[_id1].stats[_stat] > allPictures[_id2].stats[_stat];
            emit Compare(_id1, _id2, _stat, won);
        }
    }
    
    
}


library StringHelpers{
    function compare(string calldata a, string calldata b) external pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}