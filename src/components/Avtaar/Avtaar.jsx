import React, { Component } from 'react';
import './index.css';

import homeBtnImage from '../../images/AI/homeBtn.png';
import downloadBtnImage from '../../images/AI/downloadBtn.png';
import uploadingtxt from '../../images/AI/avtarTxt.png';
import avt1 from '../../images/AI/avt1.png'; 
import avt01 from '../../images/AI/avtr1.png';
import aavt01 from '../../images/AI/aavtr1.png';
import avt2 from '../../images/AI/avtr2.png';
import aavt2 from '../../images/AI/aavtr2.png';
import avt3 from '../../images/AI/avtr3.png';
import avt4 from '../../images/AI/avtr4.png';
import avt5 from '../../images/AI/avtr5.png';
import avt6 from '../../images/AI/avtr6.png';

import aavt3 from '../../images/AI/aavtr3.png';
import aavt4 from '../../images/AI/aavtr4.png';
import aavt5 from '../../images/AI/aavtr5.png';
import aavt6 from '../../images/AI/aavtr6.png';

import imgurl1 from '../../components/Avtaar/imgurl1.txt';
import imgurl2 from '../../components/Avtaar/imgurl2.txt';
import imgurl3 from '../../components/Avtaar/imgurl3.txt';
import imgurl4 from '../../components/Avtaar/imgurl4.txt';
import imgurl5 from '../../components/Avtaar/imgurl5.txt';
import imgurl6 from '../../components/Avtaar/imgurl6.txt';
import pickfile from '../../images/AI/browse.png';
import nextBtnImage from '../../images/AI/button.png';
import anduploadingtxt from '../../images/AI/andavtarTxt.png';
import andpickfile from '../../images/AI/andbrowse.png';
import andnextBtnImage from '../../images/AI/andnextBtn.png';
import home from '../../images/AI/homeb.png';
import captureImage from '../../images/AI/capture.png';
import nextImage from '../../images/AI/next.png';
import recapture from '../../images/AI/recapture.png';
class Avtaar extends Component {
    // state = {  } 

