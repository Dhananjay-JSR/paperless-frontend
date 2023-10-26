import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// To handle a GET request to /api
export async function GET(request:NextRequest) {
  // Do whatever you want

let ID_Querry = request.nextUrl.searchParams.get("id")!
    // const users = await prisma.storageEngine.create({
    //     data:{
    //         code: "aasasasas",
    //         languageType: "javascript",
    //     }
    // })
    // console.log(users)
    let data = await prisma.storageEngine.findFirst({
        where:{
            url: ID_Querry
        }
    })

    // console.log(ID_Querry)

  return NextResponse.json({ data:data}, { status: 200 });
}

export async function POST(request:NextRequest) {
    function makeid(length:number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
   let URL = makeid(4)
   let BodyDaya = (await request.json())
    let code = BodyDaya.code
    let languageType = BodyDaya.language
    try{

        const users = await prisma.storageEngine.create({
            data:{
                code: code,
                languageType: languageType,
                url: URL
            }
        })
        // Do whatever you want
        return NextResponse.json({ URL  }, { status: 200 });
    }
    catch(err){
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
    }
