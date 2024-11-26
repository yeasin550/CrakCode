import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import { Link } from 'react-router-dom';

const Register = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { createUser, googleSingIn, updateProfileLogin } =
    useContext(AuthContext);
//  console.log(updateProfileLogin)
    const handleRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
      // console.log(name, photo, email, password);
      
      if (!/(?=.*[A-Z])/.test(password)) {
        setError("Please provide one uppercase letter");
        return;
      }
      if (password.length< 6) {
        setError("Password should be at least 6 characters");
        return;
      }
      setError("")
      createUser(email, password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess("Registration successful");
            form.reset("");
            handleProfile(name, photo)
          })
          .catch((error) => {
            console.log(error);
          });
    }
    const handleProfile = (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL
    }
    updateProfileLogin(profile)
      .then(() => {
      })
      .catch(error => {
        setError(error.message);
      })
  }
  
  const handleGoogleSignIn = () => {
    googleSingIn()
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
      })
      .catch(error => {
      console.log(error)
    })
  }
  // const handleGithubSingIn = () => {
  //   githubSignIn()
  //     .then(result => {
  //       const loggedUser = result.user;
  //       console.log(loggedUser)
  //     })
  //     .catch(error => {
  //     console.log(error)
  //   })
  // }

    return (
      <div className="py-8">
        <form
          onSubmit={handleRegister}
          className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md shadow-gray-600"
        >
          <h2 className="text-4xl font-bold mb-4 text-center">
            Create a new account?
          </h2>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold"
              htmlFor="username"
            >
              Name
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md"
              id="username"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold"
              htmlFor="photo"
            >
              Photo URL
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md"
              id="photo"
              name="photo"
              type="text"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 p-2 w-full rounded-md"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="flex items-center justify-between gap-3">

          <button className="bg-blue-500 hover:bg-blue-600   rounded w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4">
            Register
          </button>
            <button
              onClick={handleGoogleSignIn}
              className="relative flex items-center justify-center w-1/2 gap-2 py-2 px-4  bg-gradient-to-r from-green-500 to-indigo-500 text-white rounded-lg shadow-md transition-all hover:shadow-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500"
            >
              <div className="absolute inset-0 bg-red-500 rounded-lg transform scale-0 transition-transform"></div>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4.06 12.478c0-.763.068-1.504.196-2.218l-3.56-2.893a11.97 11.97 0 0 0 0 8.223l3.56-2.894a6.056 6.056 0 0 1-.196-2.218zm8.583 5.647c-1.765 0-3.353-.608-4.594-1.8L4.06 16.68a8.07 8.07 0 0 0 0-9.36l3.928-3.198c1.24-1.192 2.828-1.8 4.594-1.8 1.766 0 3.354.608 4.594 1.8l3.927 3.198c-1.249 1.206-2.816 1.815-4.585 1.815-.604 0-1.208-.048-1.805-.144l-.478.982c.659.288 1.336.432 2.032.432 1.758 0 3.352-.609 4.585-1.815l3.928 3.198a8.07 8.07 0 0 0 0-9.36l-3.928-3.197c-1.231-1.192-2.819-1.8-4.585-1.8-1.765 0-3.353.608-4.593 1.8L7.292 7.76c.597-.096 1.2-.144 1.804-.144 1.768 0 3.336.609 4.585 1.815l.477.982c-.658.288-1.335.432-2.032.432z"
                />
              </svg>
              <span className="text-white font-sm">Google Sign in</span>
            </button>
          </div>
          {/* <div className=" social-button-container flex gap-2 w-50 mt-3">
            <div onClick={handleGoogleSignIn} className="">
              <img
                className=" social-button"
                src="https://i.ibb.co/gSTHXZJ/google-btn.png"
                alt=""
              />
            </div>
            <div onClick={handleGithubSingIn} className="">
              <img
                className=" social-button"
                src="https://i.ibb.co/g9f4P0S/github-btn.png"
                alt=""
              />
            </div>
          </div> */}
          <p className='mt-3'>
            Already Have An Account ?
            <Link className="text-[#4F46E5] font-bold" to="/login">
              Login
            </Link>
          </p>
          <p className="text-red-700">{error}</p>
          <p className="text-green-700">{success}</p>
        </form>
      </div>
    );
};

export default Register;