    // componentDidMount(){
    //    this.ShowOutput("https://cdn.picsart.io/734adbf9-cb60-45c9-801f-d0b11e9c2a6e.png?type=PNG&to=max&r=0");
    // }
    constructor(props){
        super(props);
        this.updateState = props.updateState;
        this.UpdateFaceImageUrl=props.UpdateFaceImageUrl;
        this.OnShowResult = props.OnShowResult;
        //clickedImageIndex: -1;
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
            
            this.OnShowResult();
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
    handleImageClick = async (index) => {
        this.setState({ clickedImageIndex: index });
        let selectedImagePath = '';
        
        switch (index) {
            case 1:
                document.querySelector('#avt01').src = aavt01;
                document.querySelector('#avt2').src = avt2;
                document.querySelector('#avt3').src = avt3;
                document.querySelector('#avt4').src = avt4;
                document.querySelector('#avt5').src = avt5;
                document.querySelector('#avt6').src = avt6;
                try {
                    const response = await fetch(imgurl1);
                    if (response.ok) {
                         await response.text().then((result) => {
  selectedImagePath = result;
  // Now you can use the selectedImagePath variable with the resolved value
  console.log(selectedImagePath);
}).catch((error) => {
  // Handle any errors that occurred during the Promise execution
  console.error(error);
});
                    } else {
                        console.error('Failed to fetch url.txt:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching url.txt:', error);
                }
                break;
            case 2:
                document.querySelector('#avt01').src = avt01;
                document.querySelector('#avt2').src = aavt2;
                document.querySelector('#avt3').src = avt3;
                document.querySelector('#avt4').src = avt4;
                document.querySelector('#avt5').src = avt5;
                document.querySelector('#avt6').src = avt6;
                try {
                    const response = await fetch(imgurl3);
                    if (response.ok) {
                         await response.text().then((result) => {
  selectedImagePath = result;
  // Now you can use the selectedImagePath variable with the resolved value
  console.log(selectedImagePath);
}).catch((error) => {
  // Handle any errors that occurred during the Promise execution
  console.error(error);
});
                    } else {
                        console.error('Failed to fetch url.txt:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching url.txt:', error);
                }
                break;
            case 3:
                document.querySelector('#avt01').src = avt01;
                document.querySelector('#avt2').src = avt2;
                document.querySelector('#avt3').src = aavt3;
                document.querySelector('#avt4').src = avt4;
                document.querySelector('#avt5').src = avt5;
                document.querySelector('#avt6').src = avt6;
                try {
                    const response = await fetch(imgurl2);
                    if (response.ok) {
                         await response.text().then((result) => {
  selectedImagePath = result;
  // Now you can use the selectedImagePath variable with the resolved value
  console.log(selectedImagePath);
}).catch((error) => {
  // Handle any errors that occurred during the Promise execution
  console.error(error);
});
                    } else {
                        console.error('Failed to fetch url.txt:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching url.txt:', error);
                }
                break;
            case 4:
                document.querySelector('#avt01').src = avt01;
                document.querySelector('#avt2').src = avt2;
                document.querySelector('#avt3').src = avt3;
                document.querySelector('#avt4').src = aavt4;
                document.querySelector('#avt5').src = avt5;
                document.querySelector('#avt6').src = avt6;
                try {
                    const response = await fetch(imgurl5);
                    if (response.ok) {
                         await response.text().then((result) => {
  selectedImagePath = result;
  // Now you can use the selectedImagePath variable with the resolved value
  console.log(selectedImagePath);
}).catch((error) => {
  // Handle any errors that occurred during the Promise execution
  console.error(error);
});
                    } else {
                        console.error('Failed to fetch url.txt:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching url.txt:', error);
                }
                break;
                case 5:
                    
                document.querySelector('#avt01').src = avt01;
                document.querySelector('#avt2').src = avt2;
                document.querySelector('#avt3').src = avt3;
                document.querySelector('#avt4').src = avt4;
                document.querySelector('#avt5').src = aavt5;
                document.querySelector('#avt6').src = avt6;
                    try {
                        const response = await fetch(imgurl4);
                        if (response.ok) {
                             await response.text().then((result) => {
      selectedImagePath = result;
      // Now you can use the selectedImagePath variable with the resolved value
      console.log(selectedImagePath);
    }).catch((error) => {
      // Handle any errors that occurred during the Promise execution
      console.error(error);
    });
                        } else {
                            console.error('Failed to fetch url.txt:', response.status);
                        }
                    } catch (error) {
                        console.error('Error fetching url.txt:', error);
                    }
                    break;

                    case 6:
                        document.querySelector('#avt01').src = avt01;
                document.querySelector('#avt2').src = avt2;
                document.querySelector('#avt3').src = avt3;
                document.querySelector('#avt4').src = avt4;
                document.querySelector('#avt5').src = avt5;
                document.querySelector('#avt6').src = aavt6;
                    try {
                        const response = await fetch(imgurl6);
                        if (response.ok) {
                             await response.text().then((result) => {
      selectedImagePath = result;
      // Now you can use the selectedImagePath variable with the resolved value
      console.log(selectedImagePath);
    }).catch((error) => {
      // Handle any errors that occurred during the Promise execution
      console.error(error);
    });
                        } else {
                            console.error('Failed to fetch url.txt:', response.status);
                        }
                    } catch (error) {
                        console.error('Error fetching url.txt:', error);
                    }
                    break;
            default:
                selectedImagePath = ''; // Handle other cases if needed
                break;
        }
        
        this.UpdateFaceImageUrl(selectedImagePath);
            //  this.OnShowResult();
        document.querySelector('.nxtbutton').style.display = 'flex'; 
        document.querySelector('.befnxtbutton').style.display = 'none';
      }
      
    render() { 
        const { imageUrl } = this.state;
        let uploadtxt = uploadingtxt;
        let nextBtnImg = nextBtnImage;
        let width= '150.888px';
        let height= '200.888px';
        if (window.innerWidth <= 480) {
            uploadtxt=anduploadingtxt;
            width= '90.888px';
            height= '125.888px';

        } else if (window.innerWidth <= 768) {
            uploadtxt=anduploadingtxt;
            width= '100.886px';
            height= '155.886px';
        }
        
          const { clickedImageIndex } = this.state;
        return (
            
        <div className='Avtaar'>
            <div className='images'>
            <div className='image-row'>
            <img src={avt01} alt="" onClick={() => this.handleImageClick(1)} id='avt01' className={clickedImageIndex === 1 ? 'clicked' : 'notclicked'}  />  
            <img src={avt2} alt="" onClick={() => this.handleImageClick(2)} id='avt2' className={clickedImageIndex === 2 ? 'clicked' : 'notclicked'} /> 
            <img src={avt3} alt="" onClick={() => this.handleImageClick(3)} id='avt3' className={clickedImageIndex === 3 ? 'clicked' : 'notclicked'}  /> 
            </div><div className='image-row'>
            <img src={avt4} alt="" onClick={() => this.handleImageClick(4)} id='avt4' className={clickedImageIndex === 4 ? 'clicked' : 'notclicked'} /> 
            <img src={avt5} alt="" onClick={() => this.handleImageClick(5)} id='avt5' className={clickedImageIndex === 5 ? 'clicked' : 'notclicked'}  /> 
            <img src={avt6} alt="" onClick={() => this.handleImageClick(6)} id='avt6' className={clickedImageIndex === 6 ? 'clicked' : 'notclicked'}   /> 
            </div>
            </div>
            <img id="homeBtn2" src={home} onClick={() => window.location.reload()} />

<img src={nextBtnImg} onClick={this.handleNextBtn} className="befnxtbutton" id="homeBtn1" alt=""  style={{opacity: 0.5}}/>
                
        <img src={nextBtnImg} onClick={this.handleNextBtn} className="nxtbutton" id="homeBtn1" alt=""  style={{ display: 'none' ,cursor:'pointer'}}/>
                
        </div>
        
        );
    }
}
 
export default Avtaar;