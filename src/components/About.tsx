import React from 'react';
import BaseAILogo from '../assets/baseup_logo2.png';
const About: React.FC = () => {

  const InfoCard = (
    <div className='m-10 p-16'>
      <h1>
        <img src={BaseAILogo} alt="Friday" className='friday-icon-md' style={{ verticalAlign: 'middle' }} />BaseAI
      </h1>
      <ul className='ol-2 text-18'>
        <li>
          🥷🏻
          <span className='ml-8'>BaseAI delivers Retrieval Augmented Generation (RAG) System and AI Agents to support business operations.</span>
        </li>
        <li>
          🤖 
          <span className="ml-8 text-18">
            Functions as an assistant for back-office operations.
          </span>
        </li>
        <li>
          🚀
          <span className="ml-8 text-18">
            Utilizes cutting-edge technologies.
          </span>
        </li>
      </ul>
    </div>
  );

  return (
    <div>
      {InfoCard}
    </div>
  );
}

export default About;