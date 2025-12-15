import { useState } from "react";

import { ChevronDown  } from 'lucide-react';
import { questions } from "../../utilities";
import Button from "../Button";


export default function FAQSection() {

    const [isOpen, setIsOpen] = useState([true, false, false, false, false]);

    return (
        <section className="min-h-screen mt-12 flex flex-col gap-y-12 items-center justify-center p-6">
            <div className="flex flex-col lg:flex-row items-baseline gap-y-12 lg:gap-x-14 justify-between p-4"> 
                <div className="flex flex-col items-center w-full xl:w-2/3"> 
                    <h className="font-heading rounded-xl bg-orange-400 text-white px-2 py-0.5">FAQ</h>                   
                    <h2 className="text-h4 text-center lg:text-h2 leading-12  font-heading font-bold mt-8">
                        Common Questions & Answers
                    </h2>
                    <p className="font-sans mt-6 text-center">
                        Find answers to common questions about booking and service coverage
                    </p>                    
                </div>
                <div className="p-4 w-full">
                    {questions.map(({question, answer}, i) => (
                        <div className="p-4  border-b border-orange-200" key={i} >
                            <div 
                                onClick={ () => {
                                        setIsOpen(prev => {
                                            const updated = [...prev];
                                            updated[i] = !updated[i];
                                            return updated
                                        })
                                    }}
                                className="flex cursor-pointer items-center gap-x-6 justify-between">
                                <h4 className=" font-heading text-h6 lg:text-h6 font-semibold mb-2">
                                    {question}
                                </h4>
                                <ChevronDown                                      
                                    className={`text-orange-500 text-2xl ${isOpen[i] ? "rotate-180" : ""} `}/>                                
                            </div>
                            <div className={` ${isOpen[i] ? 'block' : "hidden"} `}>
                                <p className="font-sans text-[14px] lg:text-regularNormal">
                                    {answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-h5 lg:text-h3 font-bold font-heading">
                    Need more help?
                </h3>
                <p className="font-sans mt-3">
                    Reach our support team anytime
                </p>
                <Button name={"Contact"} textColor={'white'} color={"primary"} />
            </div>
        </section>
    )
}