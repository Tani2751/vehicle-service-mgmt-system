import { comparisonData } from "../../utilities";
import { Check } from 'lucide-react';



export function ComparsionSection() {
    return (
        <section className="min-h-screen mt-60 w-full p-8">
                <h2 className=" text-h3 font-bold text-center mb-10">
                   <span className="text-orange-400">Compare</span> what each plans covers
                </h2>
                <div className="overflow-x-auto mt-20 mx-10" >
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xl lg:text-2xl">
                                <th className="p-4 border-b border-orange-300">Feature</th>
                                <th className="p-4 border-b border-orange-300 text-center">Basic Plan</th>
                                <th className="p-4 border-b border-orange-300 text-center">Plus Plan</th>
                                <th className="p-4 border-b border-orange-300 text-center">Premium Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row, index) => (
                                <tr key={index} className=" border-b border-orange-300/30 text-sm lg:text-xl p-6 font-sans font-medium">
                                    <td className="p-6 ">{row.feature}</td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center">
                                        {row.basic ? <Check className="text-orange-400" /> : "—"}
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex items-center justify-center">
                                        {row.standard ? <Check className="text-orange-400"  /> : "—"}
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex items-center justify-center">
                                        {row.premium ? <Check className="text-orange-400"  /> : "—"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </section>
    )
}