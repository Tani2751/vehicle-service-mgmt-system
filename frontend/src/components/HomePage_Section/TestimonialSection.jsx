import { testimonals } from "../../utilities";



export default function TestimonialSection() {

    return (
        <>  
            {/* <div className="md:mt-10"></div> */}
            <section className=" h-screen  xl:mb-36  xl:h-screen flex flex-col items-center justify-center">
                <div className="mt-12 flex flex-col items-center justify-center" >
                    <h className="font-heading rounded-xl bg-orange-400 text-white px-2 py-0.5">Testimonals</h>
                    <h2 className="text-black mt-4 text-h3 lg:text-h1 font-bold text-center font-heading">
                        What riders say
                    </h2>
                    <p className="font-sans lg:text-regularNormal mt-4 text-center">
                        Real experiences from our trusted customers across India.
                    </p>
                </div>


                <div className="overflow-hidden w-full mt-10 fade-mask ">
                    <div className=" flex infinite"
                    style={{width:"max-content"}} >
                    <div className="flex shrink-0">
                    {testimonals.map((test, i) => (
                        <div 
                            key={i}
                            className=" flex flex-col shadow-orange-400/60 shadow-xl  justify-between max-w-[500px] bg-[#F2F1F3] p-6 rounded-2xl m-6"

                        >
                            <p className="font-sans text-lg md:text-lg lg:text-xl">
                                {test.comment}
                            </p>
                            <div className="flex mt-6">
                                <div className="mr-6 h-10 w-10 xl:h-16 xl:w-16 rounded-full overflow-hidden gap-3.5 flex items-center justify-center" >
                                    <img src={test.photo} className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-lg lg:text-xl font-heading">
                                        {test.name}
                                    </h6>
                                    <p className="font-sans text-[12px] lg:text-[14px]">
                                        {test.type}, <span>{test.place}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>

                    <div className="flex shrink-0">
                    {testimonals.map((test, i) => (
                        <div 
                            key={i}
                            className=" flex flex-col shadow-orange-400/60 shadow-xl  justify-between max-w-[500px] bg-[#F2F1F3] p-6 rounded-2xl m-6"

                        >
                            <p className="font-sans text-lg md:text-lg lg:text-xl">
                                {test.comment}
                            </p>
                            <div className="flex mt-6">
                                <div className="mr-6 h-10 w-10 xl:h-16 xl:w-16 rounded-full overflow-hidden gap-3.5 flex items-center justify-center" >
                                    <img src={test.photo} className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-lg lg:text-xl font-heading">
                                        {test.name}
                                    </h6>
                                    <p className="font-sans text-[12px] lg:text-[14px]">
                                        {test.type}, <span>{test.place}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                    <div className=" flex infiniteRight mt-10"
                    style={{width:"max-content"}}>
                    <div className="flex shrink-0">
                    {testimonals.map((test, i) => (
                        <div 
                            key={i}
                            className=" flex flex-col shadow-orange-400/60 shadow-xl  justify-between max-w-[500px] bg-[#F2F1F3] p-6 rounded-2xl m-6"

                        >
                            <p className="font-sans text-lg md:text-lg lg:text-xl">
                                {test.comment}
                            </p>
                            <div className="flex mt-6">
                                <div className="mr-6 h-10 w-10 xl:h-16 xl:w-16 rounded-full overflow-hidden gap-3.5 flex items-center justify-center" >
                                    <img src={test.photo} className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-lg lg:text-xl font-heading">
                                        {test.name}
                                    </h6>
                                    <p className="font-sans text-[12px] lg:text-[14px]">
                                        {test.type}, <span>{test.place}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>

                    <div className="flex shrink-0">
                    {testimonals.map((test, i) => (
                        <div 
                            key={i}
                            className=" flex flex-col shadow-orange-400/60 shadow-xl  justify-between max-w-[500px] bg-[#F2F1F3] p-6 rounded-2xl m-6"

                        >
                            <p className="font-sans text-lg md:text-lg lg:text-xl">
                                {test.comment}
                            </p>
                            <div className="flex mt-6">
                                <div className="mr-6 h-10 w-10 xl:h-16 xl:w-16 rounded-full overflow-hidden gap-3.5 flex items-center justify-center" >
                                    <img src={test.photo} className="w-full h-full object-cover"/>
                                </div>
                                <div>
                                    <h6 className="font-semibold text-lg lg:text-xl font-heading">
                                        {test.name}
                                    </h6>
                                    <p className="font-sans text-[12px] lg:text-[14px]">
                                        {test.type}, <span>{test.place}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                </div>
                

               
            <div>

            </div>
        </section>
        </>
        
    )
}

