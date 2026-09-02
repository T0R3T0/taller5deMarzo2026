const API_URL = "https://jsonplaceholder.typicode.com/users"; 

let users = []; // Se almacenan los usuarios cargados desde la API

/**
 * Carga los usuarios desde la API.
 */
const loadUsers = async () => {
    try {

        // Usuarios en español
        users = [
            {
                id: 1,
                name: "Juan Pérez",
                username: "juanperez",
                email: "juan.perez@correo.com",
                phone: "300-123-4567",
                address: {
                    street: "Calle 10",
                    suite: "Apto 201",
                    city: "Medellín",
                    zipcode: "050001"
                },
                company: {
                    name: "Tecnología Andina"
                }
            },
            {
                id: 2,
                name: "María González",
                username: "mariagonzalez",
                email: "maria.gonzalez@correo.com",
                phone: "301-234-5678",
                address: {
                    street: "Carrera 43",
                    suite: "Apto 302",
                    city: "Bogotá",
                    zipcode: "110001"
                },
                company: {
                    name: "Soluciones Digitales"
                }
            },
            {
                id: 3,
                name: "Carlos Rodríguez",
                username: "carlosrodriguez",
                email: "carlos.rodriguez@correo.com",
                phone: "302-345-6789",
                address: {
                    street: "Calle 45",
                    suite: "Casa 15",
                    city: "Cali",
                    zipcode: "760001"
                },
                company: {
                    name: "Innovación Colombiana"
                }
            },
            {
                id: 4,
                name: "Ana Martínez",
                username: "anamartinez",
                email: "ana.martinez@correo.com",
                phone: "303-456-7890",
                address: {
                    street: "Carrera 7",
                    suite: "Apto 405",
                    city: "Barranquilla",
                    zipcode: "080001"
                },
                company: {
                    name: "Grupo Empresarial Caribe"
                }
            },
            {
                id: 5,
                name: "Luis Hernández",
                username: "luishernandez",
                email: "luis.hernandez@correo.com",
                phone: "304-567-8901",
                address: {
                    street: "Calle 80",
                    suite: "Apto 501",
                    city: "Cartagena",
                    zipcode: "130001"
                },
                company: {
                    name: "Servicios del Caribe"
                }
            },
            {
                id: 6,
                name: "Sofía Ramírez",
                username: "sofiaramirez",
                email: "sofia.ramirez@correo.com",
                phone: "305-678-9012",
                address: {
                    street: "Carrera 33",
                    suite: "Apto 602",
                    city: "Bucaramanga",
                    zipcode: "680001"
                },
                company: {
                    name: "Ramírez Consultores"
                }
            },
            {
                id: 7,
                name: "Diego Torres",
                username: "diegotorres",
                email: "diego.torres@correo.com",
                phone: "306-789-0123",
                address: {
                    street: "Calle 20",
                    suite: "Casa 8",
                    city: "Pereira",
                    zipcode: "660001"
                },
                company: {
                    name: "Desarrollo Tecnológico"
                }
            },
            {
                id: 8,
                name: "Valentina Castro",
                username: "valentinacastro",
                email: "valentina.castro@correo.com",
                phone: "307-890-1234",
                address: {
                    street: "Carrera 15",
                    suite: "Apto 703",
                    city: "Manizales",
                    zipcode: "170001"
                },
                company: {
                    name: "Creativos Digitales"
                }
            },
            {
                id: 9,
                name: "Andrés Morales",
                username: "andresmorales",
                email: "andres.morales@correo.com",
                phone: "308-901-2345",
                address: {
                    street: "Calle 12",
                    suite: "Apto 804",
                    city: "Santa Marta",
                    zipcode: "470001"
                },
                company: {
                    name: "Comercializadora Nacional"
                }
            },
            {
                id: 10,
                name: "Camila Vargas",
                username: "camilavargas",
                email: "camila.vargas@correo.com",
                phone: "309-012-3456",
                address: {
                    street: "Carrera 52",
                    suite: "Apto 905",
                    city: "Armenia",
                    zipcode: "630001"
                },
                company: {
                    name: "Vargas y Asociados"
                }
            }
        ];

        // Log de cantidad de usuarios y primera fila
        console.log("=== CARGA DE USUARIOS ===");
        console.log("Cantidad de usuarios:", users.length);
        console.log("Primera fila:", users[0]);

        renderUsers(users);

    } catch (error) {
        console.error("Error al cargar los usuarios:", error);

        $("#usersTableBody").html(`
            <tr>
                <td colspan="3" class="error">
                    No fue posible cargar los usuarios.
                </td>
            </tr>
        `);
    }
};

/**
 * Renderiza los usuarios dentro de la tabla.
 */
const renderUsers = (usersToRender) => {
    const $tableBody = $("#usersTableBody");

    $tableBody.empty();

    if (usersToRender.length === 0) {
        $tableBody.html(`
            <tr>
                <td colspan="3">
                    No se encontraron usuarios.
                </td>
            </tr>
        `);
        return;
    }

    usersToRender.forEach((user) => {
        const { name, email, company } = user;

        const row = `
            <tr class="user-row" data-user-id="${user.id}">
                <td>${name}</td>
                <td>${email}</td>
                <td>${company.name}</td>
            </tr>
        `;

        $tableBody.append(row);
    });
};

/**
 * Filtra usuarios por nombre.
 */
const filterUsers = (searchTerm) => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(normalizedTerm)
    );

    console.log("=== FILTRO ===");
    console.log("Término utilizado:", searchTerm);
    console.log("Cantidad de coincidencias:", filteredUsers.length);

    renderUsers(filteredUsers);
};

/**
 * Muestra el detalle de un usuario.
 */
const showUserDetail = (user) => {

    const {
        name,
        username,
        email,
        phone,
        address
    } = user;

    const {
        street,
        suite,
        city,
        zipcode
    } = address;

    $("#detailContent").html(`
        <p><strong>Nombre:</strong> ${name}</p>

        <p><strong>Usuario:</strong> ${username}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Teléfono:</strong> ${phone}</p>

        <p>
            <strong>Dirección:</strong>
            ${street}, ${suite}, ${city}, ${zipcode}
        </p>
    `);

    $("#userDetail").removeClass("hidden");

    console.log("=== USUARIO SELECCIONADO ===");
    console.log("Detalle del usuario:", user);
};

/**
 * Eventos de la interfaz.
 */
$(document).ready(() => {

    loadUsers();

    $("#searchInput").on("input", (event) => {
        filterUsers(event.target.value);
    });

    $("#usersTableBody").on("click", ".user-row", (event) => {

        const userId = Number($(event.currentTarget).data("user-id"));

        const selectedUser = users.find(
            (user) => user.id === userId
        );

        if (selectedUser) {
            showUserDetail(selectedUser);
        }
    });

    $("#closeDetail").on("click", () => {
        $("#userDetail").addClass("hidden");
    });
});