import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

export default function DownloadFile() {
  const [href, setHref] = useState("");

  async function downloadFile() {
    try {
      const response = await axios.get(
        "https://expense-tracker-fire-default-rtdb.firebaseio.com/expenses.json"
      );
      const csvBlob = new Blob([makeCSV(response.data)], { type: "text/csv" });
      setHref(URL.createObjectURL(csvBlob));
    } catch (error) {
      console.log(error);
    }
  }

  function makeCSV(data) {
    const csvContent = [];

    // Add header
    const header = ["id", "amount", "category", "description"];
    csvContent.push(header.join(","));

    // Add data rows
    Object.keys(data).forEach((id) => {
      const row = [id, data[id].amount, data[id].category, data[id].description];
      csvContent.push(row.join(","));
    });

    return csvContent.join("\n");
  }

  return (
    <a href={href} download={"expenses.csv"}>
      <Button onClick={downloadFile} size={"sm"}>
        Download File
      </Button>
    </a>
  );
}
