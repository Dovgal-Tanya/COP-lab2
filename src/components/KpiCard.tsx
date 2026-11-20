import React from 'react';

interface KpiCardProps {
    title: string;
    value: string | number;
    trend: string;
    isPositive?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({
                                                    title,
                                                    value,
                                                    trend,
                                                    isPositive = true,
                                                }) => {
    return (
        <div style={cardStyle}>
            <h4 style={{ margin: '0 0 8px 0', color: '#a78bfa', fontSize: '14px', fontWeight: 500 }}>
                {title}
            </h4>
            <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#f3e8ff' }}>
                {value}
            </div>
            <span style={{ color: isPositive ? '#f472b6' : '#f87171', fontSize: '12px', fontWeight: 600 }}>
        {trend}
      </span>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    background: 'rgba(30, 20, 56, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(147, 51, 234, 0.2)',
    borderRadius: '16px',
    padding: '20px',
    flex: '1',
    minWidth: '220px',
    boxShadow: '0 8px 32px rgba(15, 10, 26, 0.3)',
};