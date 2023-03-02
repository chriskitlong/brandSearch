import { memo, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../../components';

export const Pending = memo(() => {
  const dataFetchedRef = useRef(false);

  const navigate = useNavigate();

  // const apiURI = process.env.REACT_APP_API_URL;

  const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://baabrandsearch1.herokuapp.com/api/brands"
    : "http://localhost:80/api/brands";
  // const API_URL = process.env.REACT_APP_API_URL;
  console.log("api-url", API_URL)
  const location = useLocation();
  const arrays = location.state;
  console.log('arrays', arrays);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    const response = await axios.post(API_URL, arrays);
    setIsLoaded(true);
    setResults(response.data);
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);
  
  const handleClick = () => {
    navigate('/result', {state:results});
  }
  return (
    <div className='w-full flex flex-col h-[calc(100vh-64px)] bg-slate-50'>
      <div className='text-2xl m-5'>Set-up Companies: Confirmation</div>
      <div className='flex flex-col h-[calc(100vh-300px)]'>
        <div className='m-auto'>
          <div className='flex justify-center'>
            {isLoaded?
            <Button text='Search Complete - Next Step' isLoaded={isLoaded} onSubmit={handleClick}></Button>
            :
            <div>
              <div className='text-xl mx-10'>
                Companies submitted. We are now searching for brands on the company websites you have entered.
                This may take up to five minutes.
              </div>
              <Button text='Currently Searching..' isLoaded={isLoaded} onSubmit={handleClick}></Button>
            </div>
            }
          </div>
          
        </div>
      </div>
    </div>
  )
})

export default Pending;
