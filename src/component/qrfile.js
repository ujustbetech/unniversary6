'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Router, useRouter } from 'next/router';
import QrReader from 'react-qr-scanner'

function Qrfile() {


  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [userDetails, setuserDetails] = useState([]);

  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    
    const text3 = JSON.stringify(result)
    console.log(text3[9]);  
  }

  return (
    <div>

      {/* qrfile */}

      <QrReader
        // delay={this.state.delay}
        // style={previewStyle}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
      />
      <p>test</p>

    </div>

  )
}

export default Qrfile