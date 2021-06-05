import React, { useEffect, Fragment, useCallback, useState } from "react"; 
import axios from 'axios'
import { useForm } from 'react-hook-form';

import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
var FA = require('react-fontawesome')



function App() {
  const [header, setHeader] = useState("VOICE RECOGNITION");
  const [text, setText] = useState("")
  const [fileName, setFileName] = useState("")
  const [disable, setDisable] = useState(false)
  const [file,setFile] = useState(null)

  const {register , handleSubmit} = useForm();

  const handleChange = (event) => {
    let typeFile = (event.target.files && event.target.files[0].name.slice(-3))
    if (typeFile == "wav" || typeFile == "mp3"){
      setFileName(event.target.files[0].name)
      setFile(event.target.files[0])
      setText("")
    }
  }

  const onSubmit = (data) => {
    async function sendData (data) {
      setDisable(true)
      const dataForm = new FormData();
      dataForm.append('voice_file',file);
      const result = await axios({
				method: 'post',
				url: `http://localhost/`,
				headers : {
				},
				data: dataForm
			});
      setText(result.data)
      setFileName("") 
      setDisable(false)
    }

    sendData()
  }
  
  

  useEffect(
    () => {
    }
  ,[])


  return (
    <div class="App">
      <div class="container">
        <div id="#heading" class="heading">{header}</div>
        <div class="cards-wrapper">
          <div class="card left">
            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
              <div class="group-btn">
                <label  class="custom-file-input">
                  <input type="file" name="voice_file" onChange={handleChange} />
                </label>
                <label  class="custom-file-input file-blue">
                  <input type="file" name="record" />
                </label>
              </div>
              {
                (fileName.length > 0) &&
                <div>
                  <div class="file_name">
                    {fileName}
                  </div>
                  <div class="btn-send-container">
                    <button class="btn-send" type="submit" disabled={disable}>
                      Gửi File
                    </button>
                  </div>
                </div>
              }
            </form>
          </div>
          <div class="card arrow_field">
            {(text.length > 0) && <FA 
            name="arrow-right"
            />}
          </div>
          <div class="card board">
          {(text.length > 0) && <div class="text_field">
              {text}
              </div>}
            
          </div>
        </div>
	    </div>
    </div>
  );
}

export default App;
