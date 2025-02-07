import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { signInSuccess } from "../redux/user/userSlice";

function ProfileEditing() {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [editProfile, setEditProfile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: currentUser?.data?.name || '',
        empId: currentUser?.data?.empId || '',
        email: currentUser?.data?.email || '',
        phone: currentUser?.data?.phone || '',
        address: currentUser?.data?.address || '',
    });
    const [resume, setResume] = useState('');
    const [profileImage, setProfileImage] = useState(`${process.env.REACT_APP_API_URL}/${currentUser?.data?.photoId}`);

    useEffect(() => {
        if (currentUser) {
            setProfileInfo({
                name: currentUser.data.name,
                empId: currentUser.data.empId,
                email: currentUser.data.email,
                phone: currentUser.data.phone,
                address: currentUser.data.address,
            });
            setProfileImage(`${process.env.REACT_APP_API_URL}/${currentUser.data.photoId}`);
        }
    }, [currentUser]);

    const handleProfileInfoChange = (e) => {
        setProfileInfo({
            ...profileInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSave = async () => {
        console.log("Saving profile with data:", profileInfo);
        try {
            const updatedData = {
                empId: profileInfo.empId,
                name: profileInfo.name,
                email: profileInfo.email,
                phone: profileInfo.phone,
                address: profileInfo.address,
            };

            if (resume) updatedData.resume = resume; // Append resume if uploaded

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/facultyedit`, updatedData);
            dispatch(signInSuccess(response));
            console.log("Profile updated successfully:", response.data);
            setEditProfile(false); // Exit edit mode after saving
        } catch (error) {
            console.error("Error updating profile:", error.response ? error.response.data : error.message);
        }
    };

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('profileImage', file); // Append the image file to formData
            formData.append('empId', profileInfo.empId); // Append empId to formData

            try {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/updateProfileImage`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Update the profile image state with the new image path
                setProfileImage(`${process.env.REACT_APP_API_URL}/${response.data.photoId}`);
                console.log("Profile image updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating profile image:", error.response ? error.response.data : error.message);
            } finally {
                setShowModal(false); // Close modal after image upload
            }
        }
    };

    const handleResumeUpload = async(e) => {
        if(resume){
            const formData = new FormData();
            formData.append('resume' , resume );
            formData.append('empId' , profileInfo.empId);

            try {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/uploadResume` , formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Resume uploaded succesfully:', response.data);
            } catch (error){
                console.error("Error uploading Resume :", error.response ? error.response.data : error.message);
            }
        } else {
            console.log("No Resume Selected :")
        }
    };

    return (
        <div className="container mt-5 mb-5 profile-container">
            {/* Profile Section */}
            <div className="card bg-white profile-card">
                <div className="row g-0">
                    <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center p-3">
                        <div className="profile-img-container">
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="rounded-circle img-fluid profile-img"
                                style={{ maxWidth: '80px' }}
                            />
                            <div
                                className="edit-overlay"
                                onClick={() => setShowModal(true)} // Opens the modal on clicking 'Edit'
                            >
                                Edit
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 d-flex align-items-center">
                        <div className="ms-3 w-100">
                            {editProfile ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control mt-2 mb-2"
                                        value={profileInfo.name}
                                        onChange={handleProfileInfoChange}
                                    />
                                    <input
                                        type="text"
                                        name="empId"
                                        className="form-control mb-2"
                                        value={profileInfo.empId}
                                        onChange={handleProfileInfoChange}
                                    />
                                </>
                            ) : (
                                <>
                                    <h5>{profileInfo.name}</h5>
                                    <p>{profileInfo.empId}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-12 d-flex justify-content-center align-items-center p-3">
                        <button
                            className="btn btn-outline-dark rounded-pill btn-sm"
                            onClick={editProfile ? handleSave : () => setEditProfile(true)}
                        >
                            {editProfile ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
             {/* Personal Information Section */}
      <div className="card bg-white mt-3 profile-card">
        <div className="d-flex justify-content-between p-3">
          <h5>Personal Information</h5>
        </div>
        <div className="p-3">
          {editProfile ? (
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={profileInfo.email}
                onChange={handleProfileInfoChange}
              />
              <label className="mt-2">Phone:</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={profileInfo.phone}
                onChange={handleProfileInfoChange}
              />
              <label className="mt-2">Location:</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={profileInfo.address}
                onChange={handleProfileInfoChange}
              />
            </div>
          ) : (
            <ul className="list-unstyled">
              <li><i className="bi bi-envelope"></i> {profileInfo.email}</li>
              <li><i className="bi bi-phone"></i> {profileInfo.phone || 'Add your mobile number'}</li>
              <li><i className="bi bi-geo-alt"></i> {profileInfo.address}</li>
            </ul>
          )}
        </div>
      </div>

      {/* Resume Section */}
      <div className="card bg-white mt-3 profile-card">
        <div className="d-flex justify-content-between p-3">
          <h5>My Resume</h5>
          <label htmlFor="resumeUpload" className="btn btn-outline-dark rounded-pill btn-sm">
            {resume ? 'Change Resume' : 'Add Resume'}
          </label>
          <input
            type="file"
            id="resumeUpload"
            className="d-none"
            onChange={handleResumeChange}
          />
        </div>
        <div className="p-3">
          {resume ? (
            <p>{resume.name}</p>
          ) : (
            <p>Add your resume here</p>
          )}
        </div>
        <button 
            className='btn btn-outline-dark rounded-pill btn-sm ms-2'
            onClick={handleResumeUpload}
        >
            {resume ? 'Upload Resume': 'select and Upload'}
        </button>    
      </div>
            {/* Modal for Image Upload */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default ProfileEditing;
