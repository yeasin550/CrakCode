import { FaFacebook, FaInstagram, FaPhone, FaSearchLocation, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/Logo.png"
import { FaMessage } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="bg-[#1E1E1E] text-[#bcbec2]">
            <div className="w-11/12 mx-auto md:px-28 py-12 grid grid-cols-2 md:grid-cols-4 gap-12 justify-between">
                <div className="space-y-4">
                    <img src={logo} className="w-36" alt="" />
                    <p>Tasks are valuable sources of knowledge.</p>
                    <div className="flex items-center gap-2 text-white">
                        <FaFacebook />
                        <FaInstagram />
                        <FaWhatsapp />
                    </div>

                </div>
                <div>
                    <h1 className="font-bold mb-4 text-white">Category</h1>
                    <div className="space-y-3">
                        <p>Immigration</p>
                        <p>Study Abroad</p>
                        <p>News</p>
                    </div>
                </div>
                <div>
                    <h1 className="font-bold mb-4 text-white">Latest Post</h1>
                    <div className="space-y-5">
                        <p>Study in China</p>
                        <p>Author Scholarships in China</p>
                        <p>How to post task</p>

                    </div>
                </div>
                <div className="space-y-3 md:mr-0 mr-2">
                    <h1 className="font-bold mb-4 text-white">Contact Us</h1>
                    <p className="flex gap-2"><FaSearchLocation className="mt-2 text-[#C0771E] text-[20px]" /> Dhaka-1212 (Near American Embassy)</p>

                    <p className="flex items-center gap-2"><FaPhone className="text-[#C0771E] text-[20px]" /> +880 1607-002687</p>

                    <p className="flex items-center gap-2"><FaMessage className="text-[#C0771E] text-[20px]" /> info@crakcodeapps.com</p>
                </div>

            </div>
            <hr className="border- border-t-gray-300" />
            <p className="text-center py-6">Designed and Developed By CrakCode Apps</p>
        </div>
    );
};

export default Footer;