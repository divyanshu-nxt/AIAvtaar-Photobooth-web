import React, { Component } from 'react';
import aiImage from '../../images/AI/ai_text.png';
import nextBtnImage from '../../images/AI/button.png';
import andnextBtnImage from '../../images/AI/andnextBtn.png';
import './index.css';
import QRCode from 'react-qr-code';
class EntryPage extends Component {
  constructor(props) {
    super(props);
    this.updateState = props.updateState;
    this.state = {
      progress: 0,
    };
  }

  
  render() {
    let nextBtnImg = nextBtnImage;


    return (
      <div className='entryPage'>
        
        <img id="homeBtn1" src={nextBtnImg} onClick={() => this.updateState(1)} style={{ cursor: 'pointer' }} alt="" />

        
        
      </div>
    );
  }
}

export default EntryPage;