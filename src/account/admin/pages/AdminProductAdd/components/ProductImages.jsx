import { useState } from "react";
import { toast } from "react-toastify";
import { FiImage, FiUpload, FiX, FiAlertCircle, FiLoader } from "react-icons/fi";

// Your Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = "dumpkfaba";
const CLOUDINARY_UPLOAD_PRESET = "storage"; // ⚠️ Create this in Cloudinary Settings

export default function ProductImages({ data, setData }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate files
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast.error("Please upload only image files");
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      toast.error("Images must be less than 5MB each");
      return;
    }

    setUploading(true);
    setUploadProgress(new Array(files.length).fill('uploading'));

    try {
      const uploadPromises = files.map(async (file, index) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
          formData.append("folder", "products"); // Optional: organizes images in Cloudinary

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();

          if (!data.secure_url) {
            throw new Error(data.error?.message || "Upload failed");
          }

          setUploadProgress(prev => {
            const newProgress = [...prev];
            newProgress[index] = 'success';
            return newProgress;
          });

          return data.secure_url;
        } catch (error) {
          setUploadProgress(prev => {
            const newProgress = [...prev];
            newProgress[index] = 'error';
            return newProgress;
          });
          throw error;
        }
      });

      const urls = await Promise.all(uploadPromises);
      const successfulUrls = urls.filter(url => url);

      if (successfulUrls.length > 0) {
        setData(prev => ({
          ...prev,
          images: [...prev.images, ...successfulUrls],
        }));
        toast.success(`${successfulUrls.length} image(s) uploaded successfully!`);
      }

      if (successfulUrls.length < files.length) {
        toast.warning(`${files.length - successfulUrls.length} image(s) failed to upload`);
      }

    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress([]);
      }, 1000);
    }
  };

  const removeImage = (index) => {
    setData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    toast.info("Image removed");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FiImage className="text-white" />
          Product Images <span className="text-white/80 text-sm font-normal">*</span>
        </h2>
      </div>
      
      <div className="p-6">
        {/* Info Alert */}
        <div className="text-sm text-gray-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-100 flex items-start gap-2">
          <FiAlertCircle className="text-red-500 flex-shrink-0 mt-0.5" />
          <span>Upload at least one image. Supported formats: JPG, PNG, GIF (Max 5MB each)</span>
        </div>
        
        {/* Upload Area */}
        <label className={`relative flex flex-col items-center justify-center w-full py-8 px-4 border-2 border-dashed rounded-xl cursor-pointer transition-all group ${
          uploading 
            ? 'border-red-200 bg-red-50/50 cursor-not-allowed' 
            : 'border-red-300 hover:border-red-500 hover:bg-red-50'
        }`}>
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
              uploading 
                ? 'bg-red-100' 
                : 'bg-red-100 group-hover:bg-red-200'
            }`}>
              {uploading ? (
                <FiLoader className="w-6 h-6 text-red-600 animate-spin" />
              ) : (
                <FiUpload className="w-6 h-6 text-red-600" />
              )}
            </div>
            <p className="text-sm text-gray-600 text-center">
              {uploading ? (
                <span className="text-red-600">Uploading images...</span>
              ) : (
                <>
                  <span className="font-semibold text-red-600">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        
        {/* Upload Progress Indicators */}
        {uploadProgress.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadProgress.map((status, index) => (
              <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${
                status === 'success' ? 'bg-green-50 text-green-700' :
                status === 'error' ? 'bg-red-50 text-red-700' :
                'bg-red-50 text-red-600'
              }`}>
                {status === 'uploading' && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                )}
                {status === 'success' && (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {status === 'error' && (
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-sm">
                  Image {index + 1}: {status === 'uploading' ? 'Uploading...' : status === 'success' ? 'Uploaded successfully' : 'Upload failed'}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {/* Image Preview Grid */}
        {data.images.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <FiImage className="text-red-500" />
              Uploaded Images ({data.images.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    alt={`Product ${i + 1}`}
                    className="w-full h-36 object-cover rounded-xl border-2 border-gray-200 group-hover:border-red-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 hover:scale-110 shadow-lg"
                  >
                    <FiX size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* No Images Message */}
        {data.images.length === 0 && !uploading && (
          <div className="mt-6 text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No images uploaded yet</p>
            <p className="text-xs text-gray-400 mt-1">Click above to upload product images</p>
          </div>
        )}
      </div>
    </div>
  );
}