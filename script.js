<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF Generator</title>
    <!-- Dodanie fontkit -->
    <script src="https://cdn.jsdelivr.net/npm/fontkit@1.8.0/dist/fontkit.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js"></script>
</head>
<body>
    <form id="pdf-form">
        <!-- Główne pola -->
        <label>
            Imię i Nazwisko:
            <input type="text" id="name" required>
        </label><br>
        <label>
            PESEL:
            <input type="text" id="PESEL" pattern="^\d{11}$" maxlength="11" required>
        </label><br>
        <label>
            Numer telefonu:
            <input type="text" id="phone" required>
        </label><br>

        <!-- Data dzisiejsza -->
        <label>
            Data:
            <input type="text" id="date" value="" readonly>
        </label><br>

        <!-- Dodatkowe pola -->
        <h3>Dodatkowe informacje:</h3>
        <label>
            Pole dodatkowe 1:
            <input type="text" id="extra1">
        </label><br>
        <label>
            Pole dodatkowe 2:
            <input type="text" id="extra2">
        </label><br>

        <!-- Adres zamieszkania -->
        <label>
            Adres zamieszkania:
            <input type="text" id="address">
        </label><br>

        <button type="submit">Generuj PDF</button>
    </form>

    <script>
        // Zainstalowanie fontkit w PDFLib
        const fontkit = window.fontkit;

        // Rejestracja fontkit w PDFLib
        PDFLib.PDFDocument.registerFontkit(fontkit);

        // Ustawienie bieżącej daty (w Polsce)
        const date = new Date();
        const formattedDate = date.toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
        document.getElementById("date").value = formattedDate;

        // Funkcja generująca PDF
        document.getElementById("pdf-form").addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const PESEL = document.getElementById("PESEL").value;
            const phone = document.getElementById("phone").value;
            const date = document.getElementById("date").value;
            const extra1 = document.getElementById("extra1").value;
            const extra2 = document.getElementById("extra2").value;
            const address = document.getElementById("address").value;

            // Wczytaj szablon PDF
            const url = "template.pdf"; // Zmien ścieżkę do swojego szablonu
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

            // Utwórz nowy dokument PDF
            const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

            // Załaduj czcionkę (w tym samym folderze, w którym jest HTML)
            const fontUrl = "https://github.com/frankesv/up/blob/main/DejaVuSans.ttf"; // Zmień jeśli Twoja czcionka jest w innym folderze
            const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
            const font = await pdfDoc.embedFont(fontBytes);

            // Edytuj dokument (pierwsza strona)
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            // Wstawienie danych do odpowiednich miejsc
            firstPage.drawText(`${name}`, { x: 140, y: 623, size: 15, font: font });
            firstPage.drawText(`${PESEL}`, { x: 90, y: 599, size: 15, font: font });
            firstPage.drawText(`${phone}`, { x: 230, y: 551, size: 15, font: font });
            firstPage.drawText(`${date}`, { x: 420, y: 802, size: 15, font: font });
            firstPage.drawText(`${extra1}`, { x: 142, y: 476, size: 15, font: font });
            firstPage.drawText(`${extra2}`, { x: 91, y: 451, size: 15, font: font });
            firstPage.drawText(`${address}`, { x: 165, y: 576, size: 15, font: font });

            // Generowanie pliku PDF do pobrania
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);

            // Ustawienie nazwy pliku na numer PESEL
            link.download = `${PESEL}.pdf`;
            link.click();
        });
    </script>
</body>
</html>
