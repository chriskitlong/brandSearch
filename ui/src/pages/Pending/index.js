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

  const apiUrl = "https://api.apify.com/v2/acts/baa1~ingredion/run-sync-get-dataset-items?token=apify_api_RAQ3OtcSEPg2FdR0dLg6onHzTreXDY3KTfO1"

  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  const fetchData = async () => {
    try {
      let responses = await Promise.all(arrays.map(arr => {
        if(arr.website) {
          // if(isValidUrl(arr.website))
          if(!arr.website.includes('https://'))
            arr.website = "https://" + arr.website;
          return axios.post(apiUrl, {startUrls: [{url: arr.website}]});
        }
        else
          return 0;
      }
      ));
      responses.forEach(response => {
        if(response) {
          response.data = response.data.sort((a, b) => (a.count < b.count)? 1 : (a.count === b.count) ? 1 : -1);
          return response
        }
      });
      console.log("before processing", responses)
      await Promise.all(responses.map(response => {
        const resultArray = [];
        const regex = /[?????]/g;
        response.data?.map(item => {
          item.term = item.term.toUpperCase();
          item.term = item.term.replaceAll(' ', '');
          return item;
        })
        response.data?.map(item => {
          if(resultArray.find(object => {
            if(object.term.replace(regex, '') === item.term.replace(regex, '')){
              object.count +=item.count;
              return true;
            }
            else return false;
          })) {} else {
            resultArray.push(item);
          }
        })
        console.log("resultArrray", resultArray)
        if(response.data)
          response.data = resultArray;
        return response;
      }))
      console.log("after processing",responses)
      if(responses[0])
        results.push({title: arrays[0].title, company: arrays[0].company, brand: arrays[0].brand, brandLists: responses[0].data});
      if(responses[1])
        results.push({title: arrays[1].title, company: arrays[1].company, brand: arrays[1].brand, brandLists: responses[1].data});
      if(responses[2])
        results.push({title: arrays[2].title, company: arrays[2].company, brand: arrays[2].brand, brandLists: responses[2].data});
    } catch(err) {
      console.log(err)
    }
    console.log('results',results);

    await axios.post(API_URL, results)
    setIsLoaded(true);

    // const response = await axios.post(API_URL, arrays);
    // setIsLoaded(true);
    // setResults(response.data);
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
