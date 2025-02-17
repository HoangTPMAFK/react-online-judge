import { Info, PieChart } from 'lucide-react';
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from 'chart.js'; // Import necessary components
import { Pie } from 'react-chartjs-2';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProblemDetail() {
    const pieData = {
        labels: ['Success', 'Failure'],
        datasets: [
            {
                data: [75, 25], // 75% thành công, 25% thất bại
                backgroundColor: ['#22c55e', '#ef4444'], // Xanh cho thành công, Đỏ cho thất bại
                hoverBackgroundColor: ['#16a34a', '#dc2626'],
            },
        ],
    };
    const [language, setLanguage] = useState('cpp');
    const changeLanguage = () => {
        setLanguage(document.querySelector('.language').value);
    }
    const [code, setCode] = useState('')
    return(
    <>
        <div className="grid grid-cols-5">
            <div className="col-span-4 bg-white shadow-sm m-4">
                <div className="text-3xl text-slate-700 p-4">Problem A</div>
                <div>
                    <div className="px-4 py-2">
                        <div className="text-2xl text-cyan-600">Problem Statement</div>
                        <div className="text-lg text-slate-800 pl-12">
                            <p>Hãy tính tổng của hai số nguyên và đưa ra kết quả.</p>
                            <p>Hãy cẩn thận không để xuất ra thông tin không cần thiết, chẳng hạn như "Vui lòng nhập giá trị của a và b: ". Xem phần ẩn để biết mã mẫu.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4 py-2">
                        <div className="text-2xl text-cyan-600">Input</div>
                        <div className="text-lg text-slate-800 pl-12">
                            <p>Hai số nguyên được phân cách bằng dấu cách.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="px-4">
                        <div className="text-2xl text-cyan-600">Output</div>
                        <div className="text-lg text-slate-800 pl-12">
                            <p>Tổng của hai số.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-2 mb-2">
                        <div className="mx-4 my-2">
                            <div className="text-2xl text-cyan-600">Sample input 1</div>
                            <code className="text-lg bg-gray-50 px-2 border flex">4 5</code>
                        </div>
                        <div className="mx-4 my-2">
                            <div className="text-2xl text-cyan-600">Sample output 1</div>
                            <code className="text-lg bg-gray-50 px-2 border flex">9</code>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mb-2">
                        <div className="mx-4 my-2">
                            <div className="text-2xl text-cyan-600">Sample input 2</div>
                            <code className="text-lg bg-gray-50 px-2 border flex">14 5</code>
                        </div>
                        <div className="mx-4 my-2">
                            <div className="text-2xl text-cyan-600">Sample output 2</div>
                            <code className="text-lg bg-gray-50 px-2 border flex">19</code>
                        </div>
                    </div>
                </div>
                <div className='bg-slate-50 h-10'></div>
                <div>
                    <select className='border p-2 w-60 mx-4 my-4' id='language' onChange={changeLanguage}>
                        <option value='cpp'>C++</option>
                        <option value='java'>Java</option>
                        <option value='python'>Python</option>
                    </select>
                    <ReactCodeMirror
                        value={code}
                        options={{
                        mode: language, // Set the language mode
                        theme: 'default', // Set the theme (you can change this to any theme you like)
                        lineNumbers: true, // Show line numbers
                        tabSize: 2, // Set tab size
                        indentWithTabs: true, // Indent with tabs
                        viewportMargin: Infinity,
                        minHeight: '500px',
                        }}
                        onChange={(editor, data, value) => {
                        setCode(value); // Update the code state when the editor content changes
                        }}
                    />
                    <button className='bg-blue-500 text-white p-2 m-4'>Submit</button>
                </div>
            </div>
            <div className="col-span-1 m-4">
                <div className='bg-white'>
                    <div className='shadow-sm p-4 mb-4'>
                        <div className='flex gap-4'><Info /> <div>Informations</div></div>
                        <ul className='p-4'>
                            <li className='flex justify-between border-b py-2'>
                                <div>ID</div>
                                <div>1</div>
                            </li>
                            <li className='flex justify-between border-b py-2'>
                                <div>Level</div>
                                <div>Easy</div>
                            </li>
                            <li className='flex justify-between border-b py-2'>
                                <div>Time limit</div>
                                <div>1s</div>
                            </li>
                            <li className='flex justify-between border-b py-2'>
                                <div>Memory limit</div>
                                <div>256MB</div>
                            </li>
                            <li className='flex justify-between border-b py-2'>
                                <div>Author</div>
                                <div>root</div>
                            </li>
                        </ul>
                    </div>
                    <div className='bg-slate-50 h-10'></div>
                    <div className='shadow-sm p-4 mb-4'>
                        <div className='flex gap-4'><PieChart /> <div>Statistic</div></div>
                        <div className='p-4'>
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ProblemDetail