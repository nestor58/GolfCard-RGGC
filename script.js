document.addEventListener('DOMContentLoaded', function() {
    const golpesInputs = document.querySelectorAll('.golpes');
    const subtotalAzulIda = document.getElementById('subtotalAzulIda');
    const subtotalBlancaIda = document.getElementById('subtotalBlancaIda');
    const subtotalRojaIda = document.getElementById('subtotalRojaIda');
    const subtotalGolpesIda = document.getElementById('subtotalGolpesIda');
    const totalAzulVuelta = document.getElementById('totalAzulVuelta');
    const totalBlancaVuelta = document.getElementById('totalBlancaVuelta');
    const totalRojaVuelta = document.getElementById('totalRojaVuelta');
    const totalGolpesVuelta = document.getElementById('totalGolpesVuelta');
    const totalAzulGeneral = document.getElementById('totalAzulGeneral');
    const totalBlancaGeneral = document.getElementById('totalBlancaGeneral');
    const totalRojaGeneral = document.getElementById('totalRojaGeneral');
    const totalGolpesGeneral = document.getElementById('totalGolpesGeneral');
    const totalAzulIdaRepetido = document.getElementById('totalAzulIdaRepetido');
    const totalBlancaIdaRepetido = document.getElementById('totalBlancaIdaRepetido');
    const totalRojaIdaRepetido = document.getElementById('totalRojaIdaRepetido');
    const totalGolpesIdaRepetido = document.getElementById('totalGolpesIdaRepetido');
    const handicapValor = document.getElementById('handicapValor');
    const totalNeto = document.getElementById('totalNeto');
    const handicapInput = document.getElementById('handicap');

    function calcularTotales() {
        let azulIda = 0, blancaIda = 0, rojaIda = 0, golpesIda = 0;
        let azulVuelta = 0, blancaVuelta = 0, rojaVuelta = 0, golpesVuelta = 0;

        document.querySelectorAll('tbody tr').forEach((row, index) => {
            const azulCell = row.querySelector('.azul');
            const blancaCell = row.querySelector('.blanca');
            const rojaCell = row.querySelector('.roja');
            const golpesInput = row.querySelector('.golpes');

            const azul = azulCell ? parseInt(azulCell.textContent) || 0 : 0;
            const blanca = blancaCell ? parseInt(blancaCell.textContent) || 0 : 0;
            const roja = rojaCell ? parseInt(rojaCell.textContent) || 0 : 0;
            const golpes = golpesInput ? parseInt(golpesInput.value) || 0 : 0;

            // Para los hoyos 1-9 (ida)
            if (index <= 9) {
                azulIda += azul;
                blancaIda += blanca;
                rojaIda += roja;
                golpesIda += golpes;
            }

            // Para los hoyos 10-18 (vuelta)
            if (index > 9 && index <= 18) {
                azulVuelta += azul;
                blancaVuelta += blanca;
                rojaVuelta += roja;
                golpesVuelta += golpes;
            }
        });

        // Actualizar los subtotales de ida
        if (subtotalAzulIda) subtotalAzulIda.textContent = azulIda;
        if (subtotalBlancaIda) subtotalBlancaIda.textContent = blancaIda;
        if (subtotalRojaIda) subtotalRojaIda.textContent = rojaIda;
        if (subtotalGolpesIda) subtotalGolpesIda.textContent = golpesIda;

        // Actualizar los resultados de ida repetidos (después de la vuelta)
        if (totalAzulIdaRepetido) totalAzulIdaRepetido.textContent = azulIda;
        if (totalBlancaIdaRepetido) totalBlancaIdaRepetido.textContent = blancaIda;
        if (totalRojaIdaRepetido) totalRojaIdaRepetido.textContent = rojaIda;
        if (totalGolpesIdaRepetido) totalGolpesIdaRepetido.textContent = golpesIda;

        // Actualizar los totales de vuelta
        if (totalAzulVuelta) totalAzulVuelta.textContent = azulVuelta;
        if (totalBlancaVuelta) totalBlancaVuelta.textContent = blancaVuelta;
        if (totalRojaVuelta) totalRojaVuelta.textContent = rojaVuelta;
        if (totalGolpesVuelta) totalGolpesVuelta.textContent = golpesVuelta;

        // Calcular y mostrar el total general (ida + vuelta)
        if (totalAzulGeneral) totalAzulGeneral.textContent = azulIda + azulVuelta;
        if (totalBlancaGeneral) totalBlancaGeneral.textContent = blancaIda + blancaVuelta;
        if (totalRojaGeneral) totalRojaGeneral.textContent = rojaIda + rojaVuelta;
        if (totalGolpesGeneral) totalGolpesGeneral.textContent = golpesIda + golpesVuelta;

        // Mostrar el valor del handicap
        const handicap = parseInt(handicapInput.value) || 0;
        if (handicapValor) handicapValor.textContent = handicap;

        // Calcular y mostrar el total neto (total general - handicap)
        if (totalNeto) totalNeto.textContent = (parseInt(totalGolpesGeneral.textContent) || 0) - handicap;
    }

    // Calcular cuando los golpes o el handicap cambian
    golpesInputs.forEach(input => {
        input.addEventListener('input', calcularTotales);
    });

    handicapInput.addEventListener('input', calcularTotales);

    calcularTotales();  // Calcular totales al cargar la página por primera vez
});
