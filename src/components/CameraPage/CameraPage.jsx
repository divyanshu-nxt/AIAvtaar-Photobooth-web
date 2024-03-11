import React, { Component } from 'react';
import './index.css';

import captureImage from '../../images/AI/cap.png';
import nextImage from '../../images/AI/button.png';
import recapture from '../../images/AI/recap.png';
import andrecapture from '../../images/AI/andrecapture.png';
import andcaptureImage from '../../images/AI/andcapture.png';
import andnextBtnImage from '../../images/AI/andnextBtn.png';
import Animation1 from "./Animation1.json"
import Animation2 from "./Animation2.json"
import Animation3 from "./Animation3.json"
import Animation4 from "./Animation4.json"
import Lottie from 'lottie-react';
import Progress from './progress';
import home from '../../images/AI/homeb.png';
class CameraPage extends Component {
    state = {
        progress: 0,
      };
    updateProgress = (newProgress) => {
        this.setState({ progress: newProgress });
      };

      componentDidUpdate(prevProps) {
        // You can use this lifecycle method to check for prop changes
        // and update the progress if needed
        if (prevProps.progress !== this.props.progress) {
          this.updateProgress(this.props.progress);
        }
      }
    constructor(props){
        super(props);
        this.UpdatePersonImageUrl = props.UpdatePersonImageUrl;
        this.OnShowResultFace = props.OnShowResultFace;
        this.updateState = props.updateState;
        this.uptodate=props.uptodate;

    }

    componentDidMount(){
        this.SetupCamera();
        document.querySelector("#cameraCanvas").style.display = 'none';
    }

    SetupCamera = async () => {
        
        let video = document.querySelector("#video");
        let reclick = document.getElementById('reclick-photo');
        let nextBtn = document.getElementById('nextBtn');
        let click_button = document.querySelector("#click-photo");
        let canvas = document.querySelector("#cameraCanvas");
        let width = 487; // Set the desired width
    let height = 587; // Set the desired height

        let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        video.style.border = '8px solid #cdc0c0'; // Adjust the color and width according to your preference
    video.style.borderRadius = '10px'; // Adjust the radius according to your preference
    video.style.marginTop='5px';
        click_button.addEventListener('click', function () {

            let width = video.videoWidth;
            let height = video.videoHeight;

            canvas.width = width;
            canvas.height = height;

            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
           
            canvas.style.width = width+"px";
            canvas.style.height = height+"px";
            canvas.style.marginTop="-5px";
            canvas.style.display = 'block';
            canvas.style.borderRadius = '10px';

            video.style.display = 'none';
            video.style.borderRadius = '10px';
            // let image_data_url = canvas.toDataURL('image/jpeg');
            stream.getTracks().forEach(function(track) {
              track.stop();
            });

            var url = canvas.toDataURL();
            url = url.replace('data:image/png;base64,', 'data:image/png;name=person.png;base64,')
            
            reclick.style.display = 'block';
            nextBtn.style.display = 'block';
            click_button.style.display = 'none';
        });


        reclick.addEventListener('click', async function(){
            reclick.style.display = 'none';
            nextBtn.style.display = 'none';
            canvas.style.display = 'none';
            video.style.display = 'block';
            click_button.style.display = 'block';
            let width = 487; // Set the desired width
            let height = 587; // Set the desired height
        
                let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            video.srcObject = stream;
            video.style.border = '8px solid #cdc0c0'; // Adjust the color and width according to your preference
    video.style.borderRadius = '10px'; // Adjust the radius according to your preference
    video.style.marginTop='5px';
        });
        

        nextBtn.addEventListener('click', () => {
            var url = canvas.toDataURL(); 
            url = url.replace('data:image/png;base64,', 'data:image/png;name=person.png;base64,');
                
            this.UpdatePersonImageUrl(url);
            this.OnShowResultFace();
            this.uptodate();
            
            document.querySelector('.ResultWaiting1').style.display = 'flex';
            document.querySelector('.ResultWaiting').style.display = 'flex';
            // document.querySelector('.ResultWaiting3').style.display = 'flex';
        
        document.querySelector('#cameraCanvas').style.display = 'none';
        document.querySelector('#reclick-photo').style.display = 'none';
        document.querySelector('#nextBtn').style.display = 'none';
        
        });
    }
    RImg=()=>{
        document.querySelector('.ResultWaiting1').style.display = 'none';
        document.querySelector('.ResultWaiting').style.display = 'none';
        // document.querySelector('.ResultWaiting3').style.display = 'none';
    }
    render() { 
        const { progress } = this.state;
        let camcapture = captureImage;
        let camrecapture = recapture;
        let nextBtnImg=nextImage;
        
        return (
            <div className='CameraPage' id='cam'>
                <img id="homeBtn2" src={home} onClick={() => window.location.reload()} />
                <canvas  id="cameraCanvas" ></canvas>
                <video  id="video" autoPlay></video>
                <div className="ResultWaiting1" style={{ marginLeft: '-200px' }}>
                <Progress percentage={this.state.progress} />  
                    </div>
                <div className='captureBtns' onLoad={() =>  this.RImg()}>
                    <img id='click-photo' src={camcapture} alt=""  />
                    <img id='reclick-photo' src={camrecapture} alt=""  />
                    <img id='nextBtn'  alt="" src={nextBtnImg}  style={{cursor:'pointer'}}/>
                    
                    <div className="ResultWaiting" style={{ marginTop: '-100px' }}>
                        <h1 style={{ textAlign: 'center', fontFamily: 'Outfit', fontWeight: '500', lineHeight: 'normal', letterSpacing: '2.6px', textTransform: 'capitalize', marginTop: '-160px' ,color:"#424243",width:'650px'}}>Please wait as we generate your AI Avatar!</h1>
                             </div>
                </div>
               
            </div>

        );
    }
}
 
export default CameraPage;