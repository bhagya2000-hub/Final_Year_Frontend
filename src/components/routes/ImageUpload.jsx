// src/components/ImageUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image for Prediction</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Predict</button>

      {result && (
        <div>
          <p><strong>Class:</strong> {result.class}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
