 

import prisma from "../../../prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect(); 
    }
    catch (err) {
        return Error("Database connect unsuccessful")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try { 
        console.time('start')
        await main();
        const posts = await prisma.title.findMany();
        console.timeEnd('start') 
        
        

        return NextResponse.json({ message: "Success", posts }, { status: 200 });

    }
    catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
}; 




export const POST = async (req: Request, res: NextResponse) => {
    try {
        const {title, description, img} = await req.json();  
        await main();   
        console.log("Entered");
        
        const post = await prisma.title.createMany({ data: {title} });  
        return NextResponse.json({ message: "Success", post }, { status: 201 })
    } catch (error) {
        console.log("Error ",error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
};
 

 