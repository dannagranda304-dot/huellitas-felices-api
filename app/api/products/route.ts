import { NextRequest,NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { userId } from '@/lib/auth';
import { productInput } from '@/lib/validate';
export async function GET(req:NextRequest) {const id=await userId(req);if(!id)return NextResponse.json({error:'Token requerido o inválido'},{status:401});return NextResponse.json(await prisma.product.findMany({where:{ownerId:id},orderBy:{id:'desc'}}));}
export async function POST(req:NextRequest) {const id=await userId(req);if(!id)return NextResponse.json({error:'Token requerido o inválido'},{status:401});try{const input=productInput(await req.json());if(!input)return NextResponse.json({error:'Revisa nombre, categoría, precio y existencias'},{status:400});const product=await prisma.product.create({data:{...input,ownerId:id}});return NextResponse.json(product,{status:201});}catch{return NextResponse.json({error:'Datos inválidos'},{status:400});}}
