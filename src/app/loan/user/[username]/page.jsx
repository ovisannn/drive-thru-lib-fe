"use client"
import { useState, useEffect } from 'react';
import Header from '../../../components/header.jsx';
import Footer from '../../../components/footer.jsx';
import Head from 'next/head';
import axios from 'axios';

export default function UserLoansPage ({ params }) {

  const userID = params.username;
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLoans();
  }, [userID]);

  const fetchLoans = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/loan/tickets/${userID}`);
      // console.log(response.data)
      setLoans(response.data.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simplifiedDate = (dateStr) => {
    const date = new Date(dateStr);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    const simplifiedDate = `${year}-${month}-${day}`;
    return simplifiedDate;
  };
  return (
    <div className='bg-sky-100 min-h-screen'>
      <Head>
        <title>User Loans</title>
      </Head>
      <Header />
      <main className='flex flex-row justify-center '>
        <div className='flex flex-col gap-4 w-2/4 justify-center container  p-10 m-6 rounded-lg shadow-md bg-white'>
          <div className='flex flex-col items-start'>
            <h2 className='text-black text-2xl font-semibold'>User Loans</h2>
            <br />
            <p className='text-black'>User ID: {userID}</p>
          </div>
          <hr />
          {isLoading ? (
            <div className='flex justify-center items-center h-96'>
              <p className='text-black text-lg'>Loading...</p>
            </div>
          ) : (
            <div className='mt-4 p-3 overflow-y-scroll overflow-auto h-96'>
              {loans.length === 0 ? (
                <p className='text-black text-lg'>No loans found for this user.</p>
              ) : (
                <ul>
                  {loans.map((loan) => (
                    <li key={loan.id} className='border-b border-gray-200 p-2'>
                      <div className='flex flex-col'>
                        <p className='text-black font-bold'>Ticket ID: {loan._id}</p>
                        <p className='text-black font-bold'>ISBN: {loan.isbn}</p>
                        <p className='text-black font-bold'>Copy ID: {loan.copyID}</p>
                        <p className='text-black font-bold'>Status: {loan.status}</p>
                        <p className='text-black font-bold'>Start Date: {simplifiedDate(loan.startDate)}</p>
                        <p className='text-black font-bold'>Due Date: {simplifiedDate(loan.dueDate)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};