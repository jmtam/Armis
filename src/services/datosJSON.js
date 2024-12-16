export const carrosJSON = [
  {
    id: 1,
    numero: "3",
  },
  {
    id: 2,
    numero: "4",
  },
  { id: 3, numero: "5" },
  {
    id: 4,
    numero: "6",
  },
  {
    id: 5,
    numero: "7",
  },
  {
    id: 6,
    numero: "8",
  },
  {
    id: 7,
    numero: "9",
  },
  {
    id: 8,
    numero: "10",
  },
];

export const pacientesJSON = [
  {
    id: 1,
    nombre: "Juan Diaz",
    cama: 2,
    sala: "A",
    area: "UCI",
    dni: "28.567.890",
    cobertura: "OSDE",
    ingreso: "17/08/2023",
    foto: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
  },
  {
    id: 2,
    nombre: "Nadia Perez",
    cama: 6,
    sala: "B",
    area: "UCI",
    dni: "33.444.777",
    cobertura: "OMINT",
    ingreso: "23/07/2023",
    foto: "https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png",
  },
  {
    id: 3,
    nombre: "Anibal Herandez",
    cama: 7,
    sala: "B",
    area: "UCI",
    dni: "43.222.123",
    cobertura: "SWISS MEDICAL",
    ingreso: "22/01/2023",
    foto: "",
  },
];

export const pacienteListaTareasJSON = [
  {
    dni: "43.222.123",
    pendientes: [
      { id: 1, tarea: "Dieta Hiposódica - Diabetes" },
      { id: 2, tarea: "Control Glasgow" },
    ],
    finalizadas: [
      { id: 3, tarea: "Control signos vitales" },
      { id: 4, tarea: "Control de escareas" },
    ],
  },
  {
    dni: "28.567.890",
    pendientes: [
      { id: 5, tarea: "Dieta Hiposódica - Diabetes" },
      { id: 6, tarea: "Control Glasgow" },
    ],
    finalizadas: [
      { id: 7, tarea: "Control signos vitales" },
      { id: 8, tarea: "Control de escareas" },
    ],
  },
];

export const carrosStockJSON = {
  farmacos: [
    {
      id: 1,
      item: "Ibuprofeno - 500 mg",
      cantidad: "3",
    },
    {
      id: 2,
      item: "Amoxidal - 1g",
      cantidad: "2",
    },
    {
      id: 3,
      item: "Paracetamol - 600 mg",
      cantidad: "4",
    },
    {
      id: 4,
      item: "Salbutamol - 2 puff",
      cantidad: "1",
    },

    {
      id: 5,
      item: "Ceftriaxona - 1g",
      cantidad: "3",
    },
    {
      id: 6,
      item: "Sol Fisiologica 0.9%  1500 ml",
      cantidad: "6",
    },
  ],

  otros: [
    {
      id: 1,
      item: "Baxter",
      cantidad: "3",
    },
    {
      id: 2,
      item: "Cetirizina - 1mg",
      cantidad: "1",
    },
    {
      id: 3,
      item: "Omeoprazol - 1mg",
      cantidad: "2",
    },
  ],
};

export const carrosStockDNIJSON = [
  {
    dni: "28.567.890",
    farmacos: [
      {
        id: 1,
        item: "Ibuprofeno - 500 mg",
        cantidad: "3",
      },
      {
        id: 2,
        item: "Amoxidal - 1g",
        cantidad: "2",
      },
    ],

    otros: [
      {
        id: 1,
        item: "Baxter",
        cantidad: "3",
      },
    ],
  },
];

export const evolucionesJSON = [
  {
    dni: "28.567.890",
    data: [
      {
        id: 12,
        fecha: "24/07/2023 11:00hs",
        nombre: "Ramiro Paez",
        detalle: " Comento que fue bien todo y abrazo de gol",
      },
      {
        id: 11,
        fecha: "23/07/2023 14:00hs",
        nombre: "Maria Caceres",
        detalle: " Comento que fue bien todo y que vamos para adelante",
      },
      {
        id: 10,
        fecha: "22/07/2022 10:00hs",
        nombre: "Maria Caceres",
        detalle: " Comento que fue bien todo y que se ve bien",
      },
    ],
  },
];

