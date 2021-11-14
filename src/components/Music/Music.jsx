import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import s from './Music.module.css';

const Music = () => {
  const data = {
  datasets: [{
    data: [10, 20, 30],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)', 'black', 'rgba(255, 206, 86, 0.2)'
    ],
    borderWidth: 10,
    weight: 500
}],
labels: [
  'Red',
  'Yellow',
  'Blue'
],
}



  return (
    <Doughnut options={{cutoutPercentage: 70}} width={100}
    height={50} data={data} />
  );

};

export default Music;
