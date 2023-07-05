import React, { useState } from 'react';




type CommentRatingProps = {
  onSubmit: (Comment) => void;
  idHotel: string;
  idUser: string;
};

const CommentPost: React.FC<CommentRatingProps> = ({ onSubmit, idHotel, idUser }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    
    setComment(event.target.value);
  };

  const handleRatingChange = (value: number) => {
    console.log(value);
    
    setRating(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment: Comment = {
      rating: rating,
      comment: comment,
      userId: idUser,
      hotelId: idHotel
    };
    onSubmit(newComment);
    setComment('');
    setRating(0);
  };

  return (
    <div>
      <form className='' onSubmit={handleSubmit}>
        <div className='flex justify-center'>
         
          <textarea
            className='border-2 p-1 h-20 align-text-top text-left rounded-lg w-11/12'
            type="textarea"
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder='Tell us your opinion'
          />
        </div>
        <div className="flex items-center my-2 ml-5">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className="flex items-center">
            <input
              type="radio"
              name="rating"
              value={value}
              checked={rating === value}
              onClick={() =>{ handleRatingChange(value)}}
              className="hidden"
            />
            <svg
              className={`h-6 w-6 fill-current ${
                value <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon
                points="12 2 15.09 8.5 22 9 17 14 18.18 21.5 12 17 5.82 21.5 7 14 2 9 8.91 8.5 12 2"
              />
            </svg>
          </label>
        ))}
      </div>
        <div className=' w-full flex justify-center'>
        <button className='border border-neutral-400 mt-2 mb-5 px-8 py-2 rounded-full bg-iconsPurple text-white' type="submit">Submit</button>
        </div>     
      </form>
    </div>
  );
};

export default CommentPost;