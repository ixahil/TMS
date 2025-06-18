"use client";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import React from "react";

const Itinerary = ({ title, itinerary }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(28);
    doc.text(`${title} - Itinerary`, 10, 20);

    // Add itinerary items
    let y = 30; // Initial Y-coordinate for the content
    itinerary.forEach((item, idx) => {
      // Add Day label (Heading)
      doc.setFontSize(16);
      doc.text(`${idx + 1}. ${item.label}`, 10, y);

      // Add Description (Formatted Paragraph)
      doc.setFontSize(12);
      const description = doc.splitTextToSize(
        item.description.replace(/<[^>]+>/g, ""),
        180
      ); // Removes HTML tags
      y += 10; // Space below the label
      doc.text(description, 10, y);

      // Add spacing for the next item
      y += description.length * 10 + 10;

      // Check if page overflow happens, then add a new page
      if (y > 270) {
        doc.addPage();
        y = 20; // Reset the Y-coordinate
      }
    });

    // Save PDF
    doc.save(`${title}-Itinerary.pdf`);
  };

  return (
    <div className="my-8">
      <div className="flex justify-between">
        <h3 className="text-2xl mb-4 text-blue-950">Itinerary</h3>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
      <ul className="space-y-4">
        {itinerary.map((item, idx) => {
          return (
            <li
              key={item.label + idx}
              className="p-4 border rounded-lg shadow-md"
            >
              <h4 className="text-xl font-medium mb-2">{item.label}</h4>
              {/* Ensure you're passing an object with the __html property */}
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Itinerary;
