import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';

import ChatStream from '../components/ChatStream';
import RetrievedFiles from '../components/RetrievedFiles';
import './Home.css';

const Home: React.FC = () => {
  const [showRetrievedFiles, setShowRetrievedFiles] = useState(false); 

  const toggleRetrievedFiles = () => {
    setShowRetrievedFiles(!showRetrievedFiles);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='d-flex'>
          <div>
            <ChatStream />
          </div>
          <div className="retrieved-files-container-lg">
              <RetrievedFiles />
          </div>
          {showRetrievedFiles && (
            <div className="retrieved-files-container">
              <RetrievedFiles />
            </div>
          )}
        </div>
        {/* Burger icon for mobile */}
        <div className="burger-icon" onClick={toggleRetrievedFiles}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
