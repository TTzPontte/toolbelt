import React, { useEffect, useState } from 'react';
import getRecordsByMonth from './helpers';
import { PredictusReport } from '../../../models';
import "./style.scss"
const RecordCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {

      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 7);
      const results = await getRecordsByMonth(PredictusReport, formattedDate);

      setCount(results.length);
    };

    fetchCount();
  }, []);

  return (
    <div className='recordCounter'>
      <h2>Registros deste mês: {count}</h2>
    </div>
  );
};

export default RecordCounter;