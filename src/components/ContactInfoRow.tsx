import React from 'react';

interface ContactInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
}

function ContactInfoRow({ icon, label, value, sub }: ContactInfoRowProps) {
  return (
    <div className="ct-row">
      <div className="ct-ic">{icon}</div>
      <div>
        <div className="cl">{label}</div>
        <div className="cv">{value}</div>
        {sub && <div className="cs">{sub}</div>}
      </div>
    </div>
  );
}

export default ContactInfoRow;
