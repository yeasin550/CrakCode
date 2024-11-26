import banner from "../../assets/banner.jpg"


const Banner = () => {
    return (
        <div className="max-w-[1200px] mb-5 py-12 px-5 mx-auto md:flex items-center justify-between overflow-hidden">
            <div className="flex-1 text-left md:w-1/2 space-y-3">
                <h1 className="text-[30px] md:text-[50px] font-bold mb-2">
                    Manage Task <br /> <span className="text-[#FF0000]">Efficiently.</span>
                </h1>
                <h1 className="text-2xl font-bold">Plan, Track and Organized your work.</h1>
                <p className="leading-6 mb-8">
                    An Intranet platform to Manage projects, Organized work and focus on what is important.
                </p>
                <div className="flex gap-5">
                    <a href="#" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold transition-colors hover:bg-indigo-700">
                        Explore More →
                    </a>
                    <a href="#" className="hidden md:block px-6 py-3 bg-white text-gray-800 border border-black rounded-full font-bold transition-colors hover:bg-gray-100">
                        See other promos
                    </a>
                </div>
            </div>
            <div className="flex-1 relative md:w-1/2">
                {/* <div className="md:w-[450px] md:h-[450px] w-[300px] h-[300px] bg-[#f58529] rounded-full absolute right-0 top-1/2 transform -translate-y-1/2"></div> */}
                <img src={banner} alt="Student with books" className="relative z-10 w-full h-full" />
            </div>
        </div>
    );
};

export default Banner;