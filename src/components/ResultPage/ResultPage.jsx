import React, { Component } from 'react';
import './index.css'

import homeBtnImage from '../../images/AI/homeb.png';
import downloadBtnImage from '../../images/AI/downloadBtn.png';
import anddownloadBtnImage from '../../images/AI/anddownloadimg.png';
import andhomeBtnImage from '../../images/AI/andhome.png';
import result from '../../images/AI/resultp.png';
import scan from '../../images/AI/scan.png';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import QRCode from 'react-qr-code';

class ResultPage extends Component {
    state = {   link: '',} 

    // componentDidMount(){
    //    this.ShowOutput("https://cdn.picsart.io/734adbf9-cb60-45c9-801f-d0b11e9c2a6e.png?type=PNG&to=max&r=0");
    // }

    TestFunction = () =>{
        console.log("TEST Function called!");
    }

    // ShowOutput = (url) => {
    //     let resultImage = document.getElementById('ResultImage');
    //     resultImage.src = "data:image/png;"+url;
    //     console.log("h001");
    //     console.log(resultImage.src);
    //     resultImage.addEventListener('load', () =>{
    //         document.querySelector('.ResultContent').style.display = 'flex';
    //         document.querySelector('.ResultWaiting').style.display = 'none';
    //     });
    //     resultImage.addEventListener('error',() => {
    //         console.log("error loading image!");
    //     });
    //     console.log("reached end . . . .");
        
    // }

    // handleDownload = async (e) =>{
    //       e.preventDefault();
    //       let blob = await fetch(document.getElementById('ResultImage').src).then(r => r.blob());
    //       const imageURL = URL.createObjectURL(blob)
    //       let link = document.createElement('a');
    //       link.download = 'example.png';
    //       link.href = imageURL;
    //       console.log(link.href);
    //       link.click();
    //     //   delete the internal blob reference, to let the browser clear memory from it
    //       URL.revokeObjectURL(link.href);
    // }
    // handleDownload = () => {
    //     const { data } = this.props;
    //     const link = document.createElement('a');
    //     link.href = data; // Assuming 'data' is the URL of the image you want to download
    //     link.download = 'result_image.png'; // Set the default file name here
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // }
    result1 = result;
    // handleDownload = async () => {
    //     const { data } = this.props;
    //     const resultImage = document.getElementById('ResultImage');
    //     const backgroundImage = new Image();
    
    //     // Use this.result1 instead of result1
    //     backgroundImage.src = this.result1;
    
    //     // Once the background image is loaded, proceed to merge and upload
    //     backgroundImage.onload = async () => {
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');
    
    //         // Set canvas dimensions to match the background image
    //         canvas.width = backgroundImage.width;
    //         canvas.height = backgroundImage.height;
    
    //         // Draw the background image onto the canvas
    //         ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    //         // Calculate the position and size of the result image on the canvas
    //         const resultImageX = 45;  // Adjust as needed
    //         const resultImageY = 240;  // Adjust as needed
    //         const resultImageWidth = resultImage.width + 5;  // Adjust as needed
    //         const resultImageHeight = resultImage.height + 20;  // Adjust as needed
    
    //         // Draw the result image (data) onto the canvas
    //         ctx.drawImage(resultImage, resultImageX, resultImageY, resultImageWidth, resultImageHeight);
    
    //         // Convert the canvas content to a data URL
    //         const mergedImageDataUrl = canvas.toDataURL('image/png');
    
    //         // Upload the merged image data to Firebase Storage
    //         const firebaseConfig = {
    //             apiKey: "AIzaSyAHGjuPEhNdJilTJudJF6f1GnjoUU24jFA",
    //                   authDomain: "ai-avatar-photobooth.firebaseapp.com",
    //                   databaseURL: "https://ai-avatar-photobooth-default-rtdb.firebaseio.com",
    //                   projectId: "ai-avatar-photobooth",
    //                   storageBucket: "ai-avatar-photobooth.appspot.com",
    //                   messagingSenderId: "511386258101",
    //                   appId: "1:511386258101:web:12b1e5458ecd4ebd118cfc",
    //                   measurementId: "G-65HKRL9KV6"
    //           };
    //         const firebaseApp = initializeApp(firebaseConfig);
    //         const storage = getStorage(firebaseApp);
    //         const storageRef = ref(storage, `merged_images/${Date.now()}.png`);
    
