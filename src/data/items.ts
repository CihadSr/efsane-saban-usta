// src/data/items.ts
export type Cat = 'meze'|'et'|'kofte'|'sicak'|'tatli'|'icecek'|'deniz'
export type Item = { id:string; name:string; price:number; cat:Cat; img:string; desc?:string }

export const ITEMS: Item[] = [
  
  // === Et ve Tavuk Ürünleri ===
  { id: 'kofte-porsiyon',     cat: 'kofte',  name: 'Köfte Porsiyon',    price: 350,  img: '/media/menu/kofte-porsiyon.jpg' },
  { id: 'kofte-ekmek',        cat: 'kofte',  name: 'Köfte Ekmek',       price: 200,  img: '/media/menu/kofte-ekmek.jpg' },

  { id: 'et-sis-porsiyon',    cat: 'et',     name: 'Şiş Porsiyon',      price: 400,  img: '/media/menu/sis-porsiyon.jpg' },
  { id: 'et-kulbasti',        cat: 'et',     name: 'Külbastı Porsiyon', price: 400,  img: '/media/menu/kulbasti.jpg' },
  { id: 'et-beyti',           cat: 'et',     name: 'Beyti Porsiyon',    price: 400,  img: '/media/menu/beyti.jpg' },
  { id: 'et-antrikot',        cat: 'et',     name: 'Antrikot Porsiyon', price: 500,  img: '/media/menu/antrikot.jpg' },
  { id: 'et-tavuk-porsiyon',  cat: 'et',     name: 'Tavuk Porsiyon',    price: 250,  img: '/media/menu/tavuk-porsiyon.jpg' },
  { id: 'et-tavuk-ekmek',     cat: 'et',     name: 'Tavuk Ekmek',       price: 200,  img: '/media/menu/tavuk-ekmek.jpg' },
  { id: 'et-sucuk-porsiyon',  cat: 'et',     name: 'Sucuk Porsiyon',    price: 350,  img: '/media/menu/sucuk-porsiyon.jpg' },
  { id: 'et-sucuk-ekmek',     cat: 'et',     name: 'Sucuk Ekmek',       price: 200,  img: '/media/menu/sucuk-ekmek.jpg' },

 // === Ekstra Mezeler (görseldeki liste) ===
  { id: 'meze-kuru-borulce',  cat: 'meze',   name: 'Kuru Börülce',      price: 150,  img: '/media/menu/kuru-borulce.jpg' },
  { id: 'meze-yogurt-patlican',cat: 'meze',  name: 'Yoğurtlu Patlıcan', price: 150,  img: '/media/menu/yogurtlu-patlican.jpg' },
  { id: 'meze-fava',          cat: 'meze',   name: 'Fava',              price: 150,  img: '/media/menu/fava.jpg' },
  { id: 'meze-atom',          cat: 'meze',   name: 'Atom',              price: 150,  img: '/media/menu/atom.jpg' },
  { id: 'meze-gicit',         cat: 'meze',   name: 'Gicit Meze',        price: 150,  img: '/media/menu/girit.jpg' }, // metindeki isimle
  { id: 'meze-barbunya',      cat: 'meze',   name: 'Barbunya',          price: 150,  img: '/media/menu/barbunya.jpg' },
  { id: 'meze-semiz',         cat: 'meze',   name: 'Semiz',             price: 150,  img: '/media/menu/semiz.jpg' },
  { id: 'meze-pancar',        cat: 'meze',   name: 'Pancar',            price: 150,  img: '/media/menu/pancar.jpg' },
  { id: 'meze-piyaz',         cat: 'meze',   name: 'Piyaz',             price: 150,  img: '/media/menu/piyaz.jpg' },
  { id: 'meze-saksuka',       cat: 'meze',   name: 'Şakşuka',           price: 150,  img: '/media/menu/saksuka.jpg' },
  { id: 'meze-turp-otu',      cat: 'meze',   name: 'Turp Otu',          price: 150,  img: '/media/menu/turp-otu.jpg' },
  { id: 'meze-sarma',         cat: 'meze',   name: 'Sarma',             price: 150,  img: '/media/menu/sarma.jpg' },
  { id: 'meze-cicek-dolmasi', cat: 'meze',   name: 'Çiçek Dolması',     price: 150,  img: '/media/menu/cicek-dolmasi.jpg' },
  { id: 'meze-kopoglu',       cat: 'meze',   name: 'Köpoğlu',           price: 150,  img: '/media/menu/kopoglu.jpg' },
  { id: 'meze-koz-patlican',  cat: 'meze',   name: 'Köz Patlıcan',      price: 150,  img: '/media/menu/koz-patlican.jpg' },
  { id: 'meze-patlican-salata',cat:'meze',   name: 'Patlıcan Salata',   price: 150,  img: '/media/menu/patlican-salata.jpg' },
  { id: 'meze-haydari',       cat: 'meze',   name: 'Haydari',           price: 150,  img: '/media/menu/haydari.jpg' },
  { id: 'meze-havuc-tarator', cat: 'meze',   name: 'Havuç Tarator',     price: 150,  img: '/media/menu/havuc-tarator.jpg' },
  { id: 'meze-deniz-borulcesi',cat: 'meze',  name: 'Deniz Börülcesi',   price: 150,  img: '/media/menu/deniz-borulcesi.jpg' },

  // Yan Ürünler / Sıcaklar
  { id: 'sicak-patates',      cat: 'sicak',  name: 'Patates',           price: 150,  img: '/media/menu/patates.jpg' },

  
  // === Deniz Ürünleri ve Çorbalar ===
  { id: 'sicak-kelle-paca',   cat: 'sicak',  name: 'Kelle Paça',        price: 250,  img: '/media/menu/kelle-paca.jpg' },
  { id: 'sicak-mercimek',     cat: 'sicak',  name: 'Mercimek Çorbası',  price: 150,  img: '/media/menu/mercimek.jpg' },
  { id: 'sicak-kokorec-ekmek',cat: 'sicak',  name: 'Kokoreç Ekmek',     price: 300,  img: '/media/menu/kokorec-ekmek.jpg' },
  { id: 'sicak-kokorec',      cat: 'sicak',  name: 'Kokoreç Porsiyon',  price: 350,  img: '/media/menu/kokorec-porsiyon.jpg' },

  { id: 'deniz-cipura',       cat: 'deniz',  name: 'Çipura',     price: 500,  img: '/media/menu/cipura.jpg' },
  { id: 'deniz-cinekop-kg',   cat: 'deniz',  name: 'Çinekop (kg)',      price: 1200, img: '/media/menu/cinekop.jpg' },
  { id: 'deniz-kefal-kg',     cat: 'deniz',  name: 'Kefal (kg)',        price: 900,  img: '/media/menu/kefal.jpg' }, // 800–1000 arası ortalama
  { id: 'deniz-kalamar',      cat: 'deniz',  name: 'Kalamar',           price: 500,  img: '/media/menu/kalamar.jpg' },
  { id: 'deniz-karides',      cat: 'deniz',  name: 'Karides',           price: 500,  img: '/media/menu/karides.jpg' },

  // === İçecekler ===
  { id: 'icecek-soda',        cat: 'icecek', name: 'Soda',              price: 40,   img: '/media/menu/soda.jpg' },
  { id: 'icecek-cola',        cat: 'icecek', name: 'Cola',              price: 80,   img: '/media/menu/cola.jpg' },
  { id: 'icecek-fanta',       cat: 'icecek', name: 'Fanta',             price: 80,   img: '/media/menu/fanta.jpg' },
  { id: 'icecek-meyve-suyu',  cat: 'icecek', name: 'Meyve Suyu',        price: 80,   img: '/media/menu/meyve-suyu.jpg' },
  { id: 'icecek-salgam',      cat: 'icecek', name: 'Şalgam',            price: 80,  img: '/media/menu/salgam.jpg' },

]

// Not: Görsel yoksa geçici '/media/menu/placeholder.jpg' kullan.
