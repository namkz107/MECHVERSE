import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
const input='../.cache/assets-research/noctua-nf-a12x25r-pwm-official.jpg';
const original=await readFile(input);
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
try{
  const page=await browser.newPage();await page.goto('about:blank');await mkdir('public/images',{recursive:true});
  for(const width of [640,1280]){
    const data=await page.evaluate(async({url,width})=>{const img=new Image();img.src=url;await img.decode();const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(img.height*width/img.width);canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);return {encoded:canvas.toDataURL('image/webp',0.86).split(',')[1],height:canvas.height};},{url:`data:image/jpeg;base64,${original.toString('base64')}`,width});
    const file=`public/images/noctua-case-${width}.webp`;const buffer=Buffer.from(data.encoded,'base64');await writeFile(file,buffer);console.log(`${file}: ${width}×${data.height}, ${buffer.length} bytes`);
  }
  await writeFile('public/images/noctua-case.attribution.json',JSON.stringify({publisher:'Noctua',model:'NF-A12x25r PWM',source:'https://cdn.noctua.at/media/nf_a12x25r_pwm_1.jpg',product:'https://www.noctua.at/en/products/nf-a12x25r-pwm/downloads',rights:'https://www.noctua.at/en/legal-information',license:'Noctua website asset use grant; revocable, non-exclusive, royalty-free; not CC0.',checkedAt:'2026-11-09',changes:'Resized to 640/1280px wide and encoded WebP, no content edits or crop.',scope:'Official product image of a separate computer-fan case study; not the EDU-FAN-01 desk-fan model and not evidence of interior geometry.',originalSha256:'AC30DB9FBD6C5A56EE9733E10B0C34079E3B9FC7265B92DC59C2DCA6FF5563D2'},null,2));
}finally{await browser.close();}
