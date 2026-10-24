export type Review = {
  author: string;
  treatment: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  illustrative: boolean;
};

// Temporal placeholder reviews using external real-woman photos while approval is pending.
export const REVIEWS: Review[] = [
  {
    author: "María P.",
    treatment: "Limpieza facial profesional",
    title: "Piel más luminosa",
    text: "La atención fue muy cercana y me explicó todo con calma. Mi piel se siente más fresca, suave y con mejor luminosidad desde la primera visita.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mujer sonriente con piel luminosa y natural",
    illustrative: true,
  },
  {
    author: "Daniela R.",
    treatment: "Tratamiento facial personalizado",
    title: "Confianza total",
    text: "Me encantó el trato personalizado. Sentí que realmente escucharon mis necesidades y el resultado se ve muy natural y cuidado.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Retrato de mujer con una sonrisa natural y expresión tranquila",
    illustrative: true,
  },
  {
    author: "Valentina C.",
    treatment: "Hidratación y brillo",
    title: "Un espacio muy agradable",
    text: "El ambiente es muy acogedor y la atención es excelente. Vi un cambio visible en la hidratación y el brillo de mi rostro.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mujer con estilo natural y piel radiante en primer plano",
    illustrative: true,
  },
  {
    author: "Sofía L.",
    treatment: "Cuidado integral de la piel",
    title: "Resultado muy natural",
    text: "La recomendación fue muy acertada para mi tipo de piel. Todo el proceso fue amable, claro y con resultados que se sienten y se ven.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Mujer de perfil con maquillaje natural y mirada relajada",
    illustrative: true,
  },
];

export const REAL_REVIEW_COUNT = REVIEWS.filter((review) => !review.illustrative).length;
