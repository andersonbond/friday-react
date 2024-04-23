import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChatStream from '../components/ChatStream';
import './Home.css';
import friday from '../assets/friday.png';
import RetrievedFiles from '../components/RetrievedFiles';


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
