import { memo } from 'react';

export const ResultTable = memo(({data}) => {
  const title = data.title + " - " + data.company + ": Brands:";
  let brandLists = data.brandLists;
  brandLists.sort((a, b) => (a.count < b.count)? 1 : (a.count === b.count) ? 1 : -1);
  return (
    <div className='mb-10 flex flex-col'>
      <div className='text-xl m-2'>{title}</div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className='bg-white border-b'>
            <th scope="col" className="px-6 py-3">
              Brand Found
            </th>
            <th scope="col" className="px-6 py-3">
              # of times found
            </th>
            <th scope="col" className="px-6 py-3">
              Confidence
            </th>
          </tr>
        </thead>
        <tbody>
          {brandLists.map((brand, index) => 
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                  {brand.term}
              </th>
              <td className="px-6 py-4">
                  {brand.count}
              </td>
              <td className="px-6 py-4">
                  {index===0?'Primary':'Sub-Brand'}
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
})

export default ResultTable;
