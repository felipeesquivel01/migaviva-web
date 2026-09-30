/* Datos del sitio: recetas, información nutricional, ingredientes y puntos de venta. */

const RECIPES = [
  {
    id: 'tostada-mediterranea',
    title: 'Tostada mediterránea',
    img: 'assets/img/receta-mediterranea.jpg',
    time: 10, level: 'Fácil',
    categories: ['desayunos', 'saludables'],
    portions: 2,
    ingredients: ['2 rebanadas de MigaViva', '1 bola de mozzarella fresca', '6 tomates cherry', 'Hojas de albahaca y rúcula', 'Aceite de oliva, sal y pimienta'],
    steps: ['Tuesta las rebanadas de MigaViva hasta que estén doradas.', 'Corta la mozzarella y los tomates cherry por la mitad.', 'Arma la tostada con rúcula, mozzarella y tomates.', 'Termina con albahaca, un chorrito de aceite de oliva, sal y pimienta.'],
  },
  {
    id: 'sandwich-pollo-palta',
    title: 'Sándwich de pollo y palta',
    img: 'assets/img/receta-sandwich.jpg',
    time: 15, level: 'Fácil',
    categories: ['almuerzos'],
    portions: 1,
    ingredients: ['2 rebanadas de MigaViva', '100 g de pechuga de pollo cocida', '½ palta', 'Lechuga y tomate', 'Mostaza o mayonesa liviana'],
    steps: ['Desmenuza o corta el pollo en láminas.', 'Muele la palta con una pizca de sal y limón.', 'Unta el pan con la palta y agrega lechuga, tomate y pollo.', 'Cierra, corta en diagonal y disfruta.'],
  },
  {
    id: 'bruschetta-fresca',
    title: 'Bruschetta fresca',
    img: 'assets/img/receta-bruschetta.jpg',
    time: 10, level: 'Fácil',
    categories: ['colaciones', 'saludables'],
    portions: 4,
    ingredients: ['4 rebanadas de MigaViva', '3 tomates maduros', '1 diente de ajo', 'Queso crema', 'Albahaca, aceite de oliva y sal'],
    steps: ['Pica los tomates en cubos y alíñalos con aceite, sal y albahaca.', 'Tuesta el pan y frótalo suavemente con ajo.', 'Unta una capa fina de queso crema.', 'Corona con el tomate y sirve de inmediato.'],
  },
  {
    id: 'panqueques-migaviva',
    title: 'Panqueques de MigaViva',
    img: 'assets/img/receta-panqueques.jpg',
    time: 20, level: 'Media',
    categories: ['desayunos'],
    portions: 3,
    ingredients: ['1 taza de migas de MigaViva', '2 huevos', '¾ taza de leche o bebida vegetal', '1 cda. de miel', 'Frutos rojos para servir'],
    steps: ['Procesa las migas de MigaViva hasta obtener una harina fina.', 'Mezcla con los huevos, la leche y la miel hasta lograr una masa homogénea.', 'Cocina porciones en un sartén caliente, 2 minutos por lado.', 'Sirve apilados con frutos rojos y un toque de miel.'],
  },
  {
    id: 'hamburguesa-vegetal',
    title: 'Hamburguesa vegetal',
    img: 'assets/img/receta-hamburguesa.jpg',
    time: 25, level: 'Media',
    categories: ['almuerzos', 'saludables'],
    portions: 2,
    ingredients: ['2 panes MigaViva', '2 hamburguesas de legumbres', 'Queso laminado', 'Lechuga, tomate y cebolla morada', 'Salsa a elección'],
    steps: ['Cocina las hamburguesas vegetales a fuego medio, 4 minutos por lado.', 'Agrega el queso al final para que se funda.', 'Tuesta el pan por dentro.', 'Arma con lechuga, tomate, cebolla, la hamburguesa y tu salsa favorita.'],
  },
  {
    id: 'tostada-dulce-frutos-rojos',
    title: 'Tostada dulce con frutos rojos',
    img: 'assets/img/receta-frutos-rojos.jpg',
    time: 10, level: 'Fácil',
    categories: ['desayunos', 'colaciones'],
    portions: 2,
    ingredients: ['2 rebanadas de MigaViva', 'Yogur griego o queso crema', 'Frambuesas, arándanos y frutillas', '1 cdta. de miel', 'Menta fresca'],
    steps: ['Tuesta el pan ligeramente.', 'Unta una capa generosa de yogur griego.', 'Distribuye los frutos rojos encima.', 'Termina con miel y hojas de menta.'],
  },
];

