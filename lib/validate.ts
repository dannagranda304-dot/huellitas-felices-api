export function productInput(body:any) {
 const name=typeof body?.name==='string'?body.name.trim():'';
 const category=typeof body?.category==='string'?body.category.trim():'';
 const description=typeof body?.description==='string'?body.description.trim():'';
 const price=body?.price,stock=body?.stock;
 if(!name||name.length>100||!category||category.length>60||description.length>500||typeof price!=='number'||!Number.isFinite(price)||price<0||typeof stock!=='number'||!Number.isSafeInteger(stock)||stock<0) return null;
 return {name,category,description,price,stock};
}
