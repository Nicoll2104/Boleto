const bd = {
    bus: [
      {
        placa:"638",
        modelo:"Mercedes Benz",
        soat:123456789,
        n_asiento:20
      }
    ],
    clientes: [
    {
      cedula:"3333333333",
      nombre: "lilianao",
      apellido: "angarita",
      edad: 18,
      telefono:222222222,
      email: "iliana12@gmail.com",
      contraseña:"llllllllll",
      maleta: "3",
      createdAt: { type: Date, default: Date.now },
      status: { type: Number, default: 1 },
    },
  ]
}




export default bd;