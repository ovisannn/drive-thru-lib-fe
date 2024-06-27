"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import Head from 'next/head';
import axios from 'axios';
import { BookOpenIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';



const SelectDropdown = ({ options, label, name, onChange }) => {
  return (
    <div className="relative inline-block text-left w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        className="block w-full pl-3 pr-10 py-2 text-base border-2 border-sky-400 focus:outline-none focus:ring-indigo-500 focus:border-sky-400 sm:text-sm rounded-md"
      >
        {options.filter(option => option.status === 'IN LIBRARY').map((option, index) => (
          <option key={option.id} value={option.id}>
            pilihan {index+1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Page({ params }) {
  const isbn = params.isbn;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  const fetchBookDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/book/${isbn}`);
      setBook(response.data.data.book);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simplifiedDate = () =>{
    const dateStr = book.publishedDate;
    const date = new Date(dateStr);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    const simplifiedDate = `${year}-${month}-${day}`;
    return simplifiedDate

  }

  const countBook = () => {
    let count = 0
    book.copy.map((b)=>{
      if(b.status === 'IN LIBRARY'){
        count += 1;
      }
    })
    return count
  };


  const [formData, setFormData] = useState({
    selectedOption: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData.selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Cookies.get('token'))
    // create loan ticket
    try {
      const res = await axios.post('http://localhost:3000/loan/ticket/create', {
        "isbn" : isbn,
        "copyID" :formData.selectedOption,
        "token" : Cookies.get('token')
    });
    console.log(res.data.data)
    }catch (err) {
      console.log(err)
    }

  };

  if (isLoading) {
    return (
      <div className='bg-sky-100'>
        <Header />
        <main className='container mx-auto p-10 m-6 rounded-lg shadow-md bg-white'>
          <div className='flex justify-center items-center h-full'>
            <div className='spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className='bg-sky-100'>
        <Header />
        <main className='container mx-auto p-10 m-6 rounded-lg shadow-md bg-white'>
          <div className='flex justify-center items-center h-full text-black'>
            Book not found!!!
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='bg-sky-100 min-h-screen'>
    <Head>
      <title>{book.title}</title>
    </Head>
    <Header />
    <main className='flex flex-row justify-center '>
      <div className='flex flex-row gap-4 w-2/4 justify-center container  p-10 m-6 rounded-lg shadow-md bg-white'>
        <div className='w-1/4'>
          <img
            src={book.thumbnailUrl}
            alt={`Cover of the book ${book.title}`}
            className='w-full h-auto object-cover mb-4'
          />
        </div>
        <div className='w-3/4'>
          <div className='flex flex-col items-start'>
            <h2 className='text-black text-2xl font-semibold'>{book.title}</h2>
            <br />
            <p className='text-black'>by. {book.authors.join(', ')}</p>
            <div className="flex flex-row py-4 gap-2">
              {
                book.categories.map((cat)=>(
                  <div className="bg-blue-500 text-white px-4 py-2 rounded">{cat}</div>
                ))
              }
            </div>
          </div>
          <hr />
          <div className='mt-4 p-3 overflow-y-scroll overflow-auto h-96'>
            <h3 className='text-black text-lg  font-semibold'>Description:</h3>
            <p className='text-black font-bold text-justify'>{book.shortDescription}</p>
            <br />
            <p className='text-black text-justify'>{book.longDescription}</p>
          </div>
            <br />
            <hr />
              <div className="flex flex-row pt-5 text-black">
                <div className="flex justify-center p-5">
                  <BookOpenIcon className='size-7  text-black'/>
                  {book.pageCount} pages
                </div>
                <div className="flex justify-center p-5">
                  <CalendarDaysIcon className='size-7  text-black'/>
                  {simplifiedDate()}
                </div>
              </div>
        </div>
      </div>
      <div className="flex flex-col w-1/4 gap-4 justify-normal container text-black p-10 m-6 rounded-lg shadow-md bg-white h-64">
        <p>Buku yang tetrsedia : {countBook()}</p>
        {/* drop down select copy of the book */}

        <SelectDropdown
          options={book.copy}
          label="Choose a book copy"
          name="selectedOption"
          onChange={handleChange}
        />
        <div className='mt-4'>
            <button className='bg-green-500 text-white px-4 py-2 rounded' onClick={handleSubmit}>Borrow now!</button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
}