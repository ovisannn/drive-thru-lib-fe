"use client"
import { useState, useEffect } from 'react';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import Head from 'next/head';
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import axios from 'axios';


export default function Page ({ params }) {

  const tickID = params.ticket;
  const [ticket, setTicket] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchTicket();
  }, [tickID]);


  const fetchTicket = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/loan/ticket/${tickID}`);
      setTicket(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
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
        <title>Loan Ticket</title>
      </Head>
      <Header />
      <main className='flex flex-row justify-center '>
        <div className='flex flex-col gap-4 w-2/4 justify-center container  p-10 m-6 rounded-lg shadow-md bg-white'>
          <div className='flex flex-col items-start'>
            <h2 className='text-black text-2xl font-semibold'>Loan Ticket</h2>
            <br />
            <p className='text-black'>ISBN: {ticket.isbn}</p>
            <p className='text-black'>Copy ID: {ticket.copyID}</p>
          </div>
          <hr />
          <div className='mt-4 p-3 overflow-y-scroll overflow-auto h-96'>
            <h3 className='text-black text-lg  font-semibold'>Borrower Information:</h3>
            <p className='text-black font-bold'>Username: {ticket.username}</p>
            <br />
            <h3 className='text-black text-lg  font-semibold'>Loan Details:</h3>
            <p className='text-black font-bold'>Status: {ticket.status}</p>
            <p className='text-black font-bold'>Start Date: {simplifiedDate(ticket.startDate)}</p>
            <p className='text-black font-bold'>Due Date: {simplifiedDate(ticket.dueDate)}</p>
          </div>
          <div className="flex flex-row pt-5 text-black">
            <div className="flex justify-center p-5">
              <CalendarDaysIcon className='size-7  text-black'/>
              {`Loan Duration: ${Math.ceil(Math.abs(new Date(ticket.dueDate) - new Date(ticket.startDate)) / (1000 * 3600 * 24))} days`}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
