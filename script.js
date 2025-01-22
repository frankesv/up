document.getElementById("pdf-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const PESEL = document.getElementById("PESEL").value;
    const phone = document.getElementById("phone").value;

    // Walidacja PESEL - sprawdzamy, czy PESEL ma 11 cyfr
    if (!/^\d{11}$/.test(PESEL)) {
        alert("Numer PESEL musi składać się z dokładnie 11 cyfr.");
        return;  // Zatrzymujemy wykonanie skryptu, jeśli walidacja nie przejdzie
    }

    // Wczytaj szablon PDF
    const url = "template.pdf";
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Utwórz nowy dokument PDF
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    // Edytuj dokument
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    firstPage.drawText(`${name}`, { x: 138, y: 625, size: 15 });
    firstPage.drawText(`${PESEL}`, { x: 90, y: 602, size: 15 });
    firstPage.drawText(`${phone}`, { x: 165, y: 577, size: 15 });

    // Generuj plik PDF do pobrania
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    
    // Ustaw nazwę pliku na numer PESEL
    link.download = `${PESEL}.pdf`;
    link.click();
});
