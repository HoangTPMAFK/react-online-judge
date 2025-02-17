import { useRef } from "react";
import CKEditorComponent from "../../../components/CKEditorComponent";

function ContestDetail() {
  const searchInput = useRef(null);

  return (
    <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black font-medium pb-6">Contests</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Title</div>
            <input type="text" className="w-60 pl-2 h-8" />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Password</div>
            <input type="text" className="w-60 pl-2 h-8" />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">Start at</div>
            <input type="datetime-local" className="w-60 h-8" />
          </div>
          <div className="flex flex-row justify-between mb-4">
            <div className="text-xl">End at</div>
            <input type="datetime-local" className="w-60 h-8" />
          </div>
        </div>
        <div>
          <div className="text-xl">Problems</div>
          <div className="flex justify-center mb-4">
            <input type="text" ref={searchInput} className="w-80 px-2 py-1" placeholder="Search problem" name="" id="" />
          </div>
          <div className="overflow-x-auto w-[420px] mx-auto h-40 bg-white">
            <ul>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
              <li className="grid grid-cols-3 border rounded-lg mx-2 my-2 px-4 py-2 text-xl">
                <div className="col-span-2">Problem A Problem A Problem A Problem A Problem A</div>
                <div>100 points</div>
              </li>
            </ul>
          </div>          
        </div>     
        <div>
          <div className="text-xl">Detail</div>
          <CKEditorComponent />
        </div>
        
    </main>
  );
}

export default ContestDetail;