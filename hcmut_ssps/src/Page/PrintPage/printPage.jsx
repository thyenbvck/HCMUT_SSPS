import React, { useState, useRef } from 'react';
import './index.css';
import Sidebar from "../../components/Sidebar";

const PrintPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type and size
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
            const maxSize = 50 * 1024 * 1024; // 50MB

            if (allowedTypes.includes(file.type) && file.size <= maxSize) {
                setSelectedFile(file);
            } else {
                alert('Please select a valid file (JPEG, PNG, PDF, or MP4) up to 50MB');
                event.target.value = null; // Clear the file input
            }
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const file = event.dataTransfer.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
            const maxSize = 50 * 1024 * 1024; // 50MB

            if (allowedTypes.includes(file.type) && file.size <= maxSize) {
                setSelectedFile(file);
            } else {
                alert('Please select a valid file (JPEG, PNG, PDF, or MP4) up to 50MB');
            }
        }
    };

    return (  
        <div className="print-page">  
            <Sidebar />  
            <main 
                className="upload-section"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >  
                <div className="upload-header">  
                    <div className="upload-icon">🔄</div>
                    <h2>Upload files</h2>  
                    <p>Select and upload the files of your choice</p>  
                </div>  
                <div className="upload-area">  
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf,.mp4"
                    />
                    {selectedFile ? (
                        <div className="selected-file">
                            <p>Selected File: {selectedFile.name}</p>
                            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    ) : (
                        <p>Choose a file or drag & drop it here</p>
                    )}
                    <button 
                        className="browse-button" 
                        onClick={handleBrowseClick}
                    >
                        Browse File
                    </button>
                </div>  
                <p className="file-format">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>  
            </main>  
        </div>  
    );  
};  

export default PrintPage;