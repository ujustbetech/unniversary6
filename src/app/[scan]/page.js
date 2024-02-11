'use client' // Error components must be Client Components
import { useRouter } from 'next/navigation'

import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link'

import axios from 'axios';
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from 'react';
// import { Router, useRouter } from 'next/router';
import backgroundImage from "../../../public/spaceimg.png";
import QrReader from 'react-qr-scanner';
export default function Scan({ params }) {
    const router = useRouter()
    //   console.log(router);
    const mobilenumber2 = params.scan
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] = useState('');
    const [userDetails, setuserDetails] = useState([]);

    // const classes = useStyles();
    const qrRef = useRef(null);
    const [phonenumber, setphonenumber] = useState();
    const [firstname, setfirstname] = useState();
    const [lastname, setlastname] = useState();
    const [role, setrole] = useState();
    const [registeration, setregisteration] = useState();
    const [attendance, setattendance] = useState();

    const [foodcounter, setfoodcounter] = useState(false);
    const [foodscanner, setfoodScanner] = useState(true);
    const [alldata, setAllData] = useState({});
    const [present, setPesent] = useState(false);
    const [loginfailedpopup, setLoginfailedpopup] = useState(false);
    const router2 = useRouter();

    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const localstorage = (localdata) => {
        console.log("local storage", localdata);
        const itmes = {
            firstname: localdata.firstname,
            lastname: localdata.lastname,
            phonenumber: localdata.number,
            // attendance: localdata.attendance,
            role: localdata.role

        }
        localStorage.setItem('unniversary', JSON.stringify(localdata));
    };
    const handleScanWebCam = async (result) => {
        // const saved = localStorage.getItem("items");
        const saved = localStorage.getItem("unniversary");
        const localstoragedata = JSON.parse(saved)
        console.log("current login", saved);

        if (result) {
            const text3 = JSON.stringify(result)
            console.log(result, "text2", text3[9]);



            console.log("test data");
            if (text3[9] === "6") {
                console.log("suscess");
                // setPesent(true)
                const user = {
                    scanQr: "yes",
                    number: localstoragedata.number
                }
                console.log(user);
                const response = await axios
                    .post('https://unniversary.ujustconnect.com/QRScan.php', user)
                    .catch((error) => console.log('Error: ', error));
                if (response && response.data) {
                    console.log(response, "scan done");
                    console.log(response.data);
                    if (response.data.status === "Allready scan QR") {
                        console.log("scanning done");
                        // setPesent(true);
                        loginClick(localstoragedata.number);
                    }

                }



            }


        }
    }


    const loginClick = async (phone) => {

        // console.log(showpopup);
        // e.preventDefault();
        console.log("phone", phone);
        const user = {
            number: phone,
        }
        console.log(user);
        const response = await axios
            .post('https://unniversary.ujustconnect.com/login.php', user)
            .catch((error) => console.log('Error: ', error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data.status);
            if (response.data.status === "success") {
                // setshowpopup(true);
                // setresponsedata(response.data);
                localstorage(response.data);
                // setTimeout(() => {
                //     // alert("test");
                //     // setshowpopup(false);
                //     // setfirstname("")
                //     // setlastname("")
                //     // setmobilenumber("")
                //     // setloginDone(true)
                //     // setlogin(false)
                //     // setregistration(false)
                //     localstorage(response.data);


                // }, 3000);

            }
            if (response.data.status === "User not exists") {
                setloginfailedpopup(true);
                console.log("user not there");
                setTimeout(() => {
                    // alert("test");
                    // setshowpopup(false);
                    // setfirstname("")
                    // setlastname("")
                    // setmobilenumber("")
                    // setloginDone(true)
                    // setlogin(false)
                    // setregistration(false)
                    // localstorage(response.data);
                    setloginDone(true)
                    setlogin(false)
                    setloginfailedpopup(false);
                    setlogin(false)
                    setregistration(true)

                }, 3000);

            }
        }


        // console.log(showpopup);

    };

    useEffect(() => {

        console.log("use effect");
        const saved = localStorage.getItem("unniversary");
        const localstoragedata = JSON.parse(saved)
        if (saved) {
            if (localstoragedata.scanQr !== null) {
                console.log("already scann QR");
                setPesent(true);
            }
        }
        else {
            router.push("/")
        }

    }, [])



    return (


        <>
            {/* <p>Post: {params.scan}</p> */}

            <section className="wrapperScan" style={{
                // use the src property of the image object
                backgroundImage: `url(${backgroundImage.src})`
                // other styles
            }}>
                <div className='logo'>
                    <img src='/universary.svg' />
                </div>
                {
                    present ? <div className='QrcodeContainer'>

                    <QrReader
                        delay={300}
                        style={{ width: '100%' }}
                        onError={handleErrorWebCam}
                        onScan={handleScanWebCam}
                    />
                    <h2>Scan here</h2>


                </div> : 
                    <>
                    <div className='welcomemessage'>
                        {/* <h5>
                            Something Plus Business
                        </h5>
                        <h6>Welcome to Exploration Journey {alldata.firstname} {alldata.lastname}</h6> */}
                        <img src='/Tagline.png' />
                    </div>
                    <div className='programsequence'>
                        <h2>Trajectory</h2>
                        <ul>
                            {/* <li>
                                <h6>Ganesh Vandana</h6>
                                <p>Prarthana by Ashwin Joshi</p>
                            </li> */}
                            <li>
                                <h6>Registration of Guest</h6>
                                <p>4:30 PM Onwards</p>
                            </li>
                            <li>
                                <h6>Fingure Print Activity</h6>
                                <p>4:30 PM Onwards</p>
                            </li>
                            <li>
                                <h6>Welcome Note</h6>
                                <p>5:15 PM to 5:25 PM</p>
                            </li>

                            <li>
                                <h6>Games</h6>
                                <p>5:30 PM to 6:30 PM</p>
                            </li>
                            <li>
                                <h6>Games Recognition</h6>
                                <p>6:30 PM to 6:50 PM</p>
                            </li>
                            <li>
                                <h6>Break + Snacks</h6>
                                <p>7:00 PM to 7:20 PM</p>
                            </li>
                            <li>
                                <h6>UJustBe Poem by Pramodini Marne</h6>
                                <p>7:30 PM to 7:35 PM</p>
                            </li>
                            <li>
                                <h6>Opening Speach</h6>
                                <p>7:35 PM to 7:45 PM</p>
                            </li>
                            <li>
                                <h6>Musafir Hoon Yaaro</h6>
                                <p>7:55 PM to 8:00 PM</p>
                            </li>
                            <li>
                                <h6>Creator's Speech</h6>
                                <p>8:05 PM to 8:25 PM</p>
                            </li>
                            <li>
                                <h6>UJustBe as of today</h6>
                                <p>8:25 PM to 8:30 PM</p>
                            </li>
                            <li>
                                <h6>Awards + Guest Speech </h6>
                                <p>8:35 PM to 8:55 PM</p>
                            </li>
                            <li>
                                <h6>Nucleus Team Performance </h6>
                                <p>8:55 PM to 9:00 PM</p>
                            </li>
                            <li>
                                <h6>Nucleus Team Closing Speech </h6>
                                <p>9:10 PM to 9:15 PM</p>
                            </li>
                            <li>
                                <h6>Dinner </h6>
                                <p>9:15 PM onwards</p>
                            </li>

                        </ul>


                    </div>
                </> 
                }
                {
                    present ? null
                        :
                        <>
                            <div className='footerHome'>
                                <h2>Please Scan here to Experience Space</h2>
                            </div>

                        </>
                }

                {/* {
        foodscanner ? <div className='scanContainer'>
        <button className='scanButton2 scanbuttonfixed' onClick={scanFood}>Food</button></div>
          : null
      } */}


                {
                    loginfailedpopup ? <div className='c-popupbg'>
                        <div className='bg-popup'></div>
                        <div className='c-loginpopup'>
                            <div>
                                <img src="/images/cancel_icon.png" />
                                <h5>You are trying to login from wrong device </h5>
                                {/* <h4>Welcome to celebration </h4> */}
                            </div>
                        </div></div> : null
                }

                <div className='socialmediaIcon'>
                    <ul>
                        <li>
                            <Link href="https://www.instagram.com/ujustbeuniverse/" target='_blank'><img src='/instagram.png' /></Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/@UJustbeUniverse" target='_blank'><img src='/youtube.png' /></Link>
                        </li>
                        <li>
                            <Link href="https://www.facebook.com/UJustBeUniverse1" target='_blank'><img src='/facebook.png' /></Link>
                        </li>
                    </ul>
                </div>

            </section>
        </>


    )
}
