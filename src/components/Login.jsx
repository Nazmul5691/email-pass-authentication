import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../firebase.init";
import { Link } from "react-router-dom";


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('')
    const emailRef = useRef();
    





    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccess(false);
        setLoginError('')



        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    setLoginError('please verify your email address')
                }
                else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.log(error.message);
                setSuccess(false);
                setLoginError(error.message)
            })
    }

    const handleForgotPassword = () =>{
        console.log('handleForgotPassword clicked', emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            console.log('please use a valid email');
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(() =>{
                alert('reset email sent. please check your email')
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }


    return (
        <div>
            <h1 className="text-4xl text-green-600 py-5 text-center">Log In</h1>
            <form onSubmit={handleSignIn}>
                <div className="hero bg-base-200 py-10">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input type="email" ref={emailRef} name="email" className="input" placeholder="Email" />
                                <div className="py-2 relative ">
                                    <div className="">
                                        <label className="fieldset-label mb-1">Password</label>
                                        <input type={showPassword ? "text" : "password"} name="password" className="input" placeholder="Password" />
                                    </div>
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute top-[44px] right-8">
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </button>
                                </div>
                                <div><a onClick={handleForgotPassword} className="link link-hover">Forgot password?</a></div>



                                <button className="btn btn-neutral mt-4">Log In</button>
                            </fieldset>

                            <p>New to this website? Please  <Link to="/register">Register</Link> </p>
                            {
                                success && <p className="text-green-600">successfully login </p>
                            }
                            {
                                loginError && <p className="text-red-600">{loginError}</p>
                            }
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default Login;