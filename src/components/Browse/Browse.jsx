import React, { Component } from 'react';
import './index.css';

import homeBtnImage from '../../images/AI/homeBtn.png';
import downloadBtnImage from '../../images/AI/downloadBtn.png';
import uploadingtxt from '../../images/AI/upload.png';
import pickfile from '../../images/AI/browse.png';
import nextBtnImage from '../../images/AI/next.png';
import anduploadingtxt from '../../images/AI/uploadtxt.png';
import andpickfile from '../../images/AI/andbrowse.png';
import andnextBtnImage from '../../images/AI/andnextBtn.png';
class Browse extends Component {
    // state = {  } 

    // componentDidMount(){
    //    this.ShowOutput("https://cdn.picsart.io/734adbf9-cb60-45c9-801f-d0b11e9c2a6e.png?type=PNG&to=max&r=0");
    // }
    constructor(props){
        super(props);
        this.updateState = props.updateState;
        this.UpdateFaceImageUrl=props.UpdateFaceImageUrl;
        this.OnShowResult = props.OnShowResult;
    }

    TestFunction = () =>{
        console.log("TEST Function called!");
    }
d12="kkk";
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
    // RImg=()=>{
        state = { 
            selectedFile: null, // To store the selected file
            imageUrl: '' // To store the image URL after uploading
        }
        handleNextBtn = () => {
            
            //this.OnGenerate();
            this.updateState(3);
        }
        readFileAsBase64 = (file) => {
            const reader = new FileReader();
        
            reader.onload = (event) => {
              const base64String = event.target.result;
              this.UpdateFaceImageUrl(base64String);
              this.OnShowResult();
            };
        
            reader.readAsDataURL(file);
          };
        handleFileChange = (event) => {
            this.setState({
                selectedFile: event.target.files[0], // Get the first file from the input
                imageUrl: '' // Clear previous image URL if any
            });
            this.readFileAsBase64(event.target.files[0]);
            
            document.querySelector('.nxtbutton').style.display = 'flex'; 
           document.querySelector('.befnxtbutton').style.display = 'none';
        }
    
        handleUpload = () => { 
            const { selectedFile } = this.state;
            if (selectedFile) {
                
                const reader = new FileReader();
                
                reader.readAsDataURL(selectedFile);
                
                reader.onloadend = () => {
                    this.setState({ imageUrl: reader.result });
                   this.d12=reader.result;
                //console.log(reader.result ); //this gives us
                };
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
    

      
    //     document.querySelector('.ResultContent').style.display = 'flex'; 
    //     document.querySelector('.ResultWaiting').style.display = 'none';
    // }

    render() { 
        const { imageUrl } = this.state;
        let uploadtxt = uploadingtxt;
        let nextBtnImg = nextBtnImage;
        let pickfileImg=pickfile;
        if (window.innerWidth <= 480) {
            uploadtxt=anduploadingtxt;
            nextBtnImg=andnextBtnImage;
            pickfileImg=andpickfile;

        } else if (window.innerWidth <= 768) {
            uploadtxt=anduploadingtxt;
            nextBtnImg=andnextBtnImage;
            pickfileImg=andpickfile;
        }
        return (
            
        <div className='Browse'>
            <img src={uploadtxt} alt="" id="uploading" />
            <label htmlFor="fileInput" className="pick">
          <img src={pickfileImg} alt="" />
          
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={this.handleFileChange}
          style={{ display: 'none' }}
        />
        <span className="fileNameLabel">{this.state.selectedFile ? this.state.selectedFile.name : 'Choose an Avtaar'}</span>
        <img src={nextBtnImg} className="befnxtbutton" alt=""  style={{ opacity: 0.5 }}/>
        <img src={nextBtnImg} onClick={this.handleNextBtn} className="nxtbutton" alt=""  style={{ display: 'none' ,cursor:'pointer'}}/>
                
        </div>
        
        );
    }
}
 
export default Browse;