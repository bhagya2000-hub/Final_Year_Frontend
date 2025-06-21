// src/pages/Predict.js
import React from 'react';
import FlowerRecognition from './FlowerRecognition';

const PredictPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4 text-orange">Flower Identification</h1>
          <p className="lead mb-4 text-muted">
            Upload an image of a flower to identify its species and learn more about it.
          </p>
          <FlowerRecognition />
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
