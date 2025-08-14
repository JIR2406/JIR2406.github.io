import { get } from 'simple-icons';
import fs from 'node:fs';

const iconsNeeded = ['RedHat','Googlecloud','Google','Microsoftazure','Cisco','Mongodb'];

if (!fs.existsSync('assets/vendors')) fs.mkdirSync('assets/vendors',{recursive:true});

iconsNeeded.forEach(name=>{
  const icon = get(name);
  if (!icon) return console.warn('No encontrado:', name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor" aria-label="${icon.title}">${icon.path}</svg>`;
  fs.writeFileSync(`assets/vendors/${icon.slug}.svg`, svg);
  console.log('Guardado', icon.slug);
});