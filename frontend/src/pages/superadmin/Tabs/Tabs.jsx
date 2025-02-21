import { useState } from "react";

const Tabs = () => {
    const [openTab, setOpenTab] = useState(1);

    return (
        <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Tabbed Content</h1>
            <div className="w-full mt-6">
                <div>
                    <ul className="flex border-b">
                        {[1, 2, 3, 4].map((tab) => (
                            <li key={tab} className="-mb-px mr-1">
                                <button
                                    onClick={() => setOpenTab(tab)}
                                    className={`bg-white inline-block py-2 px-4 font-semibold border-l border-t border-r rounded-t ${openTab === tab ? "text-blue-700 font-semibold" : "text-blue-500 hover:text-blue-800"}`}
                                >
                                    Tab {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6">
                    {openTab === 1 && (
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus ligula at condimentum sagittis.
                        </div>
                    )}
                    {openTab === 2 && (
                        <div>
                            Curabitur at lacinia felis. Curabitur elit ante, efficitur molestie iaculis non, blandit dictum dui.
                        </div>
                    )}
                    {openTab === 3 && (
                        <div>
                            Duis imperdiet ullamcorper nibh, sed euismod dolor facilisis sit amet. Etiam quis cursus lorem.
                        </div>
                    )}
                    {openTab === 4 && (
                        <div>
                            Mauris viverra viverra dolor quis gravida. Duis pharetra felis id tellus faucibus pulvinar.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Tabs;