export const evolucionesProcedimientosJSON = [
  {
    id: 1,
    procedimiento: "Procedimiento AAAA",
    valor: 0,
  },
  {
    id: 2,
    procedimiento: "Procedimiento BBBB",
    valor: 0,
  },
  {
    id: 3,
    procedimiento: "Procedimiento CCCC",
    valor: 0,
  },
  {
    id: 4,
    procedimiento: "Procedimiento FFFFF",
    valor: 0,
  },
  {
    id: 5,
    procedimiento: "Procedimiento FFFFF",
    valor: 0,
  },
  {
    id: 6,
    procedimiento: "Procedimiento GGGGG",
    valor: 0,
  },
];

export const tipocontrolesJSON = [
  {
    id: 1,
    control: "Control signos vitales",
  },
  {
    id: 2,
    control: "Control escaras",
  },
  {
    id: 3,
    control: "Control pupilar",
  },
  {
    id: 4,
    control: "Control de Glasgow",
  },
  {
    id: 5,
    control: "Escala de Rass",
  },
  {
    id: 6,
    control: "Valoración",
  },
];

export const controlesJSON = [
  {
    dni: "28.567.890",
    data: [
      {
        id: 1,
        fecha: "24/07/2023 11:00hs",
        control: "Control de signos vitales",
        valores: [
          {
            FR: 100,
            FC: 22,
            SAT02: 34,
            T: 41,
          },
        ],
      },
      {
        id: 2,
        fecha: "23/07/2023 14:00hs",
        control: "Control de escaras",
        valores: [
          {
            FR: 11,
            FC: 22,
            SAT02: 3,
            T: 40,
          },
        ],
      },
      {
        id: 3,
        fecha: "22/07/2022 10:00hs",
        control: "Control de signos vitales",
        valores: [
          {
            FR: 77,
            FC: 4,
            SAT02: 32,
            T: 43,
          },
        ],
      },
    ],
  },
];

export const indicacionesJSON = [
  {
    dni: "28.567.890",
    horarios: [
      {
        hora: "8 AM",
      },
      {
        hora: "10 AM",
      },
      {
        hora: "12 AM",
      },
      {
        hora: "2 PM",
      },
      {
        hora: "24 HS",
      },
    ],
    ingresos: [
      {
        descripcion: "Agua endógena",
        valores: [
          {
            hora: "8 AM",
            valor: 100,
          },
          {
            hora: "10 AM",
            valor: 150,
          },
          {
            hora: "12 AM",
            valor: 100,
          },
          {
            hora: "2 PM",
            valor: 100,
          },

          {
            hora: "24 HS",
            valor: 450,
          },
        ],
      },
    ],
    ingresos_totales: [
      {
        hora: "8 AM",
        valor: 100,
      },
      {
        hora: "10 AM",
        valor: 150,
      },
      {
        hora: "12 AM",
        valor: 100,
      },
      {
        hora: "2 PM",
        valor: 100,
      },

      {
        hora: "24 HS",
        valor: 450,
      },
    ],

    egresos: [
      {
        descripcion: "Agua endógena",
        valores: [
          {
            hora: "8 AM",
            valor: -200,
          },
          {
            hora: "10 AM",
            valor: -300,
          },
          {
            hora: "12 AM",
            valor: -250,
          },
          {
            hora: "2 PM",
            valor: -200,
          },

          {
            hora: "24 HS",
            valor: -1000,
          },
        ],
      },
    ],

    egresos_totales: [
      {
        hora: "8 AM",
        valor: -200,
      },
      {
        hora: "10 AM",
        valor: -300,
      },
      {
        hora: "12 AM",
        valor: -250,
      },
      {
        hora: "2 PM",
        valor: -200,
      },

      {
        hora: "24 HS",
        valor: -1000,
      },
    ],

    balance: [
      {
        hora: "8 AM",
        valor: -150,
      },
      {
        hora: "10 AM",
        valor: -150,
      },
      {
        hora: "12 AM",
        valor: -150,
      },
      {
        hora: "2 PM",
        valor: -100,
      },

      {
        hora: "24 HS",
        valor: -550,
      },
    ],
  },
];

export const balanceItemsJSON = [
  {
    dni: "28.567.890",
    ingresos: [
      {
        id: 1,
        desc: "PHP",
        tipo: "",
        paso: "",
      },
      {
        id: 2,
        desc: "Expansión",
        tipo: "",
        paso: "",
      },
      {
        id: 3,
        desc: "Glóbulos Rojos",
        tipo: "",
        paso: "",
      },
    ],

    egresos: [
      {
        id: 1,
        desc: "PHP",
        tipo: "",
        paso: "",
      },
    ],
  },
];

