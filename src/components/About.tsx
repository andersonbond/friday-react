import React from 'react';
import friday from '../assets/friday2.png';
import cpdo from '../assets/cpdo-logo.png';

const About: React.FC = () => {

  const InfoCard = (
    <div className='m-10 p-16'>
      <h1>
        <img src={friday} alt="Friday" className='friday-icon-md' /> CPDO AI
      </h1>
      <ul className='ol-2'>
        <li>
          <img src={cpdo} alt="Davao City Planning and Development Office"  style={{ height: '30px', verticalAlign: 'middle' }} />
          <span className='ml-8'>Davao City Planning and Development Office Powered</span>
        </li>
        <li>
          🤖 
          <span className="ml-8 text-18">
            Functions as a dedicated assistant for Davao City Planning and Development Office personnel.
          </span>
        </li>
        <li>
          🚀
          <span className="ml-8 text-18">
            Utilizes cutting-edge technologies for data accessibility.
          </span>
        </li>
        <li>
          📊
            <span className="ml-8 text-18">
              Data is publicly accessible for information dissimenation and transparency.
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