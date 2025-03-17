import React, {useState,useEffect} from 'react';
import { fetchMorphs } from '../api';

function MorphList(){
    const [morphs, setMorph] = useState([]);
    
    useEffect(()=>{
        fetchMorphs()
          .then(data => {
            console.log("取得したデータ", data);
            setMorph(data)
          })
          .catch(error => console.error("Error fetching morphs:",error));
    },[]);
    console.log("現在のmorph",morphs)

    return(
        <div>
            <h1>Morphs List</h1>
            <ul>
                {morphs.length > 0 ? (
                    morphs.map(morph =>(
                        <li key={morph.id}>{morph.morph_name}</li>
                    ))
                ):(
                    <p>Loading...</p>
                )}
            </ul>
        </div>
    );
}

export default MorphList;