import { db } from "../db.js";
import { garages } from "../drizzle/schema.js";



const garageList = [
    {
        name: "Main Garage",
        address: "Main road, wardha",
    },

    {
        name: "Sewagram Garage",
        address: "Sewagram road, wardha",
    },
];



export async function seedGarage() {
    for (const g of garageList) {
        await db
            .insert(garages)
            .values(g)
            .onDuplicateKeyUpdate({
                set: {
                name: g.name,
                address: g.address,
            }})
    }
    console.log("garage seeding done");    
}


