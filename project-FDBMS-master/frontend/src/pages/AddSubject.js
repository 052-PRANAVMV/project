import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddSubject.css';
import { useSelector, useDispatch } from 'react-redux';
import { signInSuccess } from "../redux/user/userSlice";

const SubjectForm = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    subjectCode: '',
    ExamType: 'IAT-1', // Default to IAT-1
    semesterPercentage: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data before API call:', formData);  // Debug statement

    axios.post(`${process.env.REACT_APP_API_URL}/api/update-subject-percentage`, {
      empId: currentUser.data.empId,
      subjectName: formData.title,
      courseCode: formData.subjectCode,
      examType: formData.ExamType,
      percentage: formData.semesterPercentage
    })
    .then(response => {
      dispatch(signInSuccess(response));
      console.log('Subject percentage updated:', response.data);
    })
    .catch(error => {
      console.error('There was an error updating the subject percentage:', error);
    });

    setFormData({
      title: '',
      subjectCode: '',
      ExamType: 'IAT-1',
      semesterPercentage: ''
    });
  };

  return (
    <div className="subject-form-container">
      <div className="subject-form-wrapper">
        <div className="subject-form-header">SUBJECT DETAILS</div>
        
        <form onSubmit={handleSubmit} style={{width:'100%'}}>
          <div className="subject-form-group">
            <label htmlFor="title">Subject Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="subject-form-group">
            <label htmlFor="subjectCode">Subject Code</label>
            <input
              type="text"
              id="subjectCode"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="subject-form-group">
            <label htmlFor="ExamType">Exam Type</label>
            <select
              id="ExamType"
              name="ExamType"
              value={formData.ExamType}
              onChange={handleInputChange}
              required
            >
              <option value="IAT-1">Internal Assessment 1</option>
              <option value="IAT-2">Internal Assessment 2</option>
              <option value="IAT-3">Internal Assessment 3</option>
              <option value="Odd">Odd Semester</option>
              <option value="Even">Even Semester</option>
            </select>
          </div>

          <div className="subject-form-group">
            <label htmlFor="semesterPercentage">Pass Percentage</label>
            <input
              type="number"
              id="semesterPercentage"
              name="semesterPercentage"
              value={formData.semesterPercentage}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="subject-form-actions">
            <button type="submit" className="submit-btn">
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
