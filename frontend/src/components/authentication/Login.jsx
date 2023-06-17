// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from '../images/logo.png'
// import { ForgottenPassword } from "./Forgotten";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(`Email: ${email}, Password: ${password}`);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen ">
//       <img src={logo} alt="" className="w-40 mb-10"/>
//       <form onSubmit={handleSubmit} className="bg-white p-10 h-[25rem] w-[24rem] xs:w-[20rem] rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-5">Login</h2>

//         <div className="mb-5">
//           <label htmlFor="email" className="block text-gray-700 font-bold mb-2"> Email </label>
//           <input type="email" id="email" value={email} placeholder='email@example.com' onChange={handleEmailChange} className="border-gray-400 border-2 p-2 w-full rounded-lg" required />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="block text-gray-700 font-bold mb-2"> Password </label>
//           <input type="password" id="password" minLength={8} placeholder='••••••••' value={password} onChange={handlePasswordChange} className="border-gray-400 border-2 p-2 w-full rounded-lg" required />
//         </div>

//         <div className="mt-7">
//           <button type="submit" className=" w-full p-2 border border-black  rounded-full font-bold bg-black text-white hover:bg-gray-700/100" > Continue </button>    
//           <Link to='/forgottenPassword'> <ForgottenPassword/> <p className="underline mt-5 font-light">forgotten your Password?</p></Link>    
//         </div>

//       </form>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'
import { ForgottenPassword } from "./Forgotten";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:max-w-2xl mx-auto">
        <div className="flex flex-col items-center my-12">
          <Link to='/'><img src={logo} alt="Logo" className="w-40 mb-8"/></Link>
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 w-full  landscape:md2:w-[80%] rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-8">Login</h2>
              <Link to='/signup' className="block text-sm text-black font-light mb-7"> Create an account? </Link> 
            </div>


            <div className="mb-6">
              <label htmlFor="email" className="block text-black font-bold mb-2"> Email </label>
              <input type="email" id="email" value={email} placeholder='email@example.com' onChange={handleEmailChange} className="border-gray-400 border-2 p-2 w-full rounded-lg" required />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-black font-bold mb-2"> Password </label>
              <input type="password" id="password" minLength={8} placeholder='••••••••' value={password} onChange={handlePasswordChange} className="border-gray-400 border-2 p-2 w-full rounded-lg" required />
            </div>

            <div className="mt-8">
              <button type="submit" className="w-full py-3 bg-[#014e56] hover:bg-[#062c30] text-white font-bold rounded-lg">Continue</button>    
              <Link to='/forgottenPassword' className="block mt-4 text-sm text-black font-light">Forgotten your password?</Link> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


