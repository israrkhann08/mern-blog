import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {

  const [formData, setFormData] = useState({})

  const [errorMessage, setErrorMessage] = useState(null); //step:5
  const [loading, setLodaing] = useState(false);
  const navigate = useNavigate();  // step:9 
  
  const handleChange = (e) => {         // step:1
    setFormData({...formData, [e.target.id]: e.target.value.trim() })     //step:2 spread operator to keep prevdata
    
  }

  const handleSubmit = async (e) => {  // step: 3
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){ //step:5
      return setErrorMessage('Please fill out all fields.')
    }

    try {                              // step:4 go to viteConfi for set proxy url 
      setLodaing(true);               // step:7
      setErrorMessage(null);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),               
      });                              // we get response   
      const data = await res.json()   // we need to converted into data
      if(data.success === false){                              // step:6 dublicate user error
        return setErrorMessage(data.message)
      }
      setLodaing(false); // step:7
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
       setErrorMessage(error.message);
       setLodaing(false); step:7
    }
  }
  

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Israr's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5 pr-4'>
           Lorem ipsum dolor sit amet consectetur adipisicing In illo dolore corrupti laboriosam voluptatum placeat maiores qu
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput type='text' placeholder='Username' id='username'  onChange={handleChange} />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput type='email' placeholder='israr@company.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                 {                                 //step: 8 loading effect
                  loading ? (
                    <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                    </>
                  ) : 'Sign Up'
                 }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {                                                   // step:5
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
