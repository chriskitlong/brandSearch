import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputForm, Button } from '../../components';

export const Input = memo(() => {
  const navigate = useNavigate();

  const initialArrays = [
    {
      id: 0,
      title: "Your Company Name",
      company: "",
      brand: "",
      website: ""
    },
    {
      id: 1,
      title: "Competitor 1 Name",
      company: "",
      brand: "",
      website: ""
    },
    {
      id: 2,
      title: "Competitor 2 Name",
      company: "",
      brand: "",
      website: ""
    }
  ];

  const [arrays, setArrays] = useState(initialArrays);

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;
    const index = e.target.getAttribute('index');
    const updatedArrays = arrays.map((values, i) => {
      if (i === Number(index)) {
        return {...values, [name]:value};
      }
      else {
        return values;
      }
    });
    setArrays(updatedArrays);
  };

  const handleClick = () => {
    navigate('/pending', {state:arrays});
  }

  return (
    <div className='w-full flex flex-col h-[calc(100vh-64px)] bg-slate-50'>
      <div className='text-2xl m-5'>Set-up Companies</div>
      <div className='flex flex-col h-[calc(100vh-300px)]'>
        <div className='m-auto'>
          {arrays.map(values => 
            <InputForm key={values.id} onInputChange={handleInputChange} data={values}></InputForm>
          )}
          <Button text='Submit for Processing' onSubmit={handleClick} isLoaded={true}></Button>
        </div>
      </div>
    </div>
  )
})

export default Input;
