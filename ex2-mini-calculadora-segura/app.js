let history = [];

const calculate = (number1, number2, operation) => {

    switch (operation) {

        case "+":
            return number1 + number2;

        case "-":
            return number1 - number2;

        case "*":
            return number1 * number2;

        case "/":
            return number1 / number2;

        default:
            return null;
    }
};

const addToHistory = (operationData) => {

    history.unshift(operationData);

    renderHistory();

    console.log("=== ESTADO DEL HISTORIAL ===");
    console.log(history);
};

const renderHistory = () => {

    const $historyList = $("#historyList");

    $historyList.empty();

    history.forEach((item) => {

        const {
            number1,
            number2,
            operation,
            result
        } = item;

        let symbol = operation;

        if (operation === "*") {
            symbol = "×";
        }

        if (operation === "/") {
            symbol = "÷";
        }

        $historyList.append(`
            <li>
                ${number1} ${symbol} ${number2} = ${result}
            </li>
        `);
    });
};

const showMessage = (message, type) => {

    $("#message")
        .removeClass("error success")
        .addClass(type)
        .text(message);
};

$("#calculatorForm").on("submit", (event) => {

    event.preventDefault();

    const number1Value = $("#number1").val();
    const number2Value = $("#number2").val();
    const operation = $("#operation").val();

    const number1 = Number(number1Value);
    const number2 = Number(number2Value);

    console.log("=== OPERACIÓN SOLICITADA ===");
    console.log("Número 1:", number1Value);
    console.log("Número 2:", number2Value);
    console.log("Operación:", operation);

    if (number1Value === "" || number2Value === "") {

        const errorMessage =
            "Debes ingresar los dos números.";

        showMessage(errorMessage, "error");

        console.error(errorMessage);

        return;
    }

    if (!Number.isFinite(number1) || !Number.isFinite(number2)) {

        const errorMessage =
            "Los valores ingresados deben ser números válidos.";

        showMessage(errorMessage, "error");

        console.error(errorMessage);

        return;
    }

    if (operation === "/" && number2 === 0) {

        const errorMessage =
            "No es posible dividir entre cero.";

        showMessage(errorMessage, "error");

        console.error(errorMessage);

        return;
    }

    const result = calculate(
        number1,
        number2,
        operation
    );

    $("#result").text(result);

    showMessage(
        "Operación realizada correctamente.",
        "success"
    );

    console.log("=== RESULTADO ===");
    console.log("Resultado:", result);

    addToHistory({
        number1,
        number2,
        operation,
        result
    });
});