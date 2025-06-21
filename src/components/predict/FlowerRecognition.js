import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './FlowerRecognition.css';

const FlowerRecognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select an image file first');
      toast.error('Please select an image file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResults(response.data);
      toast.success('Flower identified successfully!');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to process image';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flower-box shadow-lg p-4 rounded-4">
      <h2 className="text-center mb-4 text-orange">Flower Identification</h2>

      <div className="mb-3">
        <label className="form-label">Upload Flower Image</label>
        <input 
          type="file" 
          accept="image/*" 
          className="form-control" 
          onChange={handleFileChange} 
        />
        {selectedFile && (
          <div className="mt-2 text-muted small">Selected: {selectedFile.name}</div>
        )}
      </div>

      {previewUrl && (
        <div className="text-center mb-4">
          <img src={previewUrl} alt="Preview" className="flower-preview shadow" />
        </div>
      )}

      <div className="d-grid">
        <button 
          onClick={handlePredict} 
          className="btn btn-orange" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Processing...
            </>
          ) : 'Identify Flower'}
        </button>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {results && (
        <div className="result-box mt-4 p-3">
          <h4 className="text-success">Prediction Result</h4>
          <p><strong>Name:</strong> {results.predicted_label}</p>
          <p>
            <strong>Scientific:</strong> {
              results.predictions.find(p => p.sinhala_name === results.predicted_label)?.scientific_name
            }
          </p>
          <p>
            <strong>Confidence:</strong> {
              results.predictions.find(p => p.sinhala_name === results.predicted_label)?.confidence
            }
          </p>

          <h5 className="mt-4">All Predictions</h5>
          <table className="table table-striped table-bordered mt-2">
            <thead>
              <tr>
                <th>Sinhala Name</th>
                <th>Scientific Name</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {results.predictions.map((flower, index) => (
                <tr key={index} className={flower.sinhala_name === results.predicted_label ? 'table-success' : ''}>
                  <td>{flower.sinhala_name}</td>
                  <td>{flower.scientific_name}</td>
                  <td>{flower.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlowerRecognition;
