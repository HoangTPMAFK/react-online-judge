import { useState } from "react";

function AdminMobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-sidebar py-5 px-6 sm:hidden bg-blue-500">
            <div className="flex items-center justify-between">
                <a href="/admin/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">
                    Admin
                </a>
                <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl focus:outline-none">
                    {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                </button>
            </div>

            {/* Dropdown Nav */}
            <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col pt-4`}>
                {[
                    { href: "index.html", icon: "fa-tachometer-alt", label: "Dashboard" },
                    { href: "blank.html", icon: "fa-sticky-note", label: "Blank Page" },
                    { href: "tables.html", icon: "fa-table", label: "Tables" },
                    { href: "forms.html", icon: "fa-align-left", label: "Forms" },
                    { href: "tabs.html", icon: "fa-tablet-alt", label: "Tabbed Content" },
                    { href: "calendar.html", icon: "fa-calendar", label: "Calendar" },
                    { href: "#", icon: "fa-cogs", label: "Support" },
                    { href: "#", icon: "fa-user", label: "My Account" },
                    { href: "#", icon: "fa-sign-out-alt", label: "Sign Out" }
                ].map((item, index) => (
                    <a key={index} href={item.href} className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                        <i className={`fas ${item.icon} mr-3`}></i>
                        {item.label}
                    </a>
                ))}
                <button className="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                    <i className="fas fa-arrow-circle-up mr-3"></i> Upgrade to Pro!
                </button>
            </nav>
        </header>
    );
}

export default AdminMobileMenu;
