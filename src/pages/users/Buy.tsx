

// export default function Buy() {
//   const buyProperties = [
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
//     <div className="page buy-page">
//       <div className="page-header-with-search">
//         <h1 className="page-title">Properties for Sale</h1>
//         <p className="page-subtitle">Find your perfect home from our exclusive listings</p>
//       </div>

//       <SearchBar />

//       <div className="properties-grid">
//         {buyProperties.map((property) => (
//           <PropertyCard key={property.id} {...property} />
//         ))}
//       </div>
//     </div>
//   );
// }
