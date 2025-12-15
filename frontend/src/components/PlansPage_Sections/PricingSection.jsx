import { useRef, useState } from "react";
import { comparisonData, pricingPlans } from "../../utilities";
import { Check } from 'lucide-react';
import Button from "../Button";

export function PricingSection() {
    const cardRef = useRef(null);


    return (
        <div className="flex flex-col items-center justify-evenly  mt-70">

            <div className="flex flex-col items-center mb-20">
                <span className="font-heading font-semibold rounded-xl bg-orange-400 text-white px-2 py-0.5">
                    Plans
                </span>
                <h1 className="font-bold text-h2 md:text-h1 mt-4">Pick your plan</h1>
                <p className="text-[14px] md:text-regularNormal font-sans mt-4">
                    Choose the plan that fits your riding style and budget
                </p>
            </div>
            {/* pricing section */}
            <section id="pricing" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 m-6">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            ref={cardRef}
                            className=" p-4 m-6 rounded-2xl shadow-2xl shadow-orange-400 bg-gray-200/40"
                        >
                            <div className="p-4 flex flex-col ">
                                <h3 className="font-semibold mb-4 text-h6 md:text-h5">{plan.title}</h3>
                                <p className="font-sans mb-4"> <span className="font-semibold">Ideal for :</span> {plan.idealFor}</p>
                                <p className="font-bold font-sans text-4xl ">{plan.price}</p>
                                <Button name={"Get started"} color={"primary"} textColor={"white"} />                                            
                                <ul className="mt-12">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="mb-4 text-lg flex items-center gap-x-4">
                                           <Check /> 
                                           {f}
                                        </li>
                                    ))}
                                </ul>                                
                                <p className="font-sans mt-8"><span className="font-semibold">Goal : </span>{plan.Goal}</p>
                            </div>

                        </div>
                    ))}
            </section>
        </div>
        );
}



