import React from 'react';
import {useQuery,} from 'react-query';
import Person from '../components/Person'

const fetchPeople = async () => {
    const res = await fetch('http://swapi.dev/api/people/');
    return res.json();
}

const People = () =>{
    const {data, status} = useQuery('people', fetchPeople );
     console.log(data)
    return (
        <div>
            <h2>People</h2> 
            {status === 'loading' && (
                <div>Loading Data </div>
            )}
            {status === 'error' && (
                <div>Error Fetching Data </div>
            )}

            {status === 'success' && (
                <div>
                    {data.results.map(person => <Person key ={person.name} person ={person} />)}
                </div>
            )}  
            </div>
    )
}

export default People