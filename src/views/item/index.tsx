import React from 'react';
import { useParams } from 'react-router-dom';

export default function Item() {
  let params = useParams();
  return <h2>Invoice: {params.id}</h2>;
}

