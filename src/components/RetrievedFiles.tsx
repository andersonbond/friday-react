import React, { useState, useEffect } from 'react';
import { REMOTE_API_URL, LOCAL_API_URL } from '../config/properties';


const RetrievedFiles: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data from your Node.js API
    fetch(`${REMOTE_API_URL}/v1/files`)
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array to run only once on component mount

  const openFile = (fileName: string) => {
    // Open the file in a new tab
    window.open(`${REMOTE_API_URL}/v1/files/${fileName}`, '_blank');
  };

  const FileCard = (
    <div className='m-10 p-16'>
      <h1>📘 Files</h1>
      <ul>
        {/* Map over the files array to render each file */}
        {files.map((file, index) => (
          <li key={index} onClick={() => openFile(file)} style={{ cursor: 'pointer', color: 'blue' }}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className='file-section'>
      {FileCard}
    </div>
  );
}

export default RetrievedFiles;