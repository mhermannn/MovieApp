// import React, { useState, useEffect } from 'react';
// import SearchRenderMovie from '../renderComponents/SearchedMovieRender'; 
// import RenderMovie4 from '../renderComponents/MyMovieRender';
// import '../stylowanie/SearchBar.css';
// import Pagination from '../renderComponents/Pagination'; 

// const SearchMovie = () => {
//   const [searchText, setSearchText] = useState('');
//   const [selectedList1, setSelectedList1] = useState('default');
//   const [selectedList2, setSelectedList2] = useState('nosort');
//   const [showSearch, setShowSearch] = useState([]);
//   const [selectedTrailer, setSelectedTrailer] = useState(null);
//   const [selectedGallery, setSelectedGallery] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage, setPostsPerPage] = useState(9);
//   const [totalResults, setTotalResults] = useState(0);
//   const [showPagination, setShowPagination] = useState(false);
//   const [showResults, setShowResults] = useState(false);

//   const handleInputChange = (e) => {
//     setSearchText(e.target.value);
//     setCurrentPage(1);
//     if (e.target.value === '') {
//       setShowResults(false);
//     }
//   };

//   const handleShowTrailer = (movieId) => {
//     setSelectedTrailer((prevSelectedTrailer) => (prevSelectedTrailer === movieId ? null : movieId));
//   };

//   const handleShowGallery = async (movieId) => {
//     setSelectedGallery((prevSelectedGallery) => (prevSelectedGallery === movieId ? null : movieId));
//   };

//   const fetchSearchResults = async (page = 1) => {
//     try {
//       let apiUrl = `/movies/searchPaged/${searchText}?page=${page}&limit=${postsPerPage}`;
//       let countUrl = `/movies/countPaged/${searchText}`;

//       if (selectedList1 === 'gatunek') {
//         apiUrl = `/genres/searchPaged/${searchText}?page=${page}&limit=${postsPerPage}`;
//         countUrl = `/genres/countPaged/${searchText}`;
//       }
//       if (selectedList2 === 'yearnew') {
//         apiUrl += '&sort=new';
//       } else if (selectedList2 === 'yearold') {
//         apiUrl += '&sort=old';
//       }

//       const [searchResponse, countResponse] = await Promise.all([
//         fetch(apiUrl),
//         fetch(countUrl)
//       ]);

//       if (!searchResponse.ok || !countResponse.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const searchData = await searchResponse.json();
//       const countData = await countResponse.json();

//       setShowSearch(searchData.results);
//       setTotalResults(countData.total); 
//       if (countData.total > postsPerPage) {
//         setShowPagination(true);
//       } else { setShowPagination(false); }
//       setCurrentPage(page);
//       setShowResults(true); 
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (searchText.trim() !== '') {
//       fetchSearchResults(1);
//     } else {
//       setShowResults(false); 
//     }
//   };

//   useEffect(() => {
//     if (searchText.trim() !== '') {
//       fetchSearchResults(currentPage);
//     }
//   }, [currentPage, postsPerPage, searchText, selectedList1, selectedList2]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="search">
//       <div className="szukamy">
//         <form onSubmit={handleFormSubmit}>
//           <input
//             type="text"
//             placeholder="What are you looking for?"
//             value={searchText}
//             onChange={handleInputChange}
//           />
//           <div>
//             <select name="lista1" value={selectedList1} onChange={(e) => setSelectedList1(e.target.value)}>
//               <option value="default">słowo kluczowe</option>
//               <option value="gatunek">gatunek</option>
//             </select>
//             <select name="lista2" value={selectedList2} onChange={(e) => setSelectedList2(e.target.value)}>
//               <option value="nosort">brak sortowania</option>
//               <option value="yearnew">rok (od najnowszego)</option>
//               <option value="yearold">rok (od najstarszego)</option>
//             </select>
//             <button type="submit">Search</button>
//           </div>
//         </form>
//       </div>
//       {showResults && (
//         <div className="znajdujemy">
//           <ul>
//             {showSearch?.map((movie) =>
//               movie.isMine ? (
//                 <RenderMovie4 key={movie.id} movie={movie} />
//               ) : (
//                 <SearchRenderMovie
//                   key={movie.id}
//                   movie={movie}
//                   selectedTrailer={selectedTrailer}
//                   selectedGallery={selectedGallery}
//                   handleShowGallery={handleShowGallery}
//                   handleShowTrailer={handleShowTrailer}
//                 />
//               )
//             )}
//           </ul>
//         </div>
//       )}
//       {showResults && showPagination && (
//         <Pagination
//           totalPosts={totalResults}
//           postsPerPage={postsPerPage}
//           currentPage={currentPage}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// };

// export default SearchMovie;



import React, { useState, useEffect } from 'react';
import SearchRenderMovie from '../renderComponents/SearchedMovieRender'; 
import RenderMovie4 from '../renderComponents/MyMovieRender';
import '../stylowanie/SearchBar.css';
import Pagination from '../renderComponents/Pagination'; 

const SearchMovie = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedList1, setSelectedList1] = useState('default');
  const [selectedList2, setSelectedList2] = useState('nosort');
  const [showSearch, setShowSearch] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [totalResults, setTotalResults] = useState(0);
  const [showPagination, setShowPagination] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
    if (e.target.value === '') {
      setShowSearch([]);
      setTotalResults(0);
      setShowPagination(false);
      setShowResults(false);
    }
  };

  const handleShowTrailer = (movieId) => {
    setSelectedTrailer((prevSelectedTrailer) => (prevSelectedTrailer === movieId ? null : movieId));
  };

  const handleShowGallery = async (movieId) => {
    setSelectedGallery((prevSelectedGallery) => (prevSelectedGallery === movieId ? null : movieId));
  };

  const fetchSearchResults = async (page = 1) => {
    try {
      let apiUrl = `/movies/searchPaged/${searchText}?page=${page}&limit=${postsPerPage}`;
      let countUrl = `/movies/countPaged/${searchText}`;

      if (selectedList1 === 'gatunek') {
        apiUrl = `/genres/searchPaged/${searchText}?page=${page}&limit=${postsPerPage}`;
        countUrl = `/genres/countPaged/${searchText}`;
      }
      if (selectedList2 === 'yearnew') {
        apiUrl += '&sort=new';
      } else if (selectedList2 === 'yearold') {
        apiUrl += '&sort=old';
      }

      const [searchResponse, countResponse] = await Promise.all([
        fetch(apiUrl),
        fetch(countUrl)
      ]);

      if (!searchResponse.ok || !countResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const searchData = await searchResponse.json();
      const countData = await countResponse.json();

      setShowSearch(searchData.results);
      setTotalResults(countData.total); 
      setShowPagination(countData.total > postsPerPage);
      setCurrentPage(page);
      setShowResults(true); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      fetchSearchResults(1);
    } else {
      setShowSearch([]);
      setTotalResults(0);
      setShowPagination(false);
      setShowResults(false);
    }
  };

  useEffect(() => {
    if (searchText.trim() !== '') {
      fetchSearchResults(currentPage);
    }
  }, [currentPage, postsPerPage, searchText, selectedList1, selectedList2]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="search">
      <div className="szukamy">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchText}
            onChange={handleInputChange}
          />
          <div>
            <select name="lista1" value={selectedList1} onChange={(e) => setSelectedList1(e.target.value)}>
              <option value="default">słowo kluczowe</option>
              <option value="gatunek">gatunek</option>
            </select>
            <select name="lista2" value={selectedList2} onChange={(e) => setSelectedList2(e.target.value)}>
              <option value="nosort">brak sortowania</option>
              <option value="yearnew">rok (od najnowszego)</option>
              <option value="yearold">rok (od najstarszego)</option>
            </select>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
      {showResults && (
        <div className="znajdujemy">
          <ul>
            {showSearch?.map((movie) =>
              movie.isMine ? (
                <RenderMovie4 key={movie.id} movie={movie} />
              ) : (
                <SearchRenderMovie
                  key={movie.id}
                  movie={movie}
                  selectedTrailer={selectedTrailer}
                  selectedGallery={selectedGallery}
                  handleShowGallery={handleShowGallery}
                  handleShowTrailer={handleShowTrailer}
                />
              )
            )}
          </ul>
        </div>
      )}
      {showResults && showPagination && (
        <Pagination
          totalPosts={totalResults}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchMovie;
