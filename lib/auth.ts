import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
function key() { const secret=process.env.JWT_SECRET; if (!secret || secret.length < 32) throw new Error('Configura JWT_SECRET de al menos 32 caracteres'); return new TextEncoder().encode(secret); }
export async function makeToken(id:number) { return new SignJWT({}).setProtectedHeader({alg:'HS256'}).setSubject(String(id)).setIssuedAt().setExpirationTime('2h').sign(key()); }
export async function userId(req:NextRequest):Promise<number|null> { const token=req.headers.get('authorization')?.replace(/^Bearer\s+/i,''); if(!token) return null; try { const {payload}=await jwtVerify(token,key()); const id=Number(payload.sub); return Number.isSafeInteger(id)&&id>0?id:null; } catch { return null; } }
