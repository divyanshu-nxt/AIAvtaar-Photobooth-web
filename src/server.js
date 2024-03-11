
const fs = require('fs');
const path = require('path');

async function toB64(imgPath) {
    const data = fs.readFileSync(path.resolve(imgPath));
    return Buffer.from(data).toString('base64');
}

const api_key = "YOUR API-KEY";
const url = "https://api.segmind.com/v1/sd2.1-faceswapper";

const data = {
  "input_face_image": "toB64('https://www.segmind.com/elon.jpg')",
  "target_face_image": "toB64('https://www.segmind.com/burn.gif')",
  "file_type": "gif",
  "face_restore": true
};

(async function() {
    try {
        const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
    }
})();