const RECIPE_FILTERS = [
  { key: 'todas', label: 'Todas' },
  { key: 'desayunos', label: 'Desayunos' },
  { key: 'almuerzos', label: 'Almuerzos y cenas' },
  { key: 'colaciones', label: 'Colaciones' },
  { key: 'saludables', label: 'Opciones saludables' },
];

const NUTRITION = {
  portion: '2 rebanadas (60 g)',
  rows: [
    ['Energía', '148 kcal', '247 kcal'],
    ['Proteínas', '9,6 g', '16,0 g'],
    ['Grasas totales', '3,9 g', '6,5 g'],
    ['— Grasas saturadas', '0,6 g', '1,0 g'],
    ['Hidratos de carbono', '17,4 g', '29,0 g'],
    ['— Azúcares totales', '1,2 g', '2,0 g'],
    ['Fibra dietética', '4,8 g', '8,0 g'],
    ['Sodio', '198 mg', '330 mg'],
    ['Hierro', '2,9 mg', '4,8 mg'],
    ['Vitamina B12', '0,9 µg', '1,5 µg'],
  ],
};

const INGREDIENTS = [
  { name: 'Harina de insecto', desc: 'Proteína completa con los 9 aminoácidos esenciales, criada de forma controlada y segura.' },
  { name: 'Harina integral de trigo', desc: 'Aporta fibra y la miga suave y esponjosa de un pan de siempre.' },
  { name: 'Semillas de maravilla y linaza', desc: 'Grasas saludables, omega 3 y un crocante irresistible.' },
  { name: 'Avena y cereales', desc: 'Energía de liberación lenta y mayor saciedad.' },
  { name: 'Masa madre natural', desc: 'Mejor digestión, más sabor y conservación sin aditivos.' },
];

const STORES = [
  { name: 'Jumbo', url: 'https://www.jumbo.cl', note: 'Pasillo de panadería saludable' },
  { name: 'Líder', url: 'https://www.lider.cl', note: 'Sección vida sana' },
  { name: 'Tottus', url: 'https://www.tottus.cl', note: 'Panadería envasada' },
  { name: 'Mercado Saludable', url: '#', note: 'Tiendas y venta online' },
];

/* Índice para el buscador del header */
const SEARCH_INDEX = [
  { title: 'Inicio', text: 'Un pan para hoy, un mejor mañana. Nutrición real', url: 'index.html' },
  { title: '¿Qué es MigaViva?', text: 'pan funcional harina de insecto proteína completa', url: 'index.html#que-es' },
  { title: 'Nosotros', text: 'misión visión valores innovación sustentabilidad salud transparencia calidad historia', url: 'nosotros.html' },
  { title: 'Nuestro producto', text: 'alto en proteína fibra vitaminas minerales sin sabor a insecto', url: 'producto.html' },
  { title: 'Información nutricional', text: 'tabla nutricional calorías proteínas', url: 'producto.html#nutricion' },
  { title: 'Ingredientes de calidad', text: 'harina de insecto semillas cereales', url: 'producto.html#ingredientes' },
  { title: 'Beneficios', text: 'proteína fibra micronutrientes energía impacto positivo deportistas', url: 'beneficios.html' },
  { title: 'Recetas', text: 'ideas simples desayunos almuerzos cenas colaciones', url: 'recetas.html' },
  { title: 'Sustentabilidad', text: 'menor impacto ambiental recursos futuro sostenible agua tierra', url: 'sustentabilidad.html' },
  { title: 'Dónde comprar', text: 'jumbo lider tottus mercado saludable puntos de venta', url: 'sustentabilidad.html#donde-comprar' },
  { title: 'Contacto', text: 'escríbenos preguntas sugerencias correo', url: 'sustentabilidad.html#contacto' },
  ...RECIPES.map((r) => ({ title: r.title, text: 'receta ' + r.ingredients.join(' '), url: 'recetas.html#' + r.id })),
];
