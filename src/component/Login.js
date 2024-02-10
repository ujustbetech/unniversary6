'use client' // Error components must be Client Components

import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Router, useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
// import logo from '../images/logo.png'
import backgroundImage from "../../public/spaceimg.png";
import Link from 'next/link'
function Login() {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [role, setrole] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');
    const [showpopup, setshowpopup] = useState(false);
    const [showpopup2, setshowpopup2] = useState(false);
    const [responsedata, setresponsedata] = useState("");
    const [registration, setregistration] = useState(false);
    const [loginstate, setlogin] = useState(true);
    const [loginfailedpopup, setloginfailedpopup] = useState(false);
    const [loginDone, setloginDone] = useState(false);
    const [attendance, setattendance] = useState(false);
    const [foodcounter, setfoodcounter] = useState(false);

    const router2 = useRouter()

    // useEffect(() => {
    //     const saved = localStorage.getItem("itmes");
    //     const localstoragedata = JSON.parse(saved)
    //     if (saved) {
    //         console.log("already Login", localstoragedata.firstname);
    //         setlogin(false);
    //         setloginDone(true);
    //         setresponsedata(localstoragedata)
    //         // console.log(responsedata.firstname);
    //         router2.push("/" + localstoragedata.phonenumber )

    //     } else {

    //     }
    // }, [])

    useEffect(() => {


        const saved = localStorage.getItem("unnivesary");
        const localstoragedata = JSON.parse(saved)

        if (saved) {
            // console.log("already Login", localstoragedata.firstname);
            // axios.get(`https://plankton-app-i2dnd.ondigitalocean.app/login/${localstoragedata.phonenumber}/`).then(response => {
            //     console.log(response);
            //     const alldata = response.data;
            //     setresponsedata(alldata)
            //     if (alldata.attendance === 1) {
            //         // setPesent(true)
            //         router2.push("/" + localstoragedata.phonenumber)
            //     }
            //     // if (alldata.foodcounter === 1) {
            //     //   setfoodcounter(true)
            //     // }

            // });

            const response = axios
            .post('https://unniversary.ujustconnect.com/login.php', user)
            .catch((error) => console.log('Error: ', error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data.status);
            if (response.data.status === "success"){
                setshowpopup(true);
                setresponsedata(response.data);
                setTimeout(() => {
                    // alert("test");
                    setshowpopup(false);
                    setfirstname("")
                    setlastname("")
                    setmobilenumber("")
                    setloginDone(true)
                    setlogin(false)
                    setregistration(false)
                    localstorage(response.data);


                }, 3000);

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


        }
    }, [])

    const hidepopup = (e) => {
        setshowpopup(false)
        setshowpopup2(false)
        setloginfailedpopup(false)
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
        localStorage.setItem('unniversary', JSON.stringify(itmes));
    };


    const scanClick = async (e) => {
        e.preventDefault();

        const saved = localStorage.getItem("unniversary");
        const localstoragedata = JSON.parse(saved)
        console.log("current login", localstoragedata.phonenumber);
        router2.push("/" + responsedata.number)


    }

    const handleClick = async (e) => {
        e.preventDefault();
        const user = {
            firstname: firstname,
            lastname: lastname,
            role: role,
            number: mobilenumber,
        }
        console.log(user);
        const response = await axios
            .post('https://unniversary.ujustconnect.com/register.php', user)
            .catch((error) => console.log('Error: ', error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data);
            if (response.data.status === "success") {
                setshowpopup(true);
                setresponsedata(response.data);
                setTimeout(() => {
                    // alert("test");
                    setshowpopup(false);
                    setfirstname("")
                    setlastname("")
                    setmobilenumber("")
                    setloginDone(true)
                    setlogin(false)
                    setregistration(false)
                    // localstorage(response.data);


                }, 3000);

            }
            if (response.data.status === "acccount exists") {
                console.log("account axist");
                setshowpopup2(true);
                setTimeout(() => {
                    // alert("test");
                    setshowpopup(false);
                    setfirstname("")
                    setlastname("")
                    setmobilenumber("")
                    // setloginDone(true)
                    // setlogin(false)
                    // setregistration(false)
                    setshowpopup2(false);
                    // localstorage(response.data);


                }, 3000);

            }
        }


        console.log(showpopup);
    };
    const loginClick = async (e) => {

        // console.log(showpopup);
        e.preventDefault();
        const user = {
            number: mobilenumber,
        }
        console.log(user);
        const response = await axios
            .post('https://unniversary.ujustconnect.com/login.php', user)
            .catch((error) => console.log('Error: ', error))    ;
        if (response && response.data) {
            console.log(response);
            console.log(response.data.status);
            if (response.data.status === "success"){
                setshowpopup(true);
                setresponsedata(response.data);
                setTimeout(() => {
                    // alert("test");
                    setshowpopup(false);
                    setfirstname("")
                    setlastname("")
                    setmobilenumber("")
                    setloginDone(true)
                    setlogin(false)
                    setregistration(false)
                    localstorage(response.data);


                }, 3000);

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


        console.log(showpopup);
        
    };
    const THREE_DAYS_IN_MS = 12 * 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

    // To set two dates to two variables
    var date1 = new Date();
    var date2 = new Date("02/11/2024");

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    let TotalDays = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    console.log(TotalDays + ' days to world Cup');


    return (
        <section className='c-loginpage' style={{
            // use the src property of the image object
            backgroundImage: `url(${backgroundImage.src})`,
            // other styles
          }}>
            <div className='c-login'>
                {loginDone ? null : <div className='logo'>
                    <div className='ujblogo'>
                        <img src="/images/logo.png" />
                    </div>
                    <div className='unniversarylogo'>
                        <img src="/images/unniversary.png" />
                    </div>
                </div>

                }


                {
                    loginDone ? <div className='c-logindone'>
                        <div className='logos'>
                            <div className='ujbl'>
                                <img src="/images/logo.png" />
                            </div>
                            <div className='welcome'>{'Welcome '}
                                <span>
                                    {responsedata.firstname} {responsedata.lastname}
                                </span></div>
                            <div className='unniversaryl'>
                                <img src="/images/unniversary.png" />
                            </div>
                        </div>
                        {
                            attendance ? <div className='welcomemessage'>
                                <h5>
                                    Something Plus Business
                                </h5>
                                <h6>Welcome to Exploration Journey {responsedata.firstname} {responsedata.lastname}</h6>

                            </div> : <div className='scan'>
                            <div className='welcomemessage'>
                                <h5>
                                    Something Plus Business
                                </h5>
                                <h6>Welcome to Exploration Journey {responsedata.firstname} {responsedata.lastname}</h6>

                            </div>
                                <button onClick={scanClick}>Scan Attendance</button>
                                
                                </div>
                        }

                    </div> : null
                }
                {
                    registration ? <form onSubmit={handleClick}>
                        <div className='regfrom'>
                            <input required minlength="10" type='tel' value={mobilenumber} placeholder='Mobile Number' onChange={(event) => {
                                setmobilenumber(event.target.value)
                            }}></input>
                            <input required value={firstname} placeholder='First Name' onChange={(event) => {
                                setfirstname(event.target.value)
                            }}></input>
                            <input required value={lastname} placeholder='Last Name' onChange={(event) => {
                                setlastname(event.target.value)
                            }}></input>
                            <select required name="role" id="role" onChange={(event) => {
                                setrole(event.target.value)
                            }}>
                                <option value="none" selected disabled hidden>Select Role</option>
                                <option value="Orbiter">Orbiter</option>
                                <option value="Cosmonaut">CosmOrbiter</option>
                                <option value="Guest">Guest</option>
                            </select>

                            <button type="submit" > Submit</button>
                        </div>
                    </form> : null
                }

                {
                    loginstate ? <form onSubmit={loginClick}>
                        <div className='regfrom'>
                            <input required type='tel' minlength='10' value={mobilenumber} placeholder='Mobile Number' onChange={(event) => {
                                setmobilenumber(event.target.value)
                            }}></input>
                            <button type="submit"  > Submit</button>
                        </div>
                    </form> : null
                }
            </div>
            {
                showpopup ? <div className='c-popupbg'>
                    <div onClick={hidepopup} className='bg-popup'></div>
                    <div className='c-loginpopup'>
                        <div>
                            <img src="/images/checked.png" />
                            <h5>Hi Orbiter {responsedata.firstname} {responsedata.lastname}</h5>
                            <h4>Welcome to celebration </h4>
                        </div>
                    </div></div> : null
            }
            {
                showpopup2 ? <div className='c-popupbg'>
                    <div onClick={hidepopup} className='bg-popup'></div>
                    <div className='c-loginpopup'>
                        <div>
                            <img src="/images/cancel_icon.png" />
                            <h5>This number already Exist</h5>
                            {/* <h4>Welcome to celebration </h4> */}
                        </div>
                    </div></div> : null
            }
            {
                loginfailedpopup ? <div className='c-popupbg'>
                    <div onClick={hidepopup} className='bg-popup'></div>
                    <div className='c-loginpopup'>
                        <div>
                            <img src="/images/cancel_icon.png" />
                            <h5>You have not register yet kindly register </h5>
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
        </section >
    )
}

export default Login
