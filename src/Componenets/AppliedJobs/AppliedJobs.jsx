import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utilities/localStorage";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";

const AppliedJobs = () => {
  const jobs = useLoaderData();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

    const handleJobsFilter = filter =>{
        if(filter === 'all'){
            setDisplayJobs(appliedJobs)
        }
        else if(filter === 'remote'){
            const remoteJobs = appliedJobs.filter(job=>job.remote_or_onsite==='Remote');
            setDisplayJobs(remoteJobs);
        }
        else if(filter === 'onsite'){
            const onsiteJobs = appliedJobs.filter(job=>job.remote_or_onsite==='Onsite');
            setDisplayJobs(onsiteJobs)
        }
    }

  useEffect(() => {
    const storedJobsIds = getStoredJobApplication();
    if (jobs.length > 0) {
      // const jobsApplied = jobs.filter(job=>filter(job=> storedJobsIds.includes(job.id)))
      const jobsApplied = [];
      for (const id of storedJobsIds) {
        const job = jobs.find((job) => job.id === id);
        if (job) {
          jobsApplied.push(job);
        }
      }
      setAppliedJobs(jobsApplied);
      setDisplayJobs(jobsApplied)
    }

  }, []);
  return (
    <div>
      <h2 className="text-5xl mb-4">Applied Jobs: {appliedJobs.length}</h2>
      <details className="dropdown">
        <summary className="btn btn-outline m-1">Filter</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li onClick={()=>handleJobsFilter('all')}><a>All</a></li>
          <li onClick={()=>handleJobsFilter('remote')}><a>Remote</a></li>
          <li onClick={()=>handleJobsFilter('onsite')}><a>Onsite</a></li>
        </ul>
      </details>
      <ul>
        {displayJobs.map((job) => (
          <li key={job.id}>
            <div className="flex items-center justify-between rounded-lg p-4 border border-purple-500 mt-3">
              <div className="flex">
                <img
                  className="w-48 h-40 rounded-xl"
                  src={job.logo}
                  alt="logo"
                />
                <div className="ml-5">
                  <p className="text-2xl font-medium">{job.job_title}</p>
                  <p className="text-lg"> {job.company_name}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <button className="px-5 py-2 font-bold text-[#9963df] border rounded border-[#7e90fe] mr-4">
                        {job.remote_or_onsite}
                      </button>
                      <button className="px-5 py-2 font-bold text-[#9963df] border rounded border-[#7e90fe] mr-4">
                        {job.job_type}
                      </button>
                      <div className="flex m-3">
                        <h2 className="flex mr-4">
                          <MdOutlineLocationOn className="text-2xl mr-2" />
                          {job.location}
                        </h2>
                        <h2 className="flex">
                          <AiOutlineDollarCircle className="text-2xl" />
                          {job.salary}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary">View Details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;
