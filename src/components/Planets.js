import React, {useState} from 'react';
import {useQuery} from 'react-query';
import Planet from '../components/Planet'

//https://www.sitepoint.com/react-query-fetch-manage-data/
  const fetchPlanets = async ({ queryKey }) => {
    const [_key, { page }] = queryKey;
    const response = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    return response.json();
  };

const Planets = () =>{
    const [page, setPage] = useState(1)
     const { data, status } = useQuery(['planets', { page },{
        keepPreviousData: true,
      }], fetchPlanets);
   
    return (
        <div>
            <h2>Planets</h2> 

            {/* <button onClick ={()=> setPage(1)}>Page 1</button>
            <button onClick ={()=> setPage(2)}>Page 2</button>
            <button onClick ={()=> setPage(3)}>Page 3</button>
            <button onClick ={()=> setPage(4)}>Page 4</button> */}



            {status === 'loading' && (
                <div>Loading Data </div>
            )}
            {status === 'error' && (
                <div>Error Fetching Data </div>
            )}

            {status === 'success' && (
                <>
           <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= data.count / data.results.length}
          >
            Next page
          </button>
                <div>
                    {data.results.map(planet => <Planet key ={planet.name} planet ={planet} />)}
                </div>
                </>
            )}  
            </div>
    )
}

export default Planets