"use client";

import { useState, useEffect } from 'react';
import Header from "../components/header";
import Footer from "../components/footer.jsx";
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default function Books(){
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/books');
            setBooks(response.data.data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='bg-sky-100 min-h-screen'>
            <Header/>
            <main className="container min-h-screen mx-auto p-10 m-6 rounded-lg shadow-md bg-white">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 grid-rows-auto h-[400px]">
                        {books.map((book) => (
                            <Link href={`book/${book.isbn}`} key={book.isbn}>
                                <div key={book.id} className="border p-4 rounded-lg shadow-sm h-96 hover:border-blue-400 hover:border-2 focus:border-blue-400 active:border-blue-400 transition-all duration-300 ease-in-out cursor-pointer">
                                    <img
                                        src={book.thumbnailUrl}
                                        alt={`Cover of the book ${book.title}`}
                                        className="w-full h-64 object-cover mb-2"
                                    />
                                    <h2 className="text-black text-xl font-semibold">{book.title}</h2>
                                    <p className="text-black">{book.authors[0]}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
}