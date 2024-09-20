// import React, { useState } from "react";
// import { ThemeProvider } from "@emotion/react";
// import theme from "./theme/theme";
// import Nav from "./components/Header";
// import Searchbar from "./components/searchbar";
// import { Grid } from "@mui/material";
// import JobCard from "./components/JobCard";
// import NewJobModal from "./components/JobCard/NewJobModal";
// import jobData from './dummyData'

// // eslint-disable-next-line import/no-anonymous-default-export
// export default function App() {
//   // const [jobs, setJobs] = useState([]);
//   // const fetchJob = async () => { 
//   //   const req = await firest
//   // }
//   return (
//     <ThemeProvider theme={theme}>
//       <Nav />
//       <NewJobModal />
//       <Grid container justifyContent="center">
//         <Grid item xs={10}>
//           <Searchbar />
//           {jobData.map((job) => (
//             <JobCard key={job.id} {...job} />
//           ))}
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }



import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import Nav from "./components/Header";
import Searchbar from "./components/searchbar";
import { Box, CircularProgress, Grid } from "@mui/material";
import JobCard from "./components/JobCard";
import NewJobModal from "./components/JobCard/NewJobModal";
import { firestore, collection, getDocs, addDoc, serverTimestamp, where, query } from "./firebase/config";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);

  const fetchJobs = async (filters = {}) => {
    const jobsCollection = collection(firestore, 'jobs');
    let jobsQuery = jobsCollection;

    // بحث
    if (filters.location || filters.type) {
      jobsQuery = query(jobsCollection, ...Object.entries(filters).map(([key, value]) => where(key, '==', value)));
    }

    // ترتيب
    const querySnapshot = await getDocs(jobsQuery);
    const tempJobs = querySnapshot.docs.map(job => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate() }));
    setJobs(tempJobs.sort((a, b) => b.postedOn - a.postedOn)); // تنازلي 
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    try {
      await addDoc(collection(firestore, 'jobs'), {
        ...jobDetails,
        postedOn: serverTimestamp(), // تعطي الوقت الحالي 
      });
      await fetchJobs(); // عشان تضيف واحنا بنشوف من غير ما نعمل ريفرش
    } catch (error) {
      console.error("Error posting job: ", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Nav openNewModal={() => setNewJobModal(true)} />
      <NewJobModal postJob={postJob} newJobModal={newJobModal} closeModal={() => setNewJobModal(false)} />
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Searchbar fetchJobSearch={(filters) => fetchJobs(filters)} />
          {Loading ? (
            <Box display="flex" justifyContent="center"><CircularProgress /></Box>
          ) : (
            jobs.map((job) => <JobCard key={job.id} {...job} />)
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
