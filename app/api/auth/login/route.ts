import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { makeToken } from '@/lib/auth';
export async function POST(req:Request) {
 try { const b=await req.json(); if(typeof b.email!=='string'||typeof b.password!=='string') return NextResponse.json({error:'Datos inválidos'},{status:400});
 const user=await prisma.user.findUnique({where:{email:b.email.trim().toLowerCase()}});
 if(!user||!(await bcrypt.compare(b.password,user.passwordHash))) return NextResponse.json({error:'Credenciales incorrectas'},{status:401});
 return NextResponse.json({message:'Inicio de sesión exitoso',token:await makeToken(user.id),user:{id:user.id,name:user.name,email:user.email}});
 } catch {return NextResponse.json({error:'Solicitud inválida'},{status:400});}
}