    //         try {
    //             await uploadString(storageRef, mergedImageDataUrl, 'data_url');
    //             const downloadURL = await getDownloadURL(storageRef);
    
    //             // Update the state with the dynamic link for the QR code
    //             this.setState({ link: downloadURL });
    //         } catch (error) {
    //             console.error('Error uploading merged image:', error);
    //         }
    //     };
    // }
    
    
    RImg=async ()=>{
        document.querySelector('.ResultContent').style.display = 'flex'; 
        document.querySelector('.ResultWaiting').style.display = 'none';
        
        document.querySelector('.scan').style.display = 'none';
        const { data } = this.props;
        const resultImage = document.getElementById('ResultImage');
        const backgroundImage = new Image();
    
        // Use this.result1 instead of result1
        backgroundImage.src = this.result1;
    
        // Once the background image is loaded, proceed to merge and upload
        backgroundImage.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
    
            // Set canvas dimensions to match the background image
            canvas.width = 500;
            canvas.height = 700;
    
            // Draw the background image onto the canvas
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
            // Calculate the position and size of the result image on the canvas
            const resultImageX = 25;  // Adjust as needed
            const resultImageY = 230;  // Adjust as needed
            const resultImageWidth = resultImage.width - 15;  // Adjust as needed
            const resultImageHeight = resultImage.height +20;  // Adjust as needed
    
            // Draw the result image (data) onto the canvas
            ctx.drawImage(resultImage, resultImageX, resultImageY, resultImageWidth, resultImageHeight);
    
            // Convert the canvas content to a data URL
            const mergedImageDataUrl = canvas.toDataURL('image/png');
    
            // Upload the merged image data to Firebase Storage
            const firebaseConfig = {
                apiKey: "AIzaSyAHGjuPEhNdJilTJudJF6f1GnjoUU24jFA",
                      authDomain: "ai-avatar-photobooth.firebaseapp.com",
                      databaseURL: "https://ai-avatar-photobooth-default-rtdb.firebaseio.com",
                      projectId: "ai-avatar-photobooth",
                      storageBucket: "ai-avatar-photobooth.appspot.com",
                      messagingSenderId: "511386258101",
                      appId: "1:511386258101:web:12b1e5458ecd4ebd118cfc",
                      measurementId: "G-65HKRL9KV6"
              };
            const firebaseApp = initializeApp(firebaseConfig);
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `merged_images/${Date.now()}.png`);
    
            try {
                await uploadString(storageRef, mergedImageDataUrl, 'data_url');
                const downloadURL = await getDownloadURL(storageRef);
    
                // Update the state with the dynamic link for the QR code
                this.setState({ link: downloadURL });
            } catch (error) {
                console.error('Error uploading merged image:', error);
            }
            document.querySelector('.qrcode').style.display = 'flex';
          document.querySelector('.scan').style.display = 'flex';

        };
         
    }

    render() { 
        let home = homeBtnImage;
        let result1=result;
        let scan1=scan;
        let downloadImg=downloadBtnImage;
        if (window.innerWidth <= 480) {
            downloadImg=anddownloadBtnImage;

        } else if (window.innerWidth <= 768) {
            downloadImg=anddownloadBtnImage;
        }
        const { data } = this.props;
        const { link } = this.state;
        console.log("this.props");
        console.log(this.props);
        return (
        <div className='ResultPage'>
            <div className="ResultContent">
                <img id="homeBtn2"src={home} onClick={() => window.location.reload()} />
                {/* <button onClick={this.handleDownload}>Download Merged Image</button> */}
               
                <img src={result1} alt="" style={{paddingTop:'5px',width: '90%',height:'100%'}} />  
            
                <img id="ResultImage" src={data} alt="" onLoad={() =>  this.RImg()} style={{border: 'none',padding: '5px',width: '330px',marginTop:"185px",marginRight:"140px"}}/>
                 <QRCode value={link} style={{display:'none',width: '15%',height:'30%', position: 'absolute', top: '90%',left:"40%",transform:'translate(-50%, -50%)'}} className="qrcode"/>
                 <img id="scan" src={scan1} alt="" onLoad={() =>  this.RImg()} style={{border: 'none',position:'absolute',top:'86%',left:'48%'}} className="scan"/>
                
            </div>
            <div className="ResultWaiting">
                <h1>Please wait as we generate your AI Avatar!</h1>
            </div>
        </div>);
    }
}
 
export default ResultPage;