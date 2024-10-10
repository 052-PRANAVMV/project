import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddFPP.css';
import { useSelector,useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";

function AddFPP() {
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    
    title: '',
    status: '',
    dateSubmitted: '',
    dateReviewed: '',
    description: '', // Add description field
    file: null
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('empId', currentUser.data.empId);
    data.append('title', formData.title);
    data.append('status', formData.status);
    data.append('dateSubmitted', formData.dateSubmitted);
    data.append('dateReviewed', formData.dateReviewed);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/faculty/add-fpp`, data);
      if (response.status === 200) {
        alert('Funded Project Proposal added successfully');
        dispatch(signInSuccess(response));
        setFormData({
          
          title: '',
          status: '',
          dateSubmitted: '',
          dateReviewed: '',
          description: '', // Reset description field
          file: null
        });
      } else {
        alert('Failed to add funded project proposal');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add funded project proposal');
    }
  };

  return (
    <div className="divg">
      <div className="addpub">
        <div className="top">
          FUNDED PROJECT DETAILS
        </div>
        <form onSubmit={handleSubmit}>
          
          <div className="textdiv">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the publication"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="statusdiv">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>-------Select Status--------</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="dateSubmitted">
            <label htmlFor="dateSubmitted">Date Submitted:</label>
            <input
              type="date"
              id="dateSubmitted"
              name="dateSubmitted"
              value={formData.dateSubmitted}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="dateReviewed">
            <label htmlFor="dateReviewed">Date Reviewed:</label>
            <input
              type="date"
              id="dateReviewed"
              name="dateReviewed"
              value={formData.dateReviewed}
              onChange={handleInputChange}
            />
          </div>

          <div className="descriptionarea">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the publication"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="file">
            <label htmlFor="upload">Upload Publication:</label>
            <input
              type="file"
              id="upload"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="bt">
            <button type="submit" className="add">Add</button>
            <br />
          </div>
        </form>

        
      </div>
    </div>
  );
}

export default AddFPP;
