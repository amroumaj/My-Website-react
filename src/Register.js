import {useRef,useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "./API/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [PwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');       
    const [success, setSuccess] = useState(false);  

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const result =USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidMatch(result);
        const match = pwd ===matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd])

    useEffect(()=>{
        setErrMsg('');
    },[user, pwd, matchPwd])
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = axios.post(REGISTER_URL,JSON.stringify({user,pwd}),{
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log(response.accessToken);
            setSuccess(true);
        }
        catch (err){   
            if(!err?.response){//In case of absence of erroe msg eg. network connection interrupted
                setErrMsg('No response from server')
            }
            else if(err.response?.status === 409){
                setErrMsg('Username already in use');
            }
            else {
                setErrMsg('Registration non successful');
            }
            errRef.current.focus();//focuses on the field with the error
        }
    }

  return (
    <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ):(
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName">
                            Username:
                            <span className={validName? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validName || !user ? "hide": "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e)=>useState(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnots"
                            onFocus={()=> setUserFocus(true)}
                            onBlur={()=>setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"} >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters<br />
                            Must begin with a letter<br />
                            Letters, numbers, underscores, hyphens allowed
                        </p>

                        <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="password"
                            onChange={()=>setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" :true}
                            onFocus={()=>setPwdFocus(true)}
                            onBlur={()=>setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={PwdFocus && !validPwd ? "instruction" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters<br />
                            Must include uppercase and lowercase letters,a number and a special character<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span>
                            <span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span>
                            <span aria-label="percent">%</span>
                        </p>
                        
                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className={validMatch ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="confirm_pwd"
                            onChange={()=>setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" :true}
                            aria-describedby="confirmnote"
                            onFocus={()=>setPwdFocus(true)}
                            onBlur={()=>setPwdFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructiond" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field
                        </p>
                        <button disabled={!validName || !validPwd || !validMatch ? true :false}>Sign up</button>
                    
                    </form>
                    <p>
                        Already registered ? <br />
                        <span className="line">
                            {/*put router link here */}
                            <a href="#">Sign In</a> {/*placeHolder*/}
                        </span>
                    </p>
                </section>
            )}
    </>
  )
}

export default Register