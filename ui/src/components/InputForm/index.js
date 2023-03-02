import { memo } from 'react';

export const InputForm = memo(({onInputChange, data}) => {
  return (
    <div className='flex justify-center'>
      <div className='my-5 flex flex-row max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <div className="mx-1">
          <label htmlFor='company' className='text-lg font-medium text-gray-700'>{data.title}</label>
          <input type='text' index={data.id} onChange={onInputChange} name='company' className='text-2xl rounded-md border border-gray-300 shadow-sm focus:outline-blue-400'></input>
        </div>
        <div className="mx-1">
          <label htmlFor='brand' className='text-lg font-medium text-gray-700'>Core Brand Name</label>
          <input type='text' index={data.id} onChange={onInputChange} name='brand' className='text-2xl rounded-md border border-gray-300 shadow-sm focus:outline-blue-400'></input>
        </div>
        <div className="mx-1">
          <label htmlFor='website' className='text-lg font-medium text-gray-700'>Website</label>
          <input type='text' index={data.id} onChange={onInputChange} name='website' className='text-2xl rounded-md border border-gray-300 shadow-sm focus:outline-blue-400'></input>
        </div>
      </div>
    </div>
  )
})

export default InputForm;