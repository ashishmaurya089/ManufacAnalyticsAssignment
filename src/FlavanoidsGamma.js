import React, { useState, useEffect } from "react";

const FlavanoidsGamma = (props) => {
  const [winesData, setWinesData] = useState([]);

  // All calculate method name in which we have to calculate
  const measureSet = ["Mean", "Median", "Mode"];

  useEffect(() => {
    //Store Data of wines coming from App.js
    setWinesData(props.winedata);
  }, []);

  const calculateSta = (property, event, method) => {
    const classData = winesData.filter((entry) => entry.Alcohol === event);
    const values = classData.map((entry) => entry[property]);

    switch (method) {
      case "Mean":
        // Mean Formula Mean = (Sum of all the data / Total number of data)
        return values.reduce((acc, value) => acc + value, 0) / values.length;

      case "Median":
        // Sort data increasing order. Count the number data. If data is uneven add num 1 in that and divide by 2  **(n+1)/2**
        values.sort((a, b) => a - b);

        // (n+1)/2
        const middle = Math.floor(values.length / 2);
        return values.length % 2 === 0
          ? (values[middle - 1] + values[middle]) / 2
          : values[middle];

      case "Mode":
        // count of value appears most in dataset
        const counts = {};
        values.forEach((value) => (counts[value] = (counts[value] || 0) + 1));
        let mode;
        let max_count = 0;
        for (const key in counts) {
          if (counts[key] > max_count) {
            mode = key;
            max_count = counts[key];
          }
        }
        return mode;
      default:
        return null;
    }
  };

  const showTable = (property) => {
    const uniqueClasses = Array.from(
      new Set(winesData.map((entry) => entry.Alcohol))
    );

    return (
      <table key={property}>
        <thead>
          <tr>
            <th className="textalignStart">Measure-Data</th>
            {uniqueClasses.map((event) => (
              <th key={event}>Class {event}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measureSet.map((method) => (
            <tr key={method}>
              <td className="spaceRight">
                {property} {method}
              </td>
              {uniqueClasses.map((event) => (
                <td key={event} className="sRL">
                  {parseFloat(calculateSta(property, event, method)).toFixed(3)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // As a given Task Gamma can be calculated as Gamma = (Ash * Hue) / Magnesium
  const calculateGamma = (entry) => (entry.Ash * entry.Hue) / entry.Magnesium;

  // Calculate Gamma for each point in data
  winesData.forEach((entry) => {
    entry.Gamma = calculateGamma(entry);
  });

  return (
    <div>
      <h2 className="">Wine Data - Flavanoids</h2>
      {showTable("Flavanoids")}

      <h2 className="mt-3">Wine Data - Gamma</h2>
      {showTable("Gamma")}
    </div>
  );
};

export default FlavanoidsGamma;
