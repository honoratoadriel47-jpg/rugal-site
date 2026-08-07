/**
 * RUGAL MODAS — Camada de dados (mock)
 * ------------------------------------------------------------------
 * Tudo aqui é facilmente editável e preparado para futura integração
 * com uma API REST. Basta trocar estas funções por chamadas HTTP
 * mantendo o mesmo formato de retorno.
 */

export const SITE = {
  brand: "RUGAL",
  brandFull: "Rugal Modas",
  tagline: "Streetwear Premium",
  // Número no formato internacional, sem símbolos. Fácil de alterar.
  whatsappNumber: "5527997622897",
  whatsappDisplay: "(27) 99762-2897",
  instagramHandle: "Adrwzw_",
  instagramUrl: "https://instagram.com/Adrwzw_",
  email: "honoratoadriel47@gmail.com",
  city: "Linhares — ES",
  hours: "Seg a Sáb · 09h às 19h",
};

// Mensagens padrão do WhatsApp
export const WHATSAPP_MESSAGES = {
  general: "Olá! Vim pelo site e gostaria de conhecer os produtos.",

  product: (name, price, size) =>
`Olá, tudo bem?

Tenho interesse neste produto.

Produto: ${name}
Tamanho: ${size}
Valor: R$ ${price.toFixed(2).replace(".", ",")}

Poderia me informar se ele está disponível?

Obrigado!`,

  buy: (name, price) =>
    `Olá! 👋

Quero comprar este produto:

🛍️ Produto: ${name}
💰 Valor: R$ ${price.toFixed(2).replace(".", ",")}

Como faço para finalizar a compra?`,

  collection: "Olá! Quero ver a nova coleção da Rugal Modas.",
};
export const NAV_LINKS = [
  { label: "Início", to: "/" },
  { label: "Masculino", to: "/produtos?cat=masculino" },
  { label: "Times", to: "/produtos?cat=times" },
  { label: "Fire", to: "/produtos?cat=fire" },
  { label: "Prison", to: "/produtos?cat=prison" },
  { label: "Lançamentos", to: "/produtos?cat=lancamentos" },
  { label: "Contato", to: "/contato" },
];

const IMG = {
  hero: "https://images.unsplash.com/photo-1559697242-a465f2578a95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsfGVufDB8fHx8MTc4NTU0NTcyMXww&ixlib=rb-4.1.0&q=85",
  street: "https://images.unsplash.com/photo-1721637635502-b0abaaa75edb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxzdHJlZXR3ZWFyJTIwZmFzaGlvbiUyMG1vZGVsfGVufDB8fHx8MTc4NTU0NTcyMXww&ixlib=rb-4.1.0&q=85",
  oversized: "https://images.unsplash.com/photo-1627225925683-1da7021732ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxvdmVyc2l6ZWQlMjB0LXNoaXJ0fGVufDB8fHx8MTc4NTU0NTcyMXww&ixlib=rb-4.1.0&q=85",
  jersey: "https://images.unsplash.com/photo-1662096909714-e2f206d0a636?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBqZXJzZXklMjBmYXNoaW9ufGVufDB8fHx8MTc4NTU0NTcyMnww&ixlib=rb-4.1.0&q=85",
  jerseyLife: "https://images.unsplash.com/photo-1551854415-1df5f0d94b99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxzb2NjZXIlMjBqZXJzZXklMjBmYXNoaW9ufGVufDB8fHx8MTc4NTU0NTcyMnww&ixlib=rb-4.1.0&q=85",
  insta: "https://images.unsplash.com/photo-1520024146169-3240400354ae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHx1cmJhbiUyMGxpZmVzdHlsZSUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NTU0NTcyMXww&ixlib=rb-4.1.0&q=85",
};

export const CATEGORIES = [
  { slug: "fire", name: "Fire", subtitle: "Coleção assinatura", image: IMG.hero, span: "lg:col-span-7" },
  { slug: "prison", name: "Prison", subtitle: "Streetwear cru", image: IMG.oversized, span: "lg:col-span-5" },
  { slug: "times", name: "Camisas de Time", subtitle: "Nacionais & internacionais", image: IMG.jersey, span: "lg:col-span-5" },
  { slug: "oversized", name: "Oversized", subtitle: "Caimento amplo", image: IMG.street, span: "lg:col-span-4" },
  { slug: "lancamentos", name: "Lançamentos", subtitle: "Drop 2026", image: IMG.jerseyLife, span: "lg:col-span-3" },
];

