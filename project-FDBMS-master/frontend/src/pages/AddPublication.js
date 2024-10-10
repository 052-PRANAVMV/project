import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPublication.css';
import { useSelector,useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";

function AddPublication() {
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
   
    title: '',
    category: '',
    type: '', 
    date: '', 
    description: '', 
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
    data.append('category', formData.category);
    data.append('type', formData.type);
    data.append('date', formData.date);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/faculty/add-publication`, data);
      if (response.status === 200) {
        alert('Publication added successfully');
        dispatch(signInSuccess(response));
        setFormData({
         
          title: '',
          category: '',
          type: '', 
          date: '', 
          description: '', 
          file: null 
        });
      } else {
        alert('Failed to add publication');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add publication');
    }
  };

  return (
    <div className="divg">
      <div className="addpub">
        <div className="top">
          PUBLICATION DETAILS
        </div>
        <form onSubmit={handleSubmit}>
          
          <div className="textdiv">
            <label htmlFor="title">Title of Publication:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title of the publication"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div> <br/>

          <div className="category">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Category of the publication"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div> <br/>

          <div className="type">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Type of the publication"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div> <br/>

          <div className="date">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div> <br/>

          <div className="discriptionarea">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the publication"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div> <br/>

          <div className="file">
            <label htmlFor="upload">Upload Publication:</label>
            <input
              type="file"
              id="upload"
              onChange={handleFileChange}
              required
            />
          </div> <br/>

          <div className="bt">
            <button type="submit" className="add">Add</button>
            <br />
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddPublication;
