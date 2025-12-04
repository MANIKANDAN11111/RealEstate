// import React from 'react';
// import './StatsCard.css';

// interface StatsCardProps {
//   title: string;
//   value: string;
//   change: string;
//   changeType: 'positive' | 'negative';
//   icon: string;
// }

// const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon }) => {
//   return (
//     <div className="stats-card">
//       <div className="stats-icon">
//         {icon}
//       </div>
//       <div className="stats-content">
//         <h3 className="stats-title">{title}</h3>
//         <div className="stats-value-container">
//           <span className="stats-value">{value}</span>
//           <span className={`stats-change ${changeType}`}>
//             {changeType === 'positive' ? '↑' : '↓'} {change}
//           </span>
//         </div>
//         <p className="stats-period">this month</p>
//       </div>
//     </div>
//   );
// };

// export default StatsCard;