export const medicacionJSON = [
  {
    dni: "28.567.890",
    data: [
      {
        id: 1,
        descripcion: "Furoseramida",
        dosis: "20 mg",
        via: "Oral",
        frecuencia: "cada 12hs",
        horarios: [
          {
            hora: "11 AM",
            aplicado: true,
            idArticulo: "223456333",
            comentario: "Se bajo la dosis por ",
          },
          {
            hora: "5 PM",
            aplicado: false,
            idArticulo: "",
            comentario: "",
          },
        ],
      },
      {
        id: 2,
        descripcion: "Morfina, clorhidrato",
        dosis: "1 ampolla * Sol. fisiológica",
        via: "Oral",
        frecuencia: "cada 24hs",
        horarios: [
          {
            hora: "12 PM",
            aplicado: true,
            idArticulo: "",
            comentario: "",
          },
          {
            hora: "3 PM",
            aplicado: false,
            idArticulo: "",
            comentario: "",
          },
        ],
      },
      {
        id: 3,
        descripcion: "Lorazepam",
        dosis: "0,5 mg",
        via: "Oral",
        frecuencia: "cada 12hs",
        horarios: [],
      },
    ],
  },
];

export const medicacionArticulosJSON = [
  {
    id_medicamento: 1,
    descripcion: "Furoseramida",
    articulos: [
      {
        codigo: "223456333",
        descripcion: "RONELAX POR 120 ML",
        lote: "12 A",
        fecha_vto: "04/2024",
        origen: "",
        stock: "1000",
        dosis: "",
      },
      {
        codigo: "7793957000058",
        descripcion: "ALCOHOL EN GEL 200 ML",
        lote: "18 A",
        fecha_vto: "04/2026",
        origen: "",
        stock: "1000",
        dosis: "",
      },

      {
        codigo: "2234565555",
        descripcion: "RONELAX POR 300 ML",
        lote: "16 A",
        fecha_vto: "09/2024",
        origen: "",
        stock: "200",
        dosis: "",
      },
    ],
  },
  {
    id_medicamento: 2,
    descripcion: "Morfina, clorhidrato",
    articulos: [
      {
        codigo: "22345633389111",
        descripcion: "MORFEX ampolla",
        lote: "33 A",
        fecha_vto: "02/2026",
        origen: "",
        stock: "500",
        dosis: "",
      },
      {
        codigo: "22345633555555",
        descripcion: "PORMORFIN ampolla",
        lote: "16 A",
        fecha_vto: "10/2028",
        origen: "",
        stock: "50",
        dosis: "",
      },
    ],
  },
];

export const notificacionesJSON = [
  {
    dni: "27.872.828",
    data: [
      {
        id: 1,
        fecha: "24/10/2023",
        titulo: "Medicación",
        body: "Aplicar medicamento al paciente 23.456.456",
      },
      {
        id: 2,
        fecha: "28/10/2023",
        titulo: "Control",
        body: "Aplicar control 28.666.111",
      },
      {
        id: 3,
        fecha: "01/10/2023",
        titulo: "Sistema",
        body: "Ya esta disponibles los comentarios en aplicaci´n de medicamentos. Consultenos",
      },
      {
        id: 4,
        fecha: "01/10/2023",
        titulo: "Sistema",
        body: "Ya esta disponibles los comentarios en aplicaci´n de medicamentos. Consultenos",
      },
      {
        id: 5,
        fecha: "01/10/2023",
        titulo: "Sistema",
        body: "Ya esta disponibles los comentarios en aplicaci´n de medicamentos. Consultenos",
      },
    ],
  },
];

export const horasJSON = [
  {
    hora: "1 AM",
  },
  {
    hora: "2 AM",
  },
  {
    hora: "3 AM",
  },
  {
    hora: "4 AM",
  },
  {
    hora: "5 AM",
  },
  {
    hora: "6 AM",
  },
  {
    hora: "7 AM",
  },
  {
    hora: "8 AM",
  },
  {
    hora: "9 AM",
  },
  {
    hora: "10 AM",
  },
  {
    hora: "11 AM",
  },
  {
    hora: "12 AM",
  },

  {
    hora: "1 PM",
  },
  {
    hora: "2 PM",
  },
  {
    hora: "3 PM",
  },
  {
    hora: "4 PM",
  },
  {
    hora: "5 PM",
  },
  {
    hora: "6 PM",
  },
  {
    hora: "7 PM",
  },
  {
    hora: "8 PM",
  },
  {
    hora: "9 PM",
  },
  {
    hora: "10 PM",
  },
  {
    hora: "11 PM",
  },
  {
    hora: "12 PM",
  },
];
