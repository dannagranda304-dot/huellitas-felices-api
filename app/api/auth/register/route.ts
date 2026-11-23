import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
export async function POST(req:Request) {
 try { const b=await req.json(); const name=typeof b.name==='string'?b.name.trim():''; const email=typeof b.email==='string'?b.email.trim().toLowerCase():''; const password=b.password;
 if(!name||name.length>100||!/^\S+@\S+\.\S+$/.test(email)||typeof password!=='string'||password.length<8) return NextResponse.json({error:'Nombre, correo válido y contraseña de mínimo 8 caracteres son obligatorios'},{status:400});
 if(await prisma.user.findUnique({where:{email}})) return NextResponse.json({error:'Este correo ya está registrado'},{status:409});
 const user=await prisma.user.create({data:{name,email,passwordHash:await bcrypt.hash(password,12)},select:{id:true,name:true,email:true}});
 return NextResponse.json({message:'Registro exitoso',user},{status:201});
 } catch {return NextResponse.json({error:'No se pudo completar el registro'},{status:400});}
}
