import Image from "next/image";
import Link from 'next/link';
import Header from "./components/header.jsx";
// import { Image } from "next/image";
import hdImg from './image/2.svg'
import hdImg2 from './image/3.svg'
import { CheckIcon } from '@heroicons/react/24/outline'
import Footer from "./components/footer.jsx";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="h-full w-full bg-white flex flex-col">
        <div className="flex flex-row bg-sky-100 pb-32 rounded-br-full">
          <div className="flex flex-col justify-left text-left w-2/3 text-black pt-32 pl-32 pr-32 pb-0">
          <p className="text-5xl pb-10 font-semibold">
            Experience the Future of <br/> Borrowing:  <a className="text-green-500">Quick</a>, <a className="text-orange-400">Convinient</a>, <a className="text-blue-500">Drive-Thru <br/>Library Service!</a>
          </p>
          <p className="text-xl font-medium">
            Experience the future of borrowing with our Drive-Thru Library! Quick, convenient <br/>access to books and more, all from your car. No waits, just seamless service. <br/>Enjoy hassle-free library visits today! <br/><br/><br/>
          </p>
            <div className="w-1/6">
            <a href="/books">            
                    <div className=' text-center text-white font-semibold text-lg p-4 bg-blue-500 hover:bg-blue-600 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out'>
                        Get Started
                    </div>
              </a>
            </div>
          </div>
        <div className="pt-32 pr-32 w-1/3">
          <Image
            src={hdImg}
            alt="drive-thru-lib"
            width={600}
            height={600}
          />
        </div>
        </div>
        <div className="p-32 flex flex-row">
          <div className="pt-10 pl-20 w-1/2">
            <Image
              src={hdImg2}
              alt="drive-thru-lib"
              width={400}
              height={400}
            />
          </div>
          <div className="w-1/2 text-black pl-32">
            <p className="font-bold text-5xl pb-5">
            We Provide Many <br/>Features You Can Use
            </p>
            <p className="font-medium text-xl">
            You can explore the features that we provide with fun <br/>and have their own functions each feature.
            </p>
            <p className="flex pt-5 hover:text-lg transition-all duration-300 ease-in-out">
            <CheckIcon className="size-6 text-green-500 "/> <p className="font-medium">Access a wide selection of books, movies, and more without leaving your car, perfect for busy schedules.</p>
            </p>
            <p className="flex pt-5 hover:text-lg transition-all duration-300 ease-in-out">
            <CheckIcon className="size-6 text-green-500"/> <p className="font-medium">Enjoy seamless service with no need to wait in line, making your library visits faster and more efficient.</p>
            </p>
            <p className="flex pt-5 hover:text-lg transition-all duration-300 ease-in-out">
            <CheckIcon className="size-6 text-green-500"/> <p className="font-medium">Return items effortlessly through our drive-thru, saving you time and hassle.</p>
            </p>
            <p className="flex pt-5 hover:text-lg transition-all duration-300 ease-in-out">
            <CheckIcon className="size-6 text-green-500"/> <p className="font-medium">Ensure your safety and peace of mind with a fully contactless borrowing and returning experience.</p>
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}