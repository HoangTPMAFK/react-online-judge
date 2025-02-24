import { useState } from "react";
import Submission from "./Submission";

function ProblemDetail() {
    const [samples, setSamples] = useState([{ input: "", output: "" }]);

    const addRow = () => {
        setSamples([...samples, { input: "", output: "" }]);
    };

    return (
        <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black font-medium pb-6">Problem</h1>
            <div className="grid grid-cols-2 grid-rows-1 gap-4">
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Title</div>
                    <input type="text" className="w-60 border pl-2 h-8" />
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Problem Statement</div>
                    <textarea className="w-60 border h-20 px-1"></textarea>
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Time limit</div>
                    <input type="number" className="w-60 border pl-2 h-8" placeholder="In milliseconds" />
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Memory limit</div>
                    <input type="number" className="w-60 border pl-2 h-8" placeholder="In KBs" />
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Points</div>
                    <input type="number" className="w-60 border pl-2 h-8" />
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Public</div>
                    <input type="checkbox" />
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Level</div>
                    <select className="w-44 border-2">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">End at</div>
                    <input type="datetime-local" className="w-60 border" />
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Input</div>
                    <textarea className="w-60 h-20 px-1"></textarea>
                </div>
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-xl">Output</div>
                    <textarea className="w-60 h-20 px-1"></textarea>
                </div>
            </div>

            {/* Sample Input & Output Section */}
            <div className="mt-6">
                <div className="grid grid-cols-2 gap-4 border-b pb-2">
                    <div className="text-lg font-medium">Sample Input</div>
                    <div className="text-lg font-medium">Sample Output</div>
                </div>
                {samples.map((sample, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 mt-2">
                        <textarea className="w-full h-16 p-2 border rounded" placeholder="Enter input"></textarea>
                        <textarea className="w-full h-16 p-2 border rounded" placeholder="Enter output"></textarea>
                    </div>
                ))}
                <button
                    onClick={addRow}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Add Sample
                </button>
            </div>
            <div className="mt-4">
                <Submission />
            </div>
        </main>
    );
}

export default ProblemDetail;
