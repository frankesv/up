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
    firstPage.drawText(`Name: ${name}`, { x: 50, y: 700, size: 12 });
    firstPage.drawText(`Email: ${email}`, { x: 50, y: 680, size: 12 });
    firstPage.drawText(`Phone: ${phone}`, { x: 50, y: 660, size: 12 });

    // Generuj plik PDF do pobrania
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated.pdf";
    link.click();
});