export const DRIVE = {
  camisasTime: "https://drive.google.com/drive/folders/1E-yGNuYVKqnAs3MhujT4XFcuh1-Twg0Y?usp=drive_link"
};

export const TRUST_BADGES = [
  { icon: "ShieldCheck", title: "Produtos Originais", text: "Peças autênticas e selecionadas." },
  { icon: "Truck", title: "Envio para todo Brasil", text: "Rápido e rastreável." },
  { icon: "MessageCircle", title: "Atendimento rápido", text: "Suporte direto no WhatsApp." },
  { icon: "BadgeCheck", title: "Qualidade Garantida", text: "Tecido premium, acabamento fino." },
];

export const MANIFESTO = [
  { n: "01", title: "Rua é raiz", text: "Nascemos do asfalto. Cada peça carrega a atitude de quem constrói o próprio estilo sem pedir licença." },
  { n: "02", title: "Menos, porém melhor", text: "Curadoria obsessiva. Só entra no drop aquilo que a gente vestiria todo dia — tecido, caimento e acabamento premium." },
  { n: "03", title: "Feito pra durar", text: "Streetwear que não desbota na primeira lavagem. Design atemporal com energia de quem tem 16 a 30." },
];

export const TESTIMONIALS = [
  { name: "Lucas Andrade", role: "São Paulo — SP", stars: 5, text: "Camisa Fire chegou absurda. Tecido pesado, caimento perfeito. Já é minha loja fixa de streetwear." },
  { name: "Bianca Rocha", role: "Rio de Janeiro — RJ", stars: 5, text: "Atendimento no WhatsApp foi rápido demais. Comprei a oversized e virei fã. Qualidade premium de verdade." },
  { name: "Matheus Silva", role: "Belo Horizonte — MG", stars: 5, text: "A camisa do meu time ficou melhor que a oficial. Acabamento impecável e entrega no prazo." },
  { name: "Júlia Fernandes", role: "Curitiba — PR", stars: 5, text: "Visual da loja é lindo e os produtos entregam o que prometem. Recomendo de olhos fechados." },
];

export const INSTAGRAM_POSTS = [IMG.hero, IMG.street, IMG.oversized, IMG.jersey, IMG.jerseyLife, IMG.insta];

const galleryPool = [IMG.hero, IMG.street, IMG.oversized, IMG.jersey, IMG.jerseyLife, IMG.insta];
const gal = (a, b) => [galleryPool[a], galleryPool[b], galleryPool[(a + 2) % 6]];

