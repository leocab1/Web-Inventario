import React from 'react';
import QRCode from 'react-qr-code';

const QR = ({ value }) => {
  return <QRCode value={value} size={128} />;
};

export default QR; // Asegúrate de que esto esté presente
