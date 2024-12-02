import React from "react";
import './index.css'; // Assuming you have some CSS to style this component  

const PrintPage = () => {
    return (
        <div className="print-page">

            <main className="upload-section">
                <h2>Upload files</h2>
                <p>Select and upload the files of your choice</p>
                <div className="upload-area">
                    <p>Choose a file or drag & drop it here</p>
                    <button className="browse-button">Browse File</button>
                </div>
                <p>JPEG, PNG, PDG, and MP4 formats, up to 50MB</p>
            </main>
        </div>
    );
};

export default PrintPage;