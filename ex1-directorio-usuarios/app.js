const API_URL = "https://jsonplaceholder.typicode.com/users";

let users = [];

/**
 * Carga los usuarios desde la API.
 */
const loadUsers = async () => {
    try {
        const response = await axios.get(API_URL);

        users = response.data;

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

        const selectedUser = users.find((user) => user.id === userId);

        if (selectedUser) {
            showUserDetail(selectedUser);
        }
    });

    $("#closeDetail").on("click", () => {
        $("#userDetail").addClass("hidden");
    });
});