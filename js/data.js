// Portfolio Data: Proyectos, Habilidades y Experiencia de Ignacio Gatti
const portfolioData = {
  profile: {
    name: "Ignacio Gatti",
    title: "Estudiante de Desarrollo de Software | Desktop & Fullstack Developer",
    location: "Esperanza, Santa Fe, Argentina",
    email: "gattiignacio85@gmail.com",
    phone: "+54 9 3496 462576",
    phoneDisplay: "3496-462576",
    whatsappLink: "https://wa.me/5493496462576?text=Hola%20Ignacio,%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20conversar.",
    github: "https://github.com/Ignagatti",
    cvPath: "assets/CV_Ignacio_Gatti.pdf",
    shortBio: "Estudiante de 3° año de la Tecnicatura en Desarrollo de Software. Me enfoco en desarrollar aplicaciones de escritorio y web orientadas a resolver necesidades concretas de comercios y negocios."
  },

  projects: [
    {
      id: "app-para-kioscos",
      title: "App-para-Kioscos",
      subtitle: "Sistema POS y Gestión Comercial",
      category: "desktop",
      featured: true,
      image: null,
      tags: ["Electron", "TypeScript", "HTML5", "CSS3", "SQLite"],
      badge: "Desktop POS",
      summary: "Sistema de punto de venta y control comercial para kioscos y comercios. Automatiza el control de inventario, registro ágil de ventas, arqueo de caja diario y persistencia local.",
      description: "App-para-Kioscos es una solución de escritorio pensada para el trabajo diario en mostrador. Funciona de manera local y rápida con SQLite, permitiendo registrar ventas por código de barras, actualizar el stock automáticamente y cerrar turnos de caja sin depender de conexión a internet.",
      highlights: [
        "Control de stock automático con avisos de bajo inventario.",
        "Módulo de caja con apertura, cierres de turno y arqueo.",
        "Cobro ágil con soporte para lector de código de barras.",
        "Base de datos local en SQLite y tipado estricto con TypeScript."
      ],
      github: "https://github.com/Ignagatti/App-para-Kioscos",
      demo: null
    },
    {
      id: "farmazity",
      title: "FarmaZity",
      subtitle: "Gestión de Farmacias y Fórmulas Magistrales",
      category: "desktop",
      featured: true,
      image: null,
      tags: ["React", "TypeScript", "Electron", "SQLite"],
      badge: "Salud & Farmacia",
      summary: "Software de escritorio para farmacias. Administra stock de medicamentos, cálculo de fórmulas magistrales, control de recetas y vencimiento de lotes.",
      description: "Desarrollado con React y Electron, este sistema aborda la gestión de inventario farmacéutico y la preparación de fórmulas magistrales, facilitando el cálculo de proporciones, componentes y costos en el laboratorio de la farmacia.",
      highlights: [
        "Calculadora para proporciones y preparación de fórmulas magistrales.",
        "Seguimiento de lotes de medicamentos y fechas de vencimiento.",
        "Gestión de lista de precios y stock de drogas puras.",
        "Interfaz reactiva desarrollada en React y empaquetada con Electron."
      ],
      github: "https://github.com/Ignagatti/FarmaZity",
      demo: null
    },
    {
      id: "sistema-mozos",
      title: "Sistema-Mozos & Pedidos Rivera",
      subtitle: "Gestión de Salón y Comandas Gastronómicas",
      category: "desktop",
      featured: true,
      image: null,
      tags: ["JavaScript", "Electron", "Node.js", "CSS3"],
      badge: "Gastronomía",
      summary: "Aplicación de escritorio para salones gastronómicos: control visual de mesas, toma ágil de pedidos, tickets para cocina y cierre de cuentas.",
      description: "Surgió directamente de la experiencia de trabajo en el salón del Club de Bochas Barrio Rivera. Permite a mozos y encargados saber en tiempo real qué mesas están libres, ocupadas o pidiendo la cuenta, agilizando el envío de pedidos a cocina y evitando demoras o errores.",
      highlights: [
        "Plano interactivo de mesas con estados en tiempo real.",
        "Envío directo de comandas separando cocina y bebidas.",
        "Cierre de mesas, cálculo rápido de cuentas y división de gastos.",
        "Pensado desde la experiencia real de atención en el salón."
      ],
      github: "https://github.com/Ignagatti/Sistema-Mozos",
      demo: null
    },
    {
      id: "carta-digital",
      title: "Carta Digital Interactiva",
      subtitle: "Menú Web Responsive para Gastronomía",
      category: "web",
      featured: true,
      image: null,
      tags: ["HTML5", "CSS3", "JavaScript", "Mobile-First"],
      badge: "Web App",
      summary: "Menú web interactivo para consultar platos, precios actualizados y filtrar por categorías desde el celular mediante código QR.",
      description: "Menú digital liviano y responsive para clientes gastronómicos. Carga al instante en cualquier teléfono sin tener que descargar ninguna app, permitiendo ver fotos, precios y armar un pedido de manera ordenada.",
      highlights: [
        "Filtro instantáneo por categorías de platos y bebidas.",
        "Simulador de pedido para calcular totales antes de pedir.",
        "Diseño mobile-first optimizado para conexiones móviles.",
        "Actualización ágil de disponibilidad de platos y precios."
      ],
      github: "https://github.com/Ignagatti/carta",
      demo: "https://ignagatti.github.io/carta/"
    },
    {
      id: "practicas-profesionalizantes",
      title: "AcuApp",
      subtitle: "Gestión de Pedidos Personalizados y Presupuestos",
      category: "web",
      featured: false,
      image: null,
      tags: ["JavaScript", "Node.js", "SQL", "HTML5", "CSS3"],
      badge: "Web App",
      summary: "Sistema web para la administración de pedidos a medida, generación de presupuestos automáticos y control de clientes y proveedores para fábrica de mobiliario.",
      description: "Desarrollado para informatizar y agilizar la gestión de la fábrica Acuaber en Esperanza. Permite registrar pedidos de sillas y sillones personalizados (tipo de tela, color de lustre y medidas), generar presupuestos al instante y llevar el control ordenado de ventas, clientes y compras sin depender de planillas de cálculo manuales.",
      highlights: [
        "Carga de pedidos con personalización completa de telas, lustres y acabados.",
        "Generación y cálculo ágil de cotizaciones y presupuestos.",
        "Seguimiento del estado de pedidos en curso, entregas e historial de ventas.",
        "Base de datos relacional centralizada para clientes y proveedores."
      ],
      github: "https://github.com/Ignagatti/Practicas-Profesionalizantes",
      demo: null
    }
  ],

  skills: {
    frontend: [
      { name: "HTML5 & CSS3", level: 90, desc: "Estructura semántica, diseño responsive, flexbox y grid" },
      { name: "JavaScript (ES6+)", level: 85, desc: "Manipulación del DOM, lógica de eventos, promesas y consumo de APIs" },
      { name: "TypeScript", level: 80, desc: "Tipado estático, interfaces y desarrollo de código seguro" },
      { name: "React", level: 75, desc: "Componentes, hooks, manejo de estado y aplicaciones de una sola página" }
    ],
    desktopBackend: [
      { name: "Electron", level: 85, desc: "Desarrollo de sistemas de escritorio para Windows y otras plataformas" },
      { name: "Node.js", level: 75, desc: "Entorno de ejecución, manejo de paquetes npm y lógica de backend" },
      { name: "Python", level: 70, desc: "Sintaxis, scripts de automatización y programación orientada a objetos" }
    ],
    databases: [
      { name: "SQLite", level: 85, desc: "Bases de datos locales y ligeras para sistemas de escritorio y puntos de venta" },
      { name: "PostgreSQL & MySQL", level: 80, desc: "Consultas SQL, modelado relacional y normalización de datos" },
      { name: "Modelado Relacional", level: 85, desc: "Diseño entidad-relación, integridad referencial y claves" }
    ],
    toolsAndSoft: [
      { name: "Git & GitHub", level: 85, desc: "Control de versiones, trabajo en ramas y repositorios remotos" },
      { name: "Excel (Intermedio)", level: 80, desc: "Fórmulas, tablas y análisis de planillas de datos" },
      { name: "Resolución de Problemas", level: 95, desc: "Capacidad para entender problemas en comercios y traducirlos a software funcional" },
      { name: "Atención al Cliente", level: 95, desc: "Trato directo con el público, comunicación clara y trabajo bajo presión" }
    ]
  },

  education: [
    {
      period: "2024 — Actualidad",
      title: "Tecnicatura en Desarrollo de Software",
      institution: "Instituto Tecnológico El Molino",
      status: "Cursando 3° Año",
      description: "Formación en programación orientada a objetos, bases de datos relacionales, desarrollo web y de escritorio, redes, arquitectura de software y proyecto final integrador."
    },
    {
      period: "2018 — 2022",
      title: "Bachiller en Ciencias Sociales",
      institution: "Colegio San José",
      status: "Secundaria Completa",
      description: "Formación de nivel medio orientada a ciencias sociales, comunicación y trabajo colaborativo."
    }
  ],

  experience: [
    {
      period: "2024 — Actualidad",
      role: "Atención al Cliente y Mozo de Salón",
      company: "Club de Bochas Barrio Rivera",
      location: "Esperanza, Santa Fe",
      description: "Recepción de clientes, toma de pedidos, servicio de mesas y cobro de cuentas. Esta experiencia en el día a día del salón me permitió entender los problemas reales de los gastronómicos y dio origen al desarrollo del Sistema de Mozos y la Carta Digital."
    },
    {
      period: "2025 — Actualidad",
      role: "Desarrollador de Software - Proyecto AcuApp",
      company: "Acuaber • Instituto Tecnológico El Molino",
      location: "Esperanza, Santa Fe",
      description: "Relevamiento de requerimientos y desarrollo de la plataforma web de gestión administrativa y presupuestos para la fábrica Acuaber. Modelado de la base de datos relacional, implementación del backend y pantallas de carga de pedidos personalizados."
    }
  ]
};
