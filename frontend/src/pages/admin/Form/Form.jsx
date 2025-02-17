const Form = () => {
    return (
        <main className="w-full flex-grow p-6">
            <h1 className="w-full text-3xl text-black pb-6">Forms</h1>

            <div className="flex flex-wrap">
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                    <p className="text-xl pb-6 flex items-center">
                        <i className="fas fa-list mr-3"></i> Contact Form
                    </p>
                    <div className="leading-loose">
                        <form className="p-10 bg-white rounded shadow-xl">
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="name">Name</label>
                                <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="name" name="name" type="text" required placeholder="Your Name" aria-label="Name" />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600" htmlFor="email">Email</label>
                                <input className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded" id="email" name="email" type="text" required placeholder="Your Email" aria-label="Email" />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600" htmlFor="message">Message</label>
                                <textarea className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded" id="message" name="message" rows="6" required placeholder="Your inquiry.." aria-label="Message"></textarea>
                            </div>
                            <div className="mt-6">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="w-full lg:w-1/2 mt-6 pl-0 lg:pl-2">
                    <p className="text-xl pb-6 flex items-center">
                        <i className="fas fa-list mr-3"></i> Checkout Form
                    </p>
                    <div className="leading-loose">
                        <form className="p-10 bg-white rounded shadow-xl">
                            <p className="text-lg text-gray-800 font-medium pb-4">Customer information</p>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="cus_name">Name</label>
                                <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required placeholder="Your Name" aria-label="Name" />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600" htmlFor="cus_email">Email</label>
                                <input className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required placeholder="Your Email" aria-label="Email" />
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600" htmlFor="cus_address">Address</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_address" name="cus_address" type="text" required placeholder="Street" aria-label="Address" />
                            </div>
                            <div className="mt-2">
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_city" name="cus_city" type="text" required placeholder="City" aria-label="City" />
                            </div>
                            <div className="inline-block mt-2 w-1/2 pr-1">
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_country" name="cus_country" type="text" required placeholder="Country" aria-label="Country" />
                            </div>
                            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_zip" name="cus_zip" type="text" required placeholder="Zip" aria-label="Zip" />
                            </div>
                            <p className="text-lg text-gray-800 font-medium py-4">Payment information</p>
                            <div>
                                <label className="block text-sm text-gray-600" htmlFor="cus_card">Card</label>
                                <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_card" name="cus_card" type="text" required placeholder="Card Number MM/YY CVC" aria-label="Card" />
                            </div>
                            <div className="mt-6">
                                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">$3.00</button>
                            </div>
                        </form>
                    </div>
                    <p className="pt-6 text-gray-600">
                        Source: <a className="underline" href="https://tailwindcomponents.com/component/checkout-form">Tailwind Components</a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Form;