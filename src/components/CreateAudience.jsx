import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateAudience() {
  const [name, setName] = useState('');
  const [conditions, setConditions] = useState([{ field: 'total_spent', operator: '>', value: 0 }]);
  const [logic, setLogic] = useState('AND'); 
  const [audienceSize, setAudienceSize] = useState(0);
  const [previewSize, setPreviewSize] = useState(0);
  const [isPreviewSizeCalculated, setIsPreviewSizeCalculated] = useState(false);
  const [isAudienceSizeCalculated, setIsAudienceSizeCalculated] = useState(false);

  const addCondition = () => {
    setConditions([...conditions, { field: 'total_spent', operator: '>', value: 0 }]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleConditionChange = (index, field, operator, value) => {
    const newConditions = [...conditions];
    newConditions[index] = { field, operator, value };
    setConditions(newConditions);
  };

  const estimateAudienceSize = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API_LINK}/audience/estimate`, { conditions, logic });
      setPreviewSize(response.data.size);
      setIsPreviewSizeCalculated(true);
      toast.success('Preview size estimated', {
        position: "top-right",
        autoClose: 1500, 
        pauseOnHover: false,
      });
    } catch (error) {
      console.error('Error estimating audience size:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API_LINK}/audience`, { name, conditions, logic });
      setAudienceSize(response.data.audience.size);
      setIsAudienceSizeCalculated(true); 
      toast.success('Audience created successfully!', {
        position: "top-right",
        autoClose: 1500, 
        pauseOnHover: false,
      });
    } catch (error) {
      console.error('Error creating audience:', error);
    }
  };

  return (
    <div className="create-audience-container">
      <h2 style={{color : "black", textAlign : "center", marginBottom : "20px"}}>Create Audience Segment</h2>
      <form className="audience-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{color : "black"}}>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        {conditions.map((condition, index) => (
          <div key={index} className="condition-group">
            <select
              value={condition.field}
              onChange={(e) => handleConditionChange(index, e.target.value, condition.operator, condition.value, condition.unit)}
            >
              <option value="total_spent">Total Spent</option>
              <option value="visits">Visits</option>
              <option value="last_visit_date">Last Visit Date</option>
            </select>

            <select
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, condition.field, e.target.value, condition.value, condition.unit)}
            >
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
              <option value="=">Equal To</option>
              <option value=">=">Greater Than or Equal To</option>
              <option value="<=">Less Than or Equal To</option>
            </select>

            {condition.field === 'last_visit_date' ? (
              <>
                <input
                  type="number"
                  value={condition.value}
                  onChange={(e) => handleConditionChange(index, condition.field, condition.operator, e.target.value, condition.unit)}
                />
                <input
                  type="text"
                  value="Months"
                  disabled
                />
              </>
            ) : (
              <input
                type="number"
                value={condition.value}
                onChange={(e) => handleConditionChange(index, condition.field, condition.operator, e.target.value, condition.unit)}
              />
            )}

            <button type="button" className="remove-btn" onClick={() => removeCondition(index)}>Remove</button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addCondition}>Add Condition</button>

        <div className="form-group">
          <label style={{color : "black"}}>Combine conditions with:</label>
          <select value={logic} onChange={(e) => setLogic(e.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">Create Audience</button>
          <button type="button" className="estimate-btn" onClick={estimateAudienceSize}>Estimate Audience Size</button>
        </div>
      </form>

      <div className="preview-section">
        {isPreviewSizeCalculated > 0 && <div style={{color : "black"}}>Estimated Audience Size: {previewSize}</div>}
        {isAudienceSizeCalculated > 0 && <div style={{color : "black"}}>Audience Size: {audienceSize}</div>}
      </div>
    </div>
  );
}

export default CreateAudience;
