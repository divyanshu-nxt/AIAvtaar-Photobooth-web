import logo from './logo.svg';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

import sampleBackground from './images/xr_world_image.png'
import sampleImage from './images/example.png'
import { wait } from '@testing-library/user-event/dist/utils';
import nxtLogo from './images/AI/logo.png';
import nxtLogofin from './images/AI/image_14.png';
import andnxtLogo from './images/AI/andlogo.png';
// pages
import EntryPage from './components/EntryPage/EntryPage';
import PromptPage from './components/PromtPage/PromptPage';
import CameraPage from './components/CameraPage/CameraPage';
import ResultPage from './components/ResultPage/ResultPage';
import Browse from './components/Browse/Browse';
import Avtaar from './components/Avtaar/Avtaar';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function App() {
  let nxtLogoimg = nxtLogo;

  if (window.innerWidth <= 480) {
    nxtLogoimg =andnxtLogo;
  } else if (window.innerWidth <= 768) {
    nxtLogoimg =andnxtLogo;
  }
  const resultComponent = useRef("");
  const backgroundUrlRef = useRef("");
  const personUrlRef = useRef("");
  const FaceUrlRef=useRef("");
  const promptRef = useRef("");
  let cameraPageRef = useRef(null);
  global.d12="";
  global.d13="";
  const [currentState, updateState] = useState(0);

  // const [prompt, setPrompt] = useState("");

  // const [backgroundDataUrl, setBgUrl] = useState("");
  // const [personDataUrl, setPersonUrl] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);


  useEffect(() => {
    console.log("update state called with new state  - " + currentState.toString());
    if (currentState == 2) {
      // console.log(promptRef.current);
    }
    if (currentState == 3) {
      // console.log(personUrlRef.current);
     
    }
  }, [currentState])





  function SetupCamera() {
    return;
    let camera_button = document.querySelector("#start-camera");
    let video = document.querySelector("#video");
    let click_button = document.querySelector("#click-photo");
    let canvas = document.querySelector("#cameraCanvas");
    let stream;
    camera_button.addEventListener('click', async function () {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = stream;
    });

    click_button.addEventListener('click', function () {
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      // let image_data_url = canvas.toDataURL('image/jpeg');
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      // // data url of the image
      // console.log(image_data_url);
      let file = null;
      // canvas.toBlob(function (blob) {
      //   file = new File([blob], 'test.png', { type: 'image/png' });
      //   console.log(file)
      //   console.log(blob);
      //   var capturedImageUrl = URL.createObjectURL(blob);
      //   // let link = document.createElement('a');
      //   // link.download = 'example.png';
      //   // link.href = capturedImageUrl;
      //   // console.log(link.href);
      //   // link.click();
      //   // delete the internal blob reference, to let the browser clear memory from it
      //   // URL.revokeObjectURL(link.href);
      //   setPersonUrl(capturedImageUrl);
      // }, 'image/png');
      // const ctx = canvas.getContext('2d');.
      var url = canvas.toDataURL();
      url = url.replace('data:image/png;base64,', 'data:image/png;name=person.png;base64,')
      // setPersonUrl(url);
    });
  }

  function convertImageToBase64(imgUrl, callback) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.getElementById('renderCanvas');
      canvas.style.display = 'none';
      const ctx = canvas.getContext('2d');
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();
      callback && callback(dataUrl)
    }
    image.src = imgUrl;
  }

  function processPicsart() {
    const form = new FormData();
    form.append('output_type', 'cutout');
    form.append('bg_blur', '0');
    form.append('scale', 'fit');
    form.append('format', 'PNG');
    form.append('image_url', 'https://t4.ftcdn.net/jpg/03/63/53/59/360_F_363535957_8UX6zv8vC8dVfD74QpDrIHEBwxziG2VF.jpg');
    form.append('bg_image_url', 'https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg');

    axios.post(
      'https://api.picsart.io/tools/1.0/removebg',
      form,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data',
          "X-Picsart-API-Key": "9QAg3xxSskhYe4py1IMyeoGpvjcaQ1oM"
        }
      }
    ).then((res) => {
      // console.log(res);
      // console.log(res.data.data.url)
    });

  }



  const processStability = async (e) => {
    var url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
    var apiKey = "DhuINkjZByGBV3Smi7r0lbrCtVjnBd4cb8bR0UzW8dSXVQFz";
    console.log("called");
    const response = await axios.post(url, {
      'text_prompts': [
        {
          'text': 'A lighthouse on a cliff'
        }
      ],
      'cfg_scale': 7,
      'height': 1024,
      'width': 1024,
      'samples': 1,
      'steps': 30
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        }
      }).then((res) => {
        // console.log(res);
        // console.log(res.data);
        // fs.writeFileSync(
        //   `./out/v1_txt2img_1.png`,
        //   Buffer.from(res.data, 'base64')
        // )

        // var encodedResponse = btoa(res.data);

        var contentType = "image/png";
        const linkSource = `data:${contentType};base64,${res.data.artifacts[0].base64}`;
        // const linkSource = res.data;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = "generatedImage.png";
        downloadLink.click();
        document.getElementById('test').src = linkSource;
      });
    // let prediction = await response.json();
    // console.log(prediction);
  }

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  const processReplicate = async (e) => {
    e.preventDefault();
    console.log("called");
    var id = "r8_MDfOmZ6HkQLj1WchAoVED1KHJbkivAs3cFS3d";
    const response = await fetch("https://api.replicate.com/v1/predictions/gm3qorzdhgbfurvjtvhg6dckhu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + id,
      },
      body: JSON.stringify({
        prompt: "blue sky with a ufo and some thunder",
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      console.log("error")
      // console.log(prediction.detail);
      return;
    }
    console.log("waiting");
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        // setError(prediction.detail);
        console.log("error")
        // console.log(prediction.detail);
        return;
      }
      // console.log({ prediction })
      // setPrediction(prediction);
    }
    // setPrediction(prediction);
  }

  const testFromImage = (e) => {
    e.preventDefault();
    var personUrl = "";
    var backgroundUrl = "";
    var link31="";
    convertImageToBase64(sampleImage, (url) => {
      personUrl = url;
      personUrl = personUrl.replace('data:image/png;base64,', '')

      convertImageToBase64(sampleBackground, (url) => {
        backgroundUrl = url;
        backgroundUrl = backgroundUrl.replace('data:image/png;base64,', 'data:image/png;name=bg.png;base64,')

        
        // console.log(personUrl);
        // console.log(backgroundUrl);

        var personBlob = DataURIToBlob(personUrl);
        var bgBlob = DataURIToBlob(backgroundUrl);

        const form = new FormData();
        form.append('output_type', 'cutout');
        form.append('bg_blur', '0');
        form.append('scale', 'fit');
        form.append('format', 'PNG');
        form.append('image', link31);
        form.append('bg_image', bgBlob);

        axios.post(
          'https://api.picsart.io/tools/1.0/removebg',
          form,
          {
            headers: {
              'accept': 'application/json',
              'content-type': 'multipart/form-data',
              "X-Picsart-API-Key": "9QAg3xxSskhYe4py1IMyeoGpvjcaQ1oM"
            }
          }
        ).then((res) => {
          // console.log(res);
          // console.log(res.data.data.url)
        });
      });

    });

  }


  const SetImageFromBase64 = (dataUrl) => {

  }

  const SetConvertedImage = (url) => {
    // https://cdn.picsart.io/189945a1-ea53-4698-83a9-8aa044ec8fe0.png?type=PNG&to=max&r=0
  }


  // final functions of flow
  // const OnGenerate = async () => {

  //   if(isGenerating){
  //     alert('Already generating a prompt please wait!');
  //     return;
  //   }

  //   setIsGenerating(true);
  //   document.getElementById('generatingBtn').innerHTML = 'loading..'

  //   if(prompt.length < 10){
  //     alert('Prompt should be more then 10 letters');
  //     return;
  //   }


  //   var url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
  //   var apiKey = "sk-oPsyxtt9o5MnIjBoSMtZpxcACiVMh7o05jLZ4HFMuyEeX01y";
  //   console.log("called");

  //   // return;
  //   const response = await axios.post(url, {
  //     'text_prompts': [
  //       {
  //         'text': prompt
  //       }
  //     ],
  //     'cfg_scale': 7,
  //     'height': 1024,
  //     'width': 1024,
  //     'samples': 1,
  //     'steps': 30
  //   },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + apiKey
  //       }
  //     }).then((res) => {
  //       console.log(res);
  //       // console.log(res.data);
  //       var contentType = "image/png";
  //       var linkSource = `data:${contentType};base64,${res.data.artifacts[0].base64}`;
  //       // const linkSource = res.data;
  //       // const downloadLink = document.createElement("a");
  //       // downloadLink.href = linkSource;
  //       // downloadLink.download = "generatedImage.png";
  //       // downloadLink.click();
  //       document.getElementById('bg').src = linkSource;
  //       document.getElementById('generatingBtn').innerHTML = 'Generate';
  //       setIsGenerating(false);
  //       linkSource = linkSource.replace('data:image/png;base64,', 'data:image/png;name=bg.png;base64,');
  //       setBgUrl(linkSource);
  //     });
  // }

  // const OnMerge = async () => {
  //   console.log(personDataUrl);
  //   console.log(backgroundDataUrl);

  //   // now the api
  //   var personBlob = DataURIToBlob(personDataUrl);
  //   var bgBlob = DataURIToBlob(backgroundDataUrl);
  //   console.log(personBlob);
  //   console.log(bgBlob);

  //   document.getElementById("mergeBtn").innerHTML = "loading .. . ";

  //   console.log("loading . .. .");

  //   const form = new FormData();
  //   form.append('output_type', 'cutout');
  //   form.append('bg_blur', '0');
  //   form.append('scale', 'fit');
  //   form.append('format', 'PNG');
  //   form.append('image', personBlob);
  //   form.append('bg_image', bgBlob);

  //   axios.post(
  //     'https://api.picsart.io/tools/1.0/removebg',
  //     form,
  //     {
  //       headers: {
  //         'accept': 'application/json',
  //         'content-type': 'multipart/form-data',
  //         "X-Picsart-API-Key": "5s5cYNu5k6vGI8SMbXQ3LAPYtzHq0hOx"
  //       }
  //     }
  //   ).then((res) => {
  //     console.log(res);
  //     console.log(res.data.data.url)
  //     document.getElementById("mergeBtn").innerHTML = "Add bg To Image";
  //     document.getElementById('finalOutput').src = res.data.data.url;
  //   });


  // }


  // function new version for new flow 

  const OnGenerate = async () => {
    if (isGenerating) {
      alert('Already generating a prompt please wait!');
      return;
    }

    setIsGenerating(true);

    var url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";
    var apiKey = "sk-DhuINkjZByGBV3Smi7r0lbrCtVjnBd4cb8bR0UzW8dSXVQFz";
    console.log("ready to generate AI image");

    // return;
    const response = await axios.post(url, {
      'text_prompts': [
        {
          'text': promptRef.current
        }
      ],
      'cfg_scale': 7,
      'height': 1024,
      'width': 1024,
      'samples': 1,
      'steps': 30
    },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        }
      }).then((res) => {
        
        var contentType = "image/png";
        var linkSource = `data:${contentType};base64,${res.data.artifacts[0].base64}`;
        
        // console.log(linkSource);
        setIsGenerating(false);
        linkSource = linkSource.replace('data:image/png;base64,', 'data:image/png;name=bg.png;base64,');
        // setBgUrl(linkSource);
        backgroundUrlRef.current = linkSource;
        backgroundUrlRef.current=DataURIToBlob(backgroundUrlRef.current);
        // console.log("llll1");
        // console.log(backgroundUrlRef);
        
        
      });
  }

  const UpdatePersonImageUrl = (value) => {
    personUrlRef.current = value;
    // console.log("llll2");
    // console.log(personUrlRef.current);
  }

  const UpdateFaceImageUrl = (value) => {
    FaceUrlRef.current = value;
    console.log(typeof FaceUrlRef.current);
    FaceUrlRef.current=DataURIToBlob(FaceUrlRef.current)
    console.log("vvvkkk");
    console.log(typeof FaceUrlRef.current);
    console.log(FaceUrlRef.current);
  }

  const UpdatePrompt = (value) => {
    console.log("sdasd");
    console.log(value);
    promptRef.current = value;
  }

  const OnMerge = async () => {
    
    console.log("merge called .. . .. . ");
  //  console.log("vvvkkk31");
  //  console.log(link31);
   
  //   console.log("vvvkkk21");
  //  console.log(link21);
    // console.log(backgroundUrlRef.current);
    // now the api
    
    // console.log(personBlob);
    // console.log("vvvkkk11");
    // console.log(bgBlob);
    // document.getElementById("mergeBtn").innerHTML = "loading .. . ";
    console.log("loading . .. .");
    
    const form = new FormData();
    form.append('output_type', 'cutout');
    form.append('bg_blur', '0');
    form.append('scale', 'fit');
    form.append('format', 'PNG');
    form.append('image', FaceUrlRef.current);
form.append('bg_image', backgroundUrlRef.current);
    axios.post(
      'https://api.picsart.io/tools/1.0/removebg',
      form,
      {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data',
          "X-Picsart-API-Key": '9QAg3xxSskhYe4py1IMyeoGpvjcaQ1oM'
        }
      }
    ).then((res) => {
    //   console.log("got res . . .. bg");
    //   // console.log(res);
    //   // console.log(res.data.data.url)
    //   // document.getElementById("mergeBtn").innerHTML = "Add bg To Image";
    //   // document.getElementById('finalOutput').src = res.data.data.url;
    //   const options = {
    //     method: 'POST',
    //     url: 'https://ai-face-swap.p.rapidapi.com/swap',
    //     headers: {
    //       'content-type': 'application/json',
    //       'X-RapidAPI-Key': '64f652172cmsh4dae484a4f53bfdp13caafjsn17e79ecbbdd9',
    // 'X-RapidAPI-Host': 'ai-face-swap.p.rapidapi.com'
    //     },
    //     data: {
    //       source: link21,
    //       target: res.data.data.url
    //   }
    //   };
    //   axios.request(options).then((response) => {
    //     console.log("got res . . .. ");
    //     // console.log(res);
    //     // console.log(res.data.data.url)
    //     // document.getElementById("mergeBtn").innerHTML = "Add bg To Image";
    //     // document.getElementById('finalOutput').src = res.data.data.url;
    //     // console.log("vvvv");
    //     // console.log(response.data.result);
    //     global.d12="data:image/png;base64,"+response.data.result;DataURIToBlob(backgroundUrlRef.current);
        
    //   });
    global.d12=res.data.data.url;
    
      
    });
