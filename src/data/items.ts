// src/data/items.ts  // [UPDATED]
export type Cat = 'meze'|'et'|'kofte'|'sicak'|'tatli'|'icecek'
export type Item = { id:string; name:string; price:number; cat:Cat; img:string; desc?:string }

export const ITEMS: Item[] = [
  { id:'ezme', name:'Ezme', price:120, cat:'meze', img:'/media/menu/ezme.jpg', desc:'Domates, biber, soğan.' },
  { id:'haydari', name:'Haydari', price:140, cat:'meze', img:'/media/menu/haydari.jpg', desc:'Süzme yoğurt, dereotu.' },
  { id:'saksuka', name:'Şakşuka', price:150, cat:'meze', img:'/media/menu/saksuka.jpg', desc:'Kızarmış sebze, sos.' },
  { id:'antrikot', name:'Antrikot', price:420, cat:'et', img:'/media/menu/antrikot.jpg', desc:'Izgara, dinlendirilmiş.' },
  { id:'pirzola', name:'Kuzu Pirzola', price:380, cat:'et', img:'/media/menu/kuzu-pirzola.jpg', desc:'Kömür ateşi.' },
  { id:'dana-sis', name:'Dana Şiş', price:340, cat:'et', img:'/media/menu/dana-sis.jpg', desc:'Marine, sulu.' },
  { id:'izgara-kofte', name:'Izgara Köfte', price:260, cat:'kofte', img:'/media/menu/izgara-kofte.jpg', desc:'Günlük çekim.' },
  { id:'kasarli-kofte', name:'Kaşarlı Köfte', price:290, cat:'kofte', img:'/media/menu/kasarli-kofte.jpg', desc:'Akışkan kaşar.' },
  { id:'guvec', name:'Tereyağlı Mantarlı Güveç', price:210, cat:'sicak', img:'/media/menu/guvec.jpg', desc:'Taş fırın.' },
  { id:'sutlac', name:'Fırın Sütlaç', price:130, cat:'tatli', img:'/media/menu/sutlac.jpg' },
  { id:'salgam', name:'Şalgam', price:60, cat:'icecek', img:'/media/menu/salgam.jpg' },
  { id:'ayran', name:'Ayran', price:50, cat:'icecek', img:'/media/menu/ayran.jpg' },
]
