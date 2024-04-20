import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChatGraphProps {
  messageContent: string;
}

const ChatGraph: React.FC<ChatGraphProps> = ({ messageContent }) => {
  const [data, setData] = useState<{ name: string, population: number }[]>([]);

  useEffect(() => {
    // Parse population data when component mounts
    parsePopulationData(messageContent);
  }, [messageContent]);

  const parsePopulationData = (content: string) => {
    const startIndex = content.indexOf('| Year |');
    let populationData = content.substring(startIndex);

    // Find the index of the last occurrence of '|'
    const lastIndex = populationData.lastIndexOf('|');

    // Extract the substring before the last '|'
    if (lastIndex !== -1) {
      populationData = populationData.substring(0, lastIndex);
    }

    const rows = populationData.split('\n');
    rows.shift();
    const newData: { name: string, population: number }[] = [];

    // Regular expression to match year and population
    const regex = /\|\s*(\d{4})\s*\|\s*([\d,]+)\s*\|?/;

    rows.forEach((row: string) => {
      const match = row.match(regex);

      if (match && match.length === 3) {
        const year = match[1];
        const population = parseInt(match[2].replace(/,/g, ''));

        newData.push({
          name: year,
          population: population
        });
      }
    });

    setData(newData);
  };

  return (
    <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} margin={{
                top: 30,
                right: 30,
                left: 0,
                bottom: 10,
                }}
                {...{
                overflow: 'visible'
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)} />
            <Bar dataKey="population" fill="#40407a" />
        </BarChart>
    </ResponsiveContainer>
  );
};

export default ChatGraph;