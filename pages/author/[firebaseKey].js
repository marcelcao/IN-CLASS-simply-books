/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAuthorDetails = () => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  };

  useEffect(() => {
    getAuthorDetails();
  }, [firebaseKey]);

  console.warn(authorDetails);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        {/* <div className="d-flex flex-column">
          <img src={authorDetails.image} alt={authorDetails.last_name} style={{ width: '300px' }} />
        </div> */}
        <div className="text-white ms-5 details">
          <h2>
            {authorDetails.first_name} {authorDetails.last_name}
          </h2>
          <h6>{authorDetails.favorite ? <span className="badge text-bg-warning">Favorite</span> : ''}
          </h6>
          Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        </div>
        <div className="d-flex flex-wrap">
          {authorDetails.books?.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthorDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
