import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from "../layout/Loader";
import MetaData from '../layout/MetaData';
import AdminLayout from '../layout/AdminLayout';
import { useDeleteProductImageMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../redux/api/productApi';

function UploadImages() {
  const fileInputRef = useRef(null)
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([])
  const [uploadImages, setUploadImages] = useState([]) 
  const [isCompressing, setIsCompressing] = useState(false);

  const [uploadProductImage, { isLoading, error, isSuccess }] = useUploadProductImageMutation()
  const [deleteProductImage, { isLoading: isDeletingLoading, error: deleteError, isSuccess: deleteSuccess }] = useDeleteProductImageMutation();

  const { data } = useGetProductDetailsQuery(params?.id)

  useEffect(() => {
    if (data?.product) {
      setUploadImages(data?.product?.images)
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      setImages([])
      setImagesPreview([])
      toast.success("Images Uploaded")
      navigate("/admin/products")
    }
    if (deleteSuccess) {
      toast.success("Image deleted successfully")
      // Refresh product data after deletion
      // The query will automatically refresh due to invalidatesTags
    }
  }, [data, error, isSuccess, navigate, deleteError, deleteSuccess]);

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = height * (MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = width * (MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
      };
    });
  };

  const onChange = async (e) => {
    const files = Array.from(e.target.files);
    setIsCompressing(true);
    
    try {
      for (const file of files) {
        // Check file size before compression (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Image ${file.name} is too large. Max size is 5MB.`);
          continue;
        }
        
        const compressedImage = await compressImage(file);
        
        setImagesPreview((oldArray) => [...oldArray, compressedImage]);
        setImages((oldArray) => [...oldArray, compressedImage]);
      }
    } catch (err) {
      toast.error("Error processing images. Please try smaller files.");
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  }

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleImagePreviewDelete = (image) => {
    const filteredImagePreview = imagesPreview.filter(
      img => img !== image
    )
    setImages(filteredImagePreview)
    setImagesPreview(filteredImagePreview);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    
    uploadProductImage({ id: params?.id, body: { images } })
  }
  
  const deleteImage = (imgId) => {
    deleteProductImage({id: params?.id, body: {imageIds: [imgId]}})
  }

  return (
    <>
      <AdminLayout />
      <MetaData title={"Upload Product Images"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" encType="multipart/form-data" onSubmit={submitHandler}>
            <h2 className="mb-4">Upload Product Images</h2>

            <div className="mb-3">
              <label htmlFor="customFile" className="form-label">Choose Images</label>
              <div className="custom-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  accept="image/*"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                  disabled={isCompressing || isLoading}
                />
                <small className="form-text text-muted">Max size: 5MB per image. Images will be compressed.</small>
              </div>

              {isCompressing && (
                <div className="text-center my-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Compressing...</span>
                  </div>
                  <p>Compressing images...</p>
                </div>
              )}

              {imagesPreview?.length > 0 && (
                <div className="new-images my-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {imagesPreview?.map((img, index) => (
                      <div className="col-md-3 mt-2" key={index}>
                        <div className="card">
                          <img
                            src={img}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(img)}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadImages?.length > 0 && (
                <div className="uploaded-images my-4">
                  <p className="text-success">Product Uploaded Images:</p>
                  <div className="row mt-1">
                    {uploadImages?.map((img, index) => (
                      <div className="col-md-3 mt-2" key={index}>
                        <div className="card">
                          <img
                            src={img?.url}
                            alt="Card"
                            className="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            disabled={isLoading || isDeletingLoading}
                            type="button"
                            onClick={() => deleteImage(img?.public_id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              id="register_button" 
              type="submit" 
              className="btn w-100 py-2" 
              disabled={isLoading || isCompressing || images.length === 0 || isDeletingLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UploadImages