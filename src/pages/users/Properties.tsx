
// import { ArrowLeft } from 'lucide-react';

// interface PropertiesProps {
//   onNavigate: (page: string) => void;
// }

// export default function Properties({ onNavigate }: PropertiesProps) {
//   const allProperties = [
//     {
//       id: 1,
//       image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹1.2 Cr',
//       title: 'Luxury Villa with Garden',
//       location: 'Anna Nagar, Chennai',
//       beds: 4,
//       baths: 3,
//       sqft: 2400,
//       type: 'sale' as const,
//       featured: true,
//     },
//     {
//       id: 2,
//       image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹45,000/mo',
//       title: 'Modern Apartment Downtown',
//       location: 'T. Nagar, Chennai',
//       beds: 2,
//       baths: 2,
//       sqft: 1200,
//       type: 'rent' as const,
//     },
//     {
//       id: 3,
//       image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹85 Lakhs',
//       title: 'Spacious Family Home',
//       location: 'Saravanampatti, Coimbatore',
//       beds: 3,
//       baths: 2,
//       sqft: 1800,
//       type: 'sale' as const,
//     },
//     {
//       id: 4,
//       image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹1.8 Cr',
//       title: 'Beachfront Villa',
//       location: 'ECR, Chennai',
//       beds: 5,
//       baths: 4,
//       sqft: 3200,
//       type: 'sale' as const,
//       featured: true,
//     },
//     {
//       id: 5,
//       image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹60,000/mo',
//       title: 'Premium Penthouse',
//       location: 'Velachery, Chennai',
//       beds: 3,
//       baths: 3,
//       sqft: 2000,
//       type: 'rent' as const,
//     },
//     {
//       id: 6,
//       image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹95 Lakhs',
//       title: 'Contemporary Townhouse',
//       location: 'Gandhipuram, Coimbatore',
//       beds: 3,
//       baths: 2,
//       sqft: 1650,
//       type: 'sale' as const,
//     },
//     {
//       id: 7,
//       image: 'https://images.pexels.com/photos/1545749/pexels-photo-1545749.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹1.5 Cr',
//       title: 'Elegant Bungalow',
//       location: 'Adyar, Chennai',
//       beds: 4,
//       baths: 3,
//       sqft: 2800,
//       type: 'sale' as const,
//     },
//     {
//       id: 8,
//       image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹35,000/mo',
//       title: 'Cozy Studio Apartment',
//       location: 'Porur, Chennai',
//       beds: 1,
//       baths: 1,
//       sqft: 650,
//       type: 'rent' as const,
//     },
//     {
//       id: 9,
//       image: 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
//       price: '₹72 Lakhs',
//       title: 'Garden View Apartment',
//       location: 'RS Puram, Coimbatore',
//       beds: 2,
//       baths: 2,
//       sqft: 1350,
//       type: 'sale' as const,
//     },
//   ];

//   return (
//     <div className="page properties-page">
//       <div className="page-header">
//         <button onClick={() => onNavigate('home')} className="back-button">
//           <ArrowLeft className="back-icon" />
//           <span>Back to Home</span>
//         </button>
//         <h1 className="page-title">All Properties</h1>
//         <p className="page-subtitle">Browse through our complete collection of properties</p>
//       </div>

//       <div className="properties-grid">
//         {allProperties.map((property) => (
//           <PropertyCard key={property.id} {...property} />
//         ))}
//       </div>
//     </div>
//   );
// }
