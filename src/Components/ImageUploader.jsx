import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

function ImageUploader({ onImageUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  async function uploadImage(file) {
    // Replace these with your Cloudinary credentials
    const cloudName = "duvmfuama";
    const uploadPreset = "FIVERR_IMAGE";

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onImageUpload(data.secure_url);
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

  // const handleFileChange = async (e) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Validate file type
  //   if (!file.type.startsWith("image/")) {
  //     setError("Please select an image file");
  //     return;
  //   }

  //   // Validate file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     setError("Image must be less than 5MB");
  //     return;
  //   }

  //   await uploadImage(file);
  // };
  //
  //
  //
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setError(""); // Clear previous errors
    setPreview(null); // Clear previous preview

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    uploadImage(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <div {...getRootProps()} className="image-container">
      <label>
        <input {...getInputProps()} />
      </label>

      {!preview && (
        <>
          {" "}
          <img src="/cloud-download.png" />
          <p>Drag & Drop or click to upload</p>
        </>
      )}

      {preview && <img src={preview} alt="Preview" className="image" />}

      {uploading && <span className="uploading">Uploading...</span>}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};
export default ImageUploader;
