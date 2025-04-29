import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = false;
    console.log(event.target.files);
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setPreview(URL.createObjectURL(event.target.files[0]));
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    // generate preview url
    const fileReader = new FileReader(); // built in browser API
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div>
      <input
        type="file"
        accept=".jpg,.png,.jpeg"
        id={props.id}
        // className="hidden"
        style={{ display: "none" }}
        ref={filePickerRef}
        onChange={pickedHandler}

        // onBlur={props.onBlur}
        // onFocus={props.onFocus}
        // value={props.value}
        // required={props.required}
        // disabled={props.disabled}
      />
      <div className="center">
        <div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          )}

          {!preview && <p>Please pick an image.</p>}

          <Button
            type="button"
            onClick={pickImageHandler}
            className="bg-emerald-200"
          >
            Pick Image
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
        {isValid && <p>Image is valid!</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
