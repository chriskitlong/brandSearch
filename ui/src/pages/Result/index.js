import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { ResultTable } from '../../components';

export const Result = memo(() => {
	const location = useLocation();
	console.log('data', location.state);
	const results = location.state;

  return (
		<div className='w-full flex flex-col bg-slate-50'>
			<div className='text-2xl mt-5 ml-5'>Results</div>
			<div className='flex flex-col'>
				<div className='m-auto'>
					<div className='flex justify-center flex-col'>
						{results.map((result, i) => 
							<ResultTable key={i} data={result}></ResultTable>
						)}
					</div>

				</div>
			</div>
		</div>
  )
})

export default Result;
