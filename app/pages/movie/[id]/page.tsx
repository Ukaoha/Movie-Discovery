// Import necessary modules and components
'use client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TMDB_API_BASE_URL, TMDB_API_KEY } from '@/Config/config';
import { FaArrowRight, FaHome, FaSignOutAlt, FaStar, FaTv } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import Footer from '@/Components/Footer';
import { CircleLoader } from 'react-spinners';
import Link from 'next/link';


interface MovieDetail {
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number ;
  credits: {
    cast: {
      id: number;
      name: string;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
    }[];
  };
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      type: string;
    }[];
  };
  genres: {
    id: number;
    name: string;
  }[];
  popularity: number;
}




function MovieDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function convertToUTC(localDateStr : any) {
    const localDate = new Date(localDateStr);
    const utcDate = new Date(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate());
    return utcDate.toISOString().split('T')[0];
  }
  

  useEffect(() => {
    if (id) {
      fetch(`${TMDB_API_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos`)

        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch movie details.');
          }
          return response.json();
        })
        .then((data) => {
          // Set the movie detail data in the state
          console.log(data)
          setMovieDetail(data);
          setLoading(false); // Loading is complete
        })
        .catch((error) => {
          setError('An error occurred while fetching movie data.');
          setLoading(false); // Loading is complete with an error
        });
    }
  }, [id]);

  if (loading) {
    // Loading state
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>

    <CircleLoader color='#B91C1C' loading={loading} size={50} />
    </div>

  }

  if (error) {
    // Error state
    return <div>Error: {error}</div>;
  }

  if (!movieDetail) {
    return <div>No movie details found.</div>;
  }
  const trailerKey = movieDetail?.videos?.results.find((video) => video.type === 'Trailer')?.key;

  let videoUrl ;
  if (trailerKey) {
     videoUrl = `https://www.youtube.com/embed/${trailerKey}`;
    }
  
  return (
    <>
     <div className="flex h-screen">

          <div className="hidden lg:block lg:w-1/4 p-6 bg-white text-#666 rounded-tr-2xl rounded-br-2xl rounded-tl-none rounded-bl-none border border-solid border-black border-opacity-30 transition-all duration-300">

          <div className="flex items-center  mb-14">
            <img src="/tv.png" alt="Movie Box" className="w-8 h-8 mr-6" />
            <span className="text-sm font-bold">Movie Box</span>
          </div>
          <div className="mb-12">
            <Link href={'/'}>            <div className="flex items-center">
              <FaHome className="w-4 h-4 mr-6 text-[#666]" />
              <span className="text-sm text-[#666]">Home</span>
            </div>
            </Link>

            <div className="flex items-center mt-12 text-[#666]">
              <FaTv className="w-4 h-4 mr-6" />
              <span className="text-sm">TV Series</span>
            </div>
            <div className="flex items-center mt-12 text-[#666]">
              <FaArrowRight className="w-4 h-4 mr-6" />
              <span className="text-sm">Upcoming</span>
            </div>
          </div>
          <div className="bg-white text-[#666] w-32 p-4 rounded-lg border border-solid border-red-500 border-opacity-70">

            <span className="text-sm">Play movie quizzes and earn free tickets</span>
            <p className="text-xs mt-2">50k people are playing now</p>
            <button className="bg-[#BE123C] text-white text-sm mt-2 px-4 py-2 rounded-lg">
              Start Playing
            </button>
          </div>
          <div className="mt-12">
            <div className="flex items-center text-[#666]">
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              <span className="text-sm">Log Out</span>
            </div>
          </div>
        </div>

      <div className="flex-grow p-4">


        <div>
      <iframe
      className='w-full rounded-lg'
        height="315"
        src={videoUrl}
        title="Movie Trailer"
        frameBorder="8"
        allowFullScreen
      ></iframe>
    </div>
    <div className="flex justify-between">
    <div  > 
    <div className='flex space-x-4 mt-6'>
              <h1 data-testid="movie-title">{movieDetail.title}</h1>
        <p data-testid="movie-release-date">{convertToUTC(movieDetail.release_date)}</p>


        <p data-testid="movie-runtime">{movieDetail.runtime} </p>
        <p className='text-[#B91C1C] font-extrabold'> {movieDetail?.genres?.map((genre) => genre.name).join(', ')}</p>
        </div>
        <div className='w-50 mt-6'>

      <p data-testid="movie-overview">{movieDetail.overview}</p>
      </div>


<div>
  <div className="flex mt-6 ">
    <h2 className='mr-4'>Directors:  </h2>
    {movieDetail?.credits?.crew
      .filter((person) => person.job === 'Director')
      .map((director, index, array) => (
        <div  className='text-[#B91C1C]'   key={director.id}>
           {director.name}
          {index < array.length - 1 && <span className="ml-2 mr-2">, </span>}
        </div>
      ))}
  </div>
</div>


<div className="flex mt-6">
  <h2  className='mr-4'>Writers:</h2>
  
    {movieDetail?.credits?.crew
      .filter((person) => person.department === 'Writing')
      .map((writer , index,array) => (
        <div  className='text-[#B91C1C]' key={writer.id}>
        {writer.name}
       {index < array.length - 1 && <span className="ml-2 mr-2">, </span>}
     </div>

      ))}
  
</div>

<div className="flex mt-6">
  <h2 className='mr-4'> Stars:</h2>
  
    {movieDetail?.credits?.cast.slice(0, 5).map((star , index , array) => (
              <div  className='text-[#B91C1C]'  key={star.id}>
              {star.name}
             {index < array.length - 1 && <span className="ml-2 mr-2">, </span>}
           </div>
   
    ))}
</div>


<button className="bg-[#BE123C] text-white mt-4 px-4 py-2 rounded-lg">
              Top rated {movieDetail?.popularity}
            </button>




      </div>

        <div className='block mr-12'>
          <div >
        <p className='flex items-center mt-6 mr-10'>
  <FaStar className='text-yellow-400 w-4 h-4 mr-2' /> {movieDetail?.vote_average}
</p>
</div>
<div>
<button className="bg-[#BE123C] text-white mt-4 px-4 py-2 text-center rounded-lg">
              Top rated Show times 
            </button>

</div>
<div>
<button className=" text-[#000] mt-4 px-4 py-2 text-center  rounded-lg border border-solid border-red-500 border-opacity-70 bg-[rgba(190,18,60,0.10)]">

              Watch more options 
            </button>

</div>

<div>
  <img className='mt-10' src='/movie.png' />
</div>

</div>
</div>
</div>








</div> 




<div className='sm:mt-20'>
    <Footer/>
    </div>

</>




  );
}

export default MovieDetail;
