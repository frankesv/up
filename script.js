import { PDFDocument } from 'https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js';

document.getElementById('pdf-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pobierz wartości z formularza
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Pobierz szablon PDF
    const existingPdfBytes = await fetch('template.pdf').then((res) =>
        res.arrayBuffer()
    );

    // Załaduj PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Pobierz pola formularza
    const form = pdfDoc.getForm();
    form.getTextField('nameField').setText(name);
    form.getTextField('emailField').setText(email);
    form.getTextField('phoneField').setText(phone);

    // Pobierz zaktualizowany PDF
    const pdfBytes = await pdfDoc.save();

    // Pobierz plik na komputer użytkownika
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filled-form.pdf';
    link.click();
});
