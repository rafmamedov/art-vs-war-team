import { Component } from "react";
import axios from "axios";

const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';
const SAVEIMAGE = 'https://www.albedosunrise.com/images';

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const { setImage, username } = this.props;

    const cloudName = "dq415fvzp";
    const uploadPreset = "signed-image";
    const folder = `art-app/${username}/author-photo`;

    axios.get(SIGNATURE, { uploadPreset, folder, source: "uw" })
      .then(response => {
        const uploadSignature = response.data.signature;
        const uploadSignatureTimestamp = response.data.timestamp;

        var myWidget = window.cloudinary.createUploadWidget(
          {
            api_key : '587219262524673',
            cloudName,
            uploadPreset,
            uploadSignature,
            uploadSignatureTimestamp,
            multiple: false,
            folder,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);

              const imageData = {
                publicId: result.info.public_id,
                height: result.info.height,
                width: result.info.width,
                version: result.info.version,
                signature: result.info.signature,
              };

              setImage(imageData);
            }
          }
        );

        document.getElementById("upload_widget").addEventListener(
          "click",
          function () {
            myWidget.open();
          },
          false
        );
      });
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
