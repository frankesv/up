document.getElementById("pdf-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Wczytaj szablon PDF
    const url = "template.pdf";
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Utwórz nowy dokument PDF
    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

    // Edytuj dokument
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    firstPage.drawText(`${name}`, { x: 138, y: 635, size: 15 });
    firstPage.drawText(`${email}`, { x: 90, y: 609, size: 15 });
    firstPage.drawText(`${phone}`, { x: 165, y: 587, size: 15 });

    // Generuj plik PDF do pobrania
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated.pdf";
    link.click();
});
