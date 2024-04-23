import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChatStream from '../components/ChatStream';
import RetrievedFiles from '../components/RetrievedFiles';
import './Home.css';
import friday from '../assets/friday.png';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='d-flex'>
          <ChatStream />
          <RetrievedFiles />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
