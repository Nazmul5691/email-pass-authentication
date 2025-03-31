import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {

    const [errorMassage, setErrorMassage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const terms = event.target.terms.checked;

        console.log(email, password, terms, name, photo);


        // reset error and status
        setErrorMassage('');
        setSuccess(false);


        if (password.length < 6) {
            setErrorMassage("Password should be at least 6 character")
            // setSuccess(false);
            return;
        }

        if (!terms) {
            setErrorMassage("Please accept our terms and condition");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user.email);
                console.log(result);
                setSuccess(true);

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert('email verification sent. please check your email')
                    })


                //update user profile
                const profile = {
                    displayName: name,
                    photoURL: photo,
                }

                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log('user profile updated');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })


            .catch(error => {
                console.log(error)
                setErrorMassage(error.message);
                setSuccess(false)
            })
    }




    return (
        <div>
            <h1 className="text-4xl text-green-600 py-5 text-center">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="hero bg-base-200 py-10">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Name</label>
                                <input type="text" name="name" className="input" placeholder="name" />
                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />
                                <label className="fieldset-label">Photo URL</label>
                                <input type="text" name="photo" className="input" placeholder="Photo URL" />
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


                                <label className="fieldset-label">
                                    <input type="checkbox" name="terms" className="checkbox" />
                                    Accept Our Terms and Condition
                                </label>

                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            <p>All ready have an account! Please  <Link to="/login">Log In</Link> </p>
                            {
                                errorMassage && <p className="text-red-600">{errorMassage}</p>
                            }
                            {
                                success && <p className="text-green-600">Register Success</p>
                            }
                        </div>
                    </div>

                </div>

            </form>
        </div>
    );
};

export default Register;