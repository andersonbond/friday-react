import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ChatStream from '../components/ChatStream';
import './Home.css';
import friday from '../assets/friday.png';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ChatStream />
      </IonContent>
    </IonPage>
  );
};

export default Home;
