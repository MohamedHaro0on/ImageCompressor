import { useState } from "react";
import ClassNames from "./ImageCompressor.module.css";
import Steps from "./Steps";
import imageCompression from "browser-image-compression";


const ImageCompressor = () => {
    const [state, setState] = useState({
        comspressedLink: "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
        orginalImage: "",
        originalLink: "",
        clicked: false,
        uploadImage: false,
        outputFileName: false,
    });

    const HandleChange = (e) => {
        let ImageFile = e.target.files[0];
        let Image = URL.createObjectURL(ImageFile);
        setState({
            ...state,
            originalLink: Image,
            uploadImage: true,
            orginalImage: ImageFile,
            outputFileName: ImageFile.name,
        }
        )
    }
    const HandleCompress = (e) => {
        e.preventDefault();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true,
        }
        if (options.maxSizeMB >= state.orginalImage.size / 1024) {
            alert("the Image is too small , canot be compressed", state.orginalImage);
            return 0;
        }
        imageCompression(state.orginalImage, options).then(result => {
            setState({
                ...state, comspressedLink: URL.createObjectURL(result), clicked: true,
            })
        })
        return 1;
    }
    return (
        <div className={ClassNames.MainContainer}>
            <Steps />

            {/* this is the Input  */}
            <div className={ClassNames.InputContainer}>
                <img
                    className={ClassNames.Image}
                    src={state.uploadImage ? state.originalLink : "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"}
                    alt="Your Input"
                />
                <input className={ClassNames.BlackBtn} accept="image/*" type="file" onChange={(e) => HandleChange(e)} />

                {/* The Compress Button */}
                {
                    state.outputFileName &&
                    <button className={ClassNames.BlackBtn} onClick={(e) => HandleCompress(e)}>Compress</button>
                }
            </div>

            {/* the Compressed Image. */}
            <div className={ClassNames.OutputContainer}>
                <img src={state.comspressedLink} className={ClassNames.Image} alt="The compressed Image" />
                {state.clicked && <a download={state.outputFileName} href={state.comspressedLink} className={ClassNames.BlackBtn}> download </a>}
            </div>
        </div>
    )
}

export default ImageCompressor