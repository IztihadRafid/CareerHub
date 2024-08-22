import { useEffect, useState } from "react";
import Job from "../Job/Job";

const FeaturedJobs = () => {
    const [jobs,setJobs]= useState([]);
    const [dataLength,setDataLength]= useState(4)
    useEffect(()=>{
        fetch('jobs.json')
        .then(res=>res.json())
        .then(data=>setJobs(data))
    },[])
    return (
        <div>
           <div className="text-center">
            <h1 className="text-5xl text-center">Featured Jobs:{jobs.length}</h1>
            <p className='text-center'>Explore thousands of job opportunities with all the information you need. It's your future</p>
           </div>
           <div className="grid md:grid-cols-2 gap-6">
            {
                jobs.slice(0,dataLength).map(job=><Job key={job.id} job={job}></Job>)
            }
           </div>
           <div className={dataLength === jobs.length ?'hidden' : ' flex items-center justify-center m-4'}>
            <button onClick={()=>setDataLength(jobs.length)} className="btn btn-primary ">Show All</button>
           </div>
        </div>
        
    );
};

export default FeaturedJobs;