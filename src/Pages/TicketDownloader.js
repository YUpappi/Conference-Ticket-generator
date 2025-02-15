import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function ticketDownloader() {
  // Get the HTML element
  const element = document.getElementById("ticket-template");
  if (!element) {
    console.error("Ticket template not found.");
    return;
  }
  // Convert the HTML to a canvas
  html2canvas(element, { useCORS: true }).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imageWidth = pageWidth;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;
    let heightLeft = imageHeight;
    let position = 0;

    pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imageHeight;
      pdf.addPage();
      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);
      heightLeft -= pageHeight;
    }
    pdf.save("conference-ticket.pdf");
  });
}