//     while (
//       backgroundUrlRef.current == "" || personUrlRef.current == "")
//      {
//       console.log("wait1");
//       await sleep(1000);
//     }
// var link1=backgroundUrlRef.current.replace('data:image/png;name=bg.png;base64,','');
// var link2=personUrlRef.current.replace('data:image/png;name=person.png;base64,','');


//     const options = {
//       method: 'POST',
//       url: 'https://ai-face-swap.p.rapidapi.com/swap',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '9f78ba82c5msh8e43a7188eb8bc5p18f646jsnd1e7b6b184e6',
//     'X-RapidAPI-Host': 'ai-face-swap.p.rapidapi.com'
//       },
//       data: {
//         source: link1,
//         target: link2
//   }
    // };
    
    // try {
    //   await sleep(2000);
    //   const response = await axios.request(options);
    //   console.log("response.data.result");
    //   console.log(response.data.result);

    // } catch (error) {
    //   console.error(error);
    // }
    

  }

  const uptodate = async () => {
    if (cameraPageRef.current) {
      cameraPageRef.current.updateProgress(20);
    } else {
      console.log("not found1");
    }

    let progressValue = 20;
    const updateProgressAsync = async () => {
      while (progressValue !== 100) {
        if(global.d13 !== "" ){
          while (progressValue <= 100) {
          progressValue = progressValue + 3;
          if (cameraPageRef.current) {
            cameraPageRef.current.updateProgress(progressValue);
          } else {
            console.log("not found2");
          }
        }
          console.log("global.d13");
          console.log(global.d13);
          global.d14=global.d13;
          updateState(4);
          break;

        }
        progressValue = progressValue + 0.4;

        // Check if cameraPageRef.current is available before calling updateProgress
        if (cameraPageRef.current) {
          cameraPageRef.current.updateProgress(progressValue);
        } else {
          console.log("not found2");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    };

    await updateProgressAsync();
  };
  
  
  const OnMergeFace = async () => {
    console.log("vvvv");
   console.log(global.d12);
   
    var link21=personUrlRef.current;
    link21 = link21.replace('data:image/png;name=person.png;base64,', '');
    console.log("vvvv111");
    console.log(link21);
    console.log("merge called Face.. . .. . ");
      const options = {
        method: 'POST',
        url: 'https://ai-face-swap.p.rapidapi.com/swap',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '6e4bc99dd1mshf55f3167c55552cp1f9837jsn33037b4f527f',
    'X-RapidAPI-Host': 'ai-face-swap.p.rapidapi.com'
        },
        data: {
          source: link21,
          target: global.d12
      }
      };
      
      
      axios.request(options).then((response) => {
        console.log("got res .face . .. ");
        // console.log(res);
        // console.log(res.data.data.url)
        // document.getElementById("mergeBtn").innerHTML = "Add bg To Image";
        // document.getElementById('finalOutput').src = res.data.data.url;
        // console.log("vvvv");
        // console.log(response.data.result);
        global.d13="data:image/png;base64,"+response.data.result;
        console.log("vvvv222");
        console.log(global.d13);
        
        
      });
  }
  const OnShowResult = async () => {
    
      console.log("waiting .. . . .");
      while(backgroundUrlRef.current == "" || FaceUrlRef.current==""){
        await new Promise((resolve) => setTimeout(() => resolve(),2000) );
        console.log("wait called .. . ");
      }
      // console.log(backgroundUrlRef.current);
      OnMerge();
      
      
  }


  const OnShowResultFace = async () => {
    
    console.log("waiting .. . . .");
    while(global.d12 == "" || personUrlRef.current==""||backgroundUrlRef.current == "" ){
      await new Promise((resolve) => setTimeout(() => resolve(),2000) );
      console.log("wait called .. . ");
    }
    // console.log(backgroundUrlRef.current);
    OnMergeFace();
    
    
}


  const OnBackgroundGenerated = () => {
    // background is generate 
    // front is generate
  }
 
  return (
    // <div className="App">
    //   <h1>AI Generated background</h1>
    //   {/* <form> */}
    //     <label htmlFor="prompt">
    //       Prompt:&nbsp; 
    //       <input
    //         type="text"
    //         id="prompt"
    //         value={prompt}
    //         style={{width:'40%' , margin:'5px' , padding:'5px'}}
    //         placeholder="Enter your prompt here!"
    //         onChange={(e) => {
    //           e.preventDefault();
    //           setPrompt(e.target.value);
    //         }}
    //       />

    //     </label>
    //     <button id='generatingBtn' onClick={OnGenerate} >Generate</button>
    //     <br/>
    //     <img style={{ border: '2px solid black', height: '512px', width: '512px' , margin:'20px' }} id="bg" />
    //   {/* </form> */}
    //   <div className='cameraSection'>
    //     <button id="start-camera">Start Camera</button>
    //     <video style={{ border: '2px solid black' }} id="video" width="320" height="240" autoPlay></video>
    //     <button id="click-photo">Click Photo</button>
    //     <canvas style={{ border: '2px solid black' }} id="cameraCanvas" width="320" height="240"></canvas>
    //   </div>
    //   <div className='optionsDiv'>
    //     {/* <button onClick={processStability}>Generate background</button>
    //     <button onClick={processPicsart}>Change background</button> */}
    //     <button id="mergeBtn" onClick={OnMerge}>Add bg To Image</button>

    //     <img style={{ border: '2px solid black', height: '300px', width: '300px' }} id="finalOutput" />
    //     {/* <img id = "person" /> */}

    //   </div>
    //   <canvas style={{ border: '2px solid black' , display:'none' }} id="renderCanvas"></canvas>
    // </div>
    

    
    <div className='mainBg'>
      

      <img src={nxtLogofin} alt="" id="nxtLogo" />
      
       {currentState == 0 && <EntryPage updateState={updateState} />}
      {currentState == 1 && <PromptPage UpdatePrompt={UpdatePrompt} updateState={updateState} OnGenerate={OnGenerate} />}  
      {currentState == 2 && <Avtaar UpdateFaceImageUrl={UpdateFaceImageUrl} updateState={updateState} OnShowResult={OnShowResult} />} 
       {currentState == 3 && <CameraPage  UpdatePersonImageUrl={UpdatePersonImageUrl} updateState={updateState} OnShowResultFace={OnShowResultFace} ref={cameraPageRef} uptodate={uptodate}/>}
      {currentState == 4 && <ResultPage data={global.d14} />}  
    </div>
  );
}

export default App;


