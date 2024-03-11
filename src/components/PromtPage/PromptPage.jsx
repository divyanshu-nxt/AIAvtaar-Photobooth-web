import React, { Component,useState } from 'react';
import './index.css';
import welcomText from '../../images/AI/welcome_text.png';

import nextBtnImage from '../../images/AI/button.png';
import inputImage from '../../images/AI/prompttext.png';
import { getDatabase } from "firebase/database";
import { ref, set } from "firebase/database";
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInAnonymously } from "firebase/auth";
import andwelcomTextImage from '../../images/AI/andwelcomText.png';
import andinputImage from '../../images/AI/andinput.png';
import andnextBtnImage from '../../images/AI/andnextBtn.png';

import homeBtnImage from '../../images/AI/homeb.png';

import p1 from '../../images/AI/p1.png'; 
import p2 from '../../images/AI/p2.png';
import p3 from '../../images/AI/p3.png'; 
import p4 from '../../images/AI/p4.png';
import p5 from '../../images/AI/p5.png'; 
import p6 from '../../images/AI/p6.png';
import p7 from '../../images/AI/p7.png'; 
import p8 from '../../images/AI/p8.png';
class PromptPage extends Component {

    constructor(props){
        super(props);
        this.UpdatePrompt = props.UpdatePrompt;
        this.updateState = props.updateState;
        this.OnGenerate = props.OnGenerate;
        this.UpdateFaceImageUrl=props.UpdateFaceImageUrl;

          

        
    }
    d12="kkk";
    //state = {  } 
    state = { 
        selectedFile: null, // To store the selected file
        imageUrl: '' // To store the image URL after uploading
    }

    handleImageClick = async (index) => {
        this.setState({ clickedImageIndex: index });
        let selectedImagePath = '';
        
        switch (index) {
            case 1:
                selectedImagePath = 'high-tech cityscape';
                break;
            case 2:
               
            selectedImagePath = 'epic undersea adventure';
 
                break;
            case 3:
                
  selectedImagePath = 'quantum realm exploration';
                break;
            case 4:
                selectedImagePath = 'neo-tokyo nightfall';
                break;
                case 5:
                    
                selectedImagePath = 'dimentionsal rift';
                    break;
                    case 6:
                        selectedImagePath = 'steampunk skyline';
                    break;
                    case 7:
                        selectedImagePath = 'cybernetic jungle crusade';
                    break;
                    case 8:
                        selectedImagePath = 'galactic chronicles';
                    break;
            default:
                selectedImagePath = ''; // Handle other cases if needed
                break;
        }
        
        this.UpdatePrompt(selectedImagePath);
        const config = {
            apiKey: "AIzaSyAHGjuPEhNdJilTJudJF6f1GnjoUU24jFA",
            authDomain: "ai-avatar-photobooth.firebaseapp.com",
            databaseURL: "https://ai-avatar-photobooth-default-rtdb.firebaseio.com",
            projectId: "ai-avatar-photobooth",
            storageBucket: "ai-avatar-photobooth.appspot.com",
            messagingSenderId: "511386258101",
            appId: "1:511386258101:web:12b1e5458ecd4ebd118cfc",
            measurementId: "G-65HKRL9KV6"
          };
         const firebaseapp=initializeApp(config);
        const database = getDatabase(firebaseapp);
         const auth=getAuth(firebaseapp);
        signInAnonymously(auth).then((userCredential) => {
            // The `user` object is available in userCredential.user
            const user = userCredential.user;
            console.log(user);
            
          const data = {
            userId: user.reloadUserInfo.localId,
            prompt_content:selectedImagePath
              
         }
         set(ref(database, user.auth.config.apiKey), data).then( () => {
            // Success.
            console.log("success");
         } ).catch( (error) => {
           console.log(error);
         } );
        });
        document.querySelector('.befnxtbutton').style.display = 'none';
        document.querySelector('.nxtbutton').style.display = 'flex';
      }
    handleNextBtn = () => {
        // let prompt = document.getElementById('promtText').value;
        // if(prompt.length < 10){
        //     alert('Prompt should be more then 10 letters');
        //     return;
        // }
        
        this.OnGenerate();
        this.updateState(2);
    }

   

    handleFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0], // Get the first file from the input
            imageUrl: '' // Clear previous image URL if any
        });
    }

    handleUpload = () => { 
        const { selectedFile } = this.state;
        if (selectedFile) {
            
            const reader = new FileReader();
            
            reader.readAsDataURL(selectedFile);
            
            reader.onloadend = () => {
                this.setState({ imageUrl: reader.result });
               this.d12=reader.result;
           // this.UpdateFaceImageUrl(this.d12);
            //console.log(reader.result ); //this gives us
            };
            
        document.querySelector('.nxtbutton').style.display = 'flex';
        }
    }

    handleDownload = () => {
        const { imageUrl } = this.state;
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'example.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    RImg=()=>{
        
        document.querySelector('.nxtbutton').style.display = 'none';
    }
    
    getUserData=()=>{

    }

    render() { 
        
        const { imageUrl } = this.state;
        let welcomeImage = welcomText;
        let inputImg = inputImage;
        let nextBtnImg = nextBtnImage;
        let home = homeBtnImage;
        if (window.innerWidth <= 480) {
            welcomeImage = andwelcomTextImage;
            
        } else if (window.innerWidth <= 768) {
            welcomeImage = andwelcomTextImage;
            
        }
        const { clickedImageIndex } = this.state;
        return (
            <div className='PromptPage' >
               <img id="homeBtn2" src={home} onClick={() => window.location.reload()} />
                {/* <div className="promptDiv">
                    <textarea id='promtText' src={inputImg} onInput={(e) => this.UpdatePrompt(e.currentTarget.value)} alt=""  />
                    
                </div> */}
                <div style={{paddingTop:'100px'}}>
                    <img src={p1} alt="" onClick={() => this.handleImageClick(1)} className={clickedImageIndex === 1 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}} />  
            <img src={p2} alt="" onClick={() => this.handleImageClick(2)}  className={clickedImageIndex === 2 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}} /> 
             
                    </div>
                    <div>
                    <img src={p3} alt="" onClick={() => this.handleImageClick(3)} className={clickedImageIndex === 1 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}} />  
            <img src={p4} alt="" onClick={() => this.handleImageClick(4)}  className={clickedImageIndex === 2 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}}/> 
             
                    </div>
                    <div>
                    <img src={p5} alt="" onClick={() => this.handleImageClick(5)} className={clickedImageIndex === 1 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}} />  
            <img src={p6} alt="" onClick={() => this.handleImageClick(6)}  className={clickedImageIndex === 2 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}}/> 
             
                    </div>
                    <div>
                    <img src={p7} onClick={() => this.handleImageClick(7)} alt="" className={clickedImageIndex === 1 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}} />  
            <img src={p8} alt="" onClick={() => this.handleImageClick(8)}  className={clickedImageIndex === 2 ? 'clicked' : 'notclicked'} style={{paddingRight:"30px"}}/> 
             
                    </div>
                {/* <input type="file" onChange={this.handleFileChange} className="fileInput" />
                
                    <button onClick={this.handleUpload} className="uploadButton">Upload</button>
                  */} 
                
                <img src={nextBtnImg} className="befnxtbutton" id="homeBtn1" alt=""  style={{opacity: 0.5}}/>
          
<img src={nextBtnImg} onClick={this.handleNextBtn} className="nxtbutton" id="homeBtn1" alt=""  style={{cursor:'pointer',display:'none'}}/>
                
                
            </div>
            
        );
    }
}
 
export default PromptPage;