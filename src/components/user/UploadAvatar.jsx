import React, { useEffect, useState } from 'react'
import UserLayout from '../layout/UserLayout'
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function UploadAvatar() {
    const { user } = useSelector((state) => state.auth);

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(
        user?.avatar ? user?.avatar?.url : "images/default_avatar.jpg"
    )

    const navigate = useNavigate();

    const [uploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Avatar upload failed");
        }

        if (isSuccess) {
            toast.success("Avatar Updated");
            navigate("/me/profile")
        }
    }, [error, isSuccess, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        if (!avatar) {
            toast.error("Please select an avatar");
            return;
        }

        // Create FormData to send file
        const formData = new FormData();
        formData.append('avatar', avatar);

        uploadAvatar(formData);
    }

    const onChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type and size
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(file.type)) {
                toast.error("Invalid file type. Please upload JPEG, PNG, or WebP.");
                return;
            }

            if (file.size > maxSize) {
                toast.error("File is too large. Maximum size is 5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
                setAvatar(file); // Store the actual file object
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("No file selected");
        }
    };

    return (
        <UserLayout>
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Upload Avatar</h2>

                        <div className="mb-3">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <figure className="avatar item-rtl">
                                        <img 
                                            src={avatarPreview} 
                                            className="rounded-circle" 
                                            alt="Avatar Preview" 
                                        />
                                    </figure>
                                </div>
                                <div className="input-form">
                                    <label className="form-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="form-control"
                                        id="customFile"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn w-100 py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Uploading..." : "Upload"}
                        </button>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default UploadAvatar