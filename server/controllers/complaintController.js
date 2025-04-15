const Complaint = require('../models/Complaint');

// Function to generate unique registration number
const generateRegNo = () => {
  return `REG-${Date.now()}`;
};

// Handle the POST request to submit a complaint
const submitComplaint = async (req, res) => {
  try {
    const {
      userId,  // User ID should be sent from front-end (usually from the session or JWT)
      description,
      issueType,
      mobile,
      name,
      email,
      communicationAddress,
      locality,
      ward,
      zone,
      doorNo,
      fullAddress,
      attachments,
    } = req.body;

    // Generate a unique registration number
    const regNo = generateRegNo();

    // Create a new complaint document
    const newComplaint = new Complaint({
      regNo,
      userId,
      description,
      date: new Date(),
      status: 'Pending',
      issueType,
      mobile,
      name,
      email,
      communicationAddress,
      locality,
      ward,
      zone,
      doorNo,
      fullAddress,
      attachments, 
       // Store file names (URLs) for the attachments
    });

    // Save the complaint to the database
    const savedComplaint = await newComplaint.save();

    // Respond with the saved complaint data
    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully!',
      data: savedComplaint,
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting complaint.',
    });
  }
};

// Get complaints for a specific user
const getUserComplaints = async (req, res) => {
  try {
    const userEmail = req.params.userId; // User ID passed as a parameter

    // Fetch all complaints for the user
    const complaints = await Complaint.find({ userEmail });

    // Calculate counts for total, pending, and closed complaints
    const totalComplaints = complaints.length;
    const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
    const closedComplaints = complaints.filter(c => c.status === 'Closed').length;

    // Respond with the counts and complaint data
    res.status(200).json({
      totalComplaints,
      pendingComplaints,
      closedComplaints,
      complaints
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints.',
    });
  }
};

module.exports = { submitComplaint, getUserComplaints };
