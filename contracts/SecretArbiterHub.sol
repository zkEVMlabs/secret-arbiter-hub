// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretArbiterHub is SepoliaConfig {
    using FHE for *;
    
    struct Dispute {
        euint32 disputeId;
        euint32 amount;
        euint32 arbitratorCount;
        euint32 votesForClaimant;
        euint32 votesForRespondent;
        ebool isResolved;
        ebool isActive;
        string description;
        address claimant;
        address respondent;
        address[] arbitrators;
        uint256 createdAt;
        uint256 deadline;
        mapping(address => ebool) arbitratorVotes;
        mapping(address => ebool) hasVoted;
    }
    
    struct Arbitrator {
        euint32 reputation;
        euint32 casesResolved;
        ebool isActive;
        address arbitratorAddress;
        string name;
        string specialization;
    }
    
    struct Evidence {
        euint32 evidenceId;
        string evidenceHash;
        address submitter;
        uint256 timestamp;
        ebool isVerified;
    }
    
    mapping(uint256 => Dispute) public disputes;
    mapping(address => Arbitrator) public arbitrators;
    mapping(uint256 => Evidence[]) public disputeEvidence;
    mapping(address => euint32) public userReputation;
    
    uint256 public disputeCounter;
    uint256 public evidenceCounter;
    
    address public owner;
    address public verifier;
    
    // Events
    event DisputeCreated(uint256 indexed disputeId, address indexed claimant, address indexed respondent);
    event EvidenceSubmitted(uint256 indexed disputeId, uint256 indexed evidenceId, address indexed submitter);
    event VoteCast(uint256 indexed disputeId, address indexed arbitrator, bool vote);
    event DisputeResolved(uint256 indexed disputeId, bool claimantWins);
    event ArbitratorRegistered(address indexed arbitrator, string name);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createDispute(
        address _respondent,
        string memory _description,
        uint256 _deadline,
        externalEuint32 _amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(_respondent != address(0), "Invalid respondent address");
        require(_respondent != msg.sender, "Cannot dispute with yourself");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        uint256 disputeId = disputeCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        
        Dispute storage dispute = disputes[disputeId];
        dispute.disputeId = FHE.asEuint32(0); // Will be set properly later
        dispute.amount = internalAmount;
        dispute.arbitratorCount = FHE.asEuint32(0);
        dispute.votesForClaimant = FHE.asEuint32(0);
        dispute.votesForRespondent = FHE.asEuint32(0);
        dispute.isResolved = FHE.asEbool(false);
        dispute.isActive = FHE.asEbool(true);
        dispute.description = _description;
        dispute.claimant = msg.sender;
        dispute.respondent = _respondent;
        dispute.createdAt = block.timestamp;
        dispute.deadline = _deadline;
        
        emit DisputeCreated(disputeId, msg.sender, _respondent);
        return disputeId;
    }
    
    function registerArbitrator(
        string memory _name,
        string memory _specialization
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_specialization).length > 0, "Specialization cannot be empty");
        require(arbitrators[msg.sender].arbitratorAddress == address(0), "Arbitrator already registered");
        
        arbitrators[msg.sender] = Arbitrator({
            reputation: FHE.asEuint32(100), // Initial reputation
            casesResolved: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            arbitratorAddress: msg.sender,
            name: _name,
            specialization: _specialization
        });
        
        emit ArbitratorRegistered(msg.sender, _name);
    }
    
    function assignArbitrators(
        uint256 _disputeId,
        address[] memory _arbitratorAddresses
    ) public onlyVerifier {
        require(_arbitratorAddresses.length > 0, "Must assign at least one arbitrator");
        require(_arbitratorAddresses.length <= 5, "Cannot assign more than 5 arbitrators");
        
        Dispute storage dispute = disputes[_disputeId];
        require(dispute.claimant != address(0), "Dispute does not exist");
        
        for (uint256 i = 0; i < _arbitratorAddresses.length; i++) {
            address arbitrator = _arbitratorAddresses[i];
            require(arbitrators[arbitrator].arbitratorAddress != address(0), "Arbitrator not registered");
            require(arbitrators[arbitrator].isActive == FHE.asEbool(true), "Arbitrator not active");
            
            dispute.arbitrators.push(arbitrator);
            dispute.arbitratorCount = FHE.add(dispute.arbitratorCount, FHE.asEuint32(1));
        }
    }
    
    function submitEvidence(
        uint256 _disputeId,
        string memory _evidenceHash
    ) public returns (uint256) {
        require(disputes[_disputeId].claimant != address(0), "Dispute does not exist");
        require(disputes[_disputeId].isActive == FHE.asEbool(true), "Dispute is not active");
        require(
            msg.sender == disputes[_disputeId].claimant || 
            msg.sender == disputes[_disputeId].respondent,
            "Only parties can submit evidence"
        );
        require(bytes(_evidenceHash).length > 0, "Evidence hash cannot be empty");
        
        uint256 evidenceId = evidenceCounter++;
        
        Evidence memory evidence = Evidence({
            evidenceId: FHE.asEuint32(0), // Will be set properly later
            evidenceHash: _evidenceHash,
            submitter: msg.sender,
            timestamp: block.timestamp,
            isVerified: FHE.asEbool(false)
        });
        
        disputeEvidence[_disputeId].push(evidence);
        
        emit EvidenceSubmitted(_disputeId, evidenceId, msg.sender);
        return evidenceId;
    }
    
    function castVote(
        uint256 _disputeId,
        ebool _voteForClaimant
    ) public {
        require(disputes[_disputeId].claimant != address(0), "Dispute does not exist");
        require(disputes[_disputeId].isActive == FHE.asEbool(true), "Dispute is not active");
        require(block.timestamp <= disputes[_disputeId].deadline, "Voting deadline has passed");
        require(arbitrators[msg.sender].arbitratorAddress != address(0), "Not a registered arbitrator");
        require(arbitrators[msg.sender].isActive == FHE.asEbool(true), "Arbitrator not active");
        require(disputes[_disputeId].hasVoted[msg.sender] == FHE.asEbool(false), "Already voted");
        
        // Check if arbitrator is assigned to this dispute
        bool isAssigned = false;
        for (uint256 i = 0; i < disputes[_disputeId].arbitrators.length; i++) {
            if (disputes[_disputeId].arbitrators[i] == msg.sender) {
                isAssigned = true;
                break;
            }
        }
        require(isAssigned, "Arbitrator not assigned to this dispute");
        
        disputes[_disputeId].arbitratorVotes[msg.sender] = _voteForClaimant;
        disputes[_disputeId].hasVoted[msg.sender] = FHE.asEbool(true);
        
        // Update vote counts
        if (_voteForClaimant == FHE.asEbool(true)) {
            disputes[_disputeId].votesForClaimant = FHE.add(disputes[_disputeId].votesForClaimant, FHE.asEuint32(1));
        } else {
            disputes[_disputeId].votesForRespondent = FHE.add(disputes[_disputeId].votesForRespondent, FHE.asEuint32(1));
        }
        
        emit VoteCast(_disputeId, msg.sender, true); // Vote will be decrypted off-chain
    }
    
    function resolveDispute(uint256 _disputeId) public onlyVerifier {
        require(disputes[_disputeId].claimant != address(0), "Dispute does not exist");
        require(disputes[_disputeId].isActive == FHE.asEbool(true), "Dispute is not active");
        require(disputes[_disputeId].isResolved == FHE.asEbool(false), "Dispute already resolved");
        
        // Check if all arbitrators have voted or deadline has passed
        bool allVoted = true;
        for (uint256 i = 0; i < disputes[_disputeId].arbitrators.length; i++) {
            if (disputes[_disputeId].hasVoted[disputes[_disputeId].arbitrators[i]] == FHE.asEbool(false)) {
                allVoted = false;
                break;
            }
        }
        
        require(
            allVoted || block.timestamp > disputes[_disputeId].deadline,
            "Cannot resolve dispute yet"
        );
        
        disputes[_disputeId].isResolved = FHE.asEbool(true);
        disputes[_disputeId].isActive = FHE.asEbool(false);
        
        // Update arbitrator reputations and case counts
        for (uint256 i = 0; i < disputes[_disputeId].arbitrators.length; i++) {
            address arbitrator = disputes[_disputeId].arbitrators[i];
            arbitrators[arbitrator].casesResolved = FHE.add(arbitrators[arbitrator].casesResolved, FHE.asEuint32(1));
        }
        
        emit DisputeResolved(_disputeId, true); // Result will be decrypted off-chain
    }
    
    function updateReputation(address _user, euint32 _reputation) public onlyVerifier {
        require(_user != address(0), "Invalid user address");
        userReputation[_user] = _reputation;
        emit ReputationUpdated(_user, 0); // FHE.decrypt(_reputation) - will be decrypted off-chain
    }
    
    function verifyEvidence(
        uint256 _disputeId,
        uint256 _evidenceId,
        ebool _isVerified
    ) public onlyVerifier {
        require(_disputeId < disputeCounter, "Dispute does not exist");
        require(_evidenceId < disputeEvidence[_disputeId].length, "Evidence does not exist");
        
        disputeEvidence[_disputeId][_evidenceId].isVerified = _isVerified;
    }
    
    function getDisputeInfo(uint256 _disputeId) public view returns (
        string memory description,
        address claimant,
        address respondent,
        uint8 amount,
        uint8 arbitratorCount,
        uint8 votesForClaimant,
        uint8 votesForRespondent,
        bool isResolved,
        bool isActive,
        uint256 createdAt,
        uint256 deadline
    ) {
        Dispute storage dispute = disputes[_disputeId];
        return (
            dispute.description,
            dispute.claimant,
            dispute.respondent,
            0, // FHE.decrypt(dispute.amount) - will be decrypted off-chain
            0, // FHE.decrypt(dispute.arbitratorCount) - will be decrypted off-chain
            0, // FHE.decrypt(dispute.votesForClaimant) - will be decrypted off-chain
            0, // FHE.decrypt(dispute.votesForRespondent) - will be decrypted off-chain
            false, // FHE.decrypt(dispute.isResolved) - will be decrypted off-chain
            false, // FHE.decrypt(dispute.isActive) - will be decrypted off-chain
            dispute.createdAt,
            dispute.deadline
        );
    }
    
    function getArbitratorInfo(address _arbitrator) public view returns (
        string memory name,
        string memory specialization,
        uint8 reputation,
        uint8 casesResolved,
        bool isActive
    ) {
        Arbitrator storage arbitrator = arbitrators[_arbitrator];
        return (
            arbitrator.name,
            arbitrator.specialization,
            0, // FHE.decrypt(arbitrator.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(arbitrator.casesResolved) - will be decrypted off-chain
            false // FHE.decrypt(arbitrator.isActive) - will be decrypted off-chain
        );
    }
    
    function getUserReputation(address _user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[_user]) - will be decrypted off-chain
    }
    
    function getDisputeArbitrators(uint256 _disputeId) public view returns (address[] memory) {
        return disputes[_disputeId].arbitrators;
    }
    
    function getDisputeEvidenceCount(uint256 _disputeId) public view returns (uint256) {
        return disputeEvidence[_disputeId].length;
    }
    
    function getEvidenceInfo(
        uint256 _disputeId,
        uint256 _evidenceIndex
    ) public view returns (
        string memory evidenceHash,
        address submitter,
        uint256 timestamp,
        bool isVerified
    ) {
        require(_disputeId < disputeCounter, "Dispute does not exist");
        require(_evidenceIndex < disputeEvidence[_disputeId].length, "Evidence does not exist");
        
        Evidence storage evidence = disputeEvidence[_disputeId][_evidenceIndex];
        return (
            evidence.evidenceHash,
            evidence.submitter,
            evidence.timestamp,
            false // FHE.decrypt(evidence.isVerified) - will be decrypted off-chain
        );
    }
    
    function withdrawFunds(uint256 _disputeId) public {
        require(disputes[_disputeId].claimant != address(0), "Dispute does not exist");
        require(disputes[_disputeId].isResolved == FHE.asEbool(true), "Dispute not resolved");
        require(
            msg.sender == disputes[_disputeId].claimant || 
            msg.sender == disputes[_disputeId].respondent,
            "Only parties can withdraw funds"
        );
        
        // In a real implementation, funds would be transferred based on decrypted vote results
        // For now, we'll mark the dispute as inactive
        disputes[_disputeId].isActive = FHE.asEbool(false);
    }
}