export const PRODUCTS = [
  { id: "fire-flame-tee", name: "Camisa Fire Flame", category: "fire", brand: "Fire", price: 149.9, oldPrice: 219.9, image: IMG.hero, gallery: gal(0, 1), tag: "Mais vendida", description: "Camisa Fire com estampa flamejante em silk de alta densidade. Malha 30.1 penteada premium, caimento regular streetwear." },
  { id: "fire-black-signature", name: "Fire Black Signature", category: "fire", brand: "Fire", price: 159.9, oldPrice: 229.9, image: IMG.oversized, gallery: gal(2, 0), tag: "Fire", description: "Peça assinatura Fire em preto absoluto com bordado frontal. O básico que não tem nada de básico." },
  { id: "prison-raw-oversized", name: "Prison Raw Oversized", category: "prison", brand: "Prison", price: 139.9, oldPrice: 199.9, image: IMG.street, gallery: gal(1, 2), tag: "Oversized", description: "Prison na modelagem oversized com gola reforçada e estampa costas. Streetwear cru pra quem domina a rua." },
  { id: "prison-concrete", name: "Prison Concrete", category: "prison", brand: "Prison", price: 144.9, oldPrice: 209.9, image: IMG.insta, gallery: gal(5, 0), description: "Tom concreto lavado, efeito estonado exclusivo. Cada peça tem uma variação única de cor." },
  { id: "oversized-shadow", name: "Oversized Shadow", category: "oversized", brand: "Rugal", price: 129.9, oldPrice: 179.9, image: IMG.oversized, gallery: gal(2, 5), tag: "Oversized", description: "Oversized minimalista em grafite. Ombro caído, barra alongada. Conforto de segunda pele." },
  { id: "oversized-off", name: "Oversized Off White", category: "oversized", brand: "Rugal", price: 124.9, oldPrice: 174.9, image: IMG.street, gallery: gal(1, 0), description: "Off white premium com etiqueta lateral. A base perfeita pra qualquer look urbano." },
  { id: "lanc-urban-2026", name: "Urban Drop 2026", category: "lancamentos", brand: "Rugal", price: 169.9, oldPrice: 239.9, image: IMG.insta, gallery: gal(5, 1), tag: "Novo", description: "Primeira peça do Drop 2026. Edição limitada com numeração serigrafada. Enquanto durar o estoque." },
  { id: "lanc-night-city", name: "Night City Tee", category: "lancamentos", brand: "Rugal", price: 154.9, oldPrice: 214.9, image: IMG.hero, gallery: gal(0, 5), tag: "Novo", description: "Estampa noturna full print. Inspirada nas luzes da metrópole. Cada detalhe pensado pra impressionar." },
  { id: "fire-red-alert", name: "Fire Red Alert", category: "fire", brand: "Fire", price: 149.9, oldPrice: 209.9, image: IMG.jerseyLife, gallery: gal(4, 0), tag: "Fire", description: "Fire com acento vermelho de alta voltagem. Pra quem não passa despercebido em lugar nenhum." },
  {
  id: "real-madrid-2526",
  name: "Camisa Real Madrid 25/26",
  category: "times",
  brand: "Adidas",
  price: 169.90,
  oldPrice: 219.90,
 image: "/images/times/realmadrid.jpg",
  gallery: gal(20, 21),
  tag: "Mais vendida",
  description: "Camisa versão torcedor com tecido respirável e excelente acabamento."
},
{
  id: "flamemgo-2526",
  name: "Camisa Flamengo 25/26",
  category: "times",
  brand: "Adidas",
  price: 169.90,
  oldPrice: 219.90,
 image: "/images/times/flamengo.jpg",
  gallery: gal(20, 21),
  tag: "Mais vendida",
  description: "Camisa versão torcedor com tecido respirável e excelente acabamento."
},
{
  id: "santos-2526",
  name: "Camisa Santos 25/26",
  category: "times",
  brand: "Adidas",
  price: 169.90,
  oldPrice: 219.90,
 image: "/images/times/santos.jpg",
  gallery: gal(20, 21),
  tag: "Mais vendida",
  description: "Camisa versão torcedor com tecido respirável e excelente acabamento."
},
{
  id: "saopaulo-2526",
  name: "Camisa São Paulo 25/26",
  category: "times",
  brand: "Adidas",
  price: 169.90,
  oldPrice: 219.90,
 image: "/images/times/saopaulo.jpg",
  gallery: gal(20, 21),
  tag: "Mais vendida",
  description: "Camisa versão torcedor com tecido respirável e excelente acabamento."
},
];

export const SIZE_TABLE = [
  { size: "P", chest: "52 cm", length: "70 cm" },
  { size: "M", chest: "55 cm", length: "72 cm" },
  { size: "G", chest: "58 cm", length: "74 cm" },
  { size: "GG", chest: "61 cm", length: "76 cm" },
  { size: "XG", chest: "64 cm", length: "78 cm" },
];

export const FEATURES = [
  "Malha 100% algodão penteado premium",
  "Estampa em silk de alta durabilidade",
  "Gola reforçada anti-desgaste",
  "Modelagem streetwear unissex",
];

// ---- API-like helpers (troque por fetch no futuro) ----
export const getProducts = () => PRODUCTS;
export const getFeaturedProducts = () => PRODUCTS;
export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);
export const getRelated = (product, n = 4) =>
  PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, n);
export const getBrands = () => [...new Set(PRODUCTS.map((p) => p.brand))];
export const getCategorySlugs = () => [...new Set(PRODUCTS.map((p) => p.category))];
