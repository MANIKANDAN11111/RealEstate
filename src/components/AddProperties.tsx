import { useState, useRef } from 'react';
import './AddProperties.css';

// Tamil Nadu districts array
const tamilNaduDistricts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

// Property categories based on type
const propertyCategories = {
  land: [
    { value: 'residential-plot', label: 'Residential Plot' },
    { value: 'farm-land', label: 'Farm Land' },
    { value: 'commercial-plot', label: 'Commercial Plot' }
  ],
  residential: [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'independent-house', label: 'Independent House' }
  ],
  commercial: [
    { value: 'warehouse', label: 'Warehouse' },
    { value: 'retail-shop', label: 'Retail Shop' },
    { value: 'office-space', label: 'Office Space' },
    { value: 'hospitality', label: 'Hospitality (Hotels/Resorts)' },
    { value: 'industries', label: 'Industries (Manufacturing, Factory)' }
  ]
};

// Sub-categories for each main category
const propertySubCategories: Record<string, string[]> = {
  'apartment': [
    'Studio',
    '1 BHK',
    '2 BHK',
    '3 BHK',
    '4 BHK',
    'Penthouse',
    'Duplex'
  ],
  'villa': [
    'Independent Villa',
    'Row House',
    'Gated Community Villa',
    'Farm House'
  ],
  'independent-house': [
    'Single Floor',
    'Double Floor',
    'Multi-story',
    'Bungalow'
  ],
  'residential-plot': [
    'Corner Plot',
    'Gated Community Plot',
    'Open Plot',
    'NA Plot',
    'Approved Layout Plot'
  ],
  'farm-land': [
    'Agricultural Land',
    'Plantation Land',
    'Fruits Farm Land',
    'Farm House Land',
    'Orchard Land'
  ],
  'commercial-plot': [
    'Commercial Plot',
    'IT Park Plot',
    'Industrial Plot',
    'Mixed Use Plot'
  ],
  'warehouse': [
    'Industrial Warehouse',
    'Cold Storage',
    'Logistics Warehouse',
    'Godown',
    'Storage Shed'
  ],
  'retail-shop': [
    'Street Facing Shop',
    'Mall Shop',
    'Showroom',
    'Corner Shop',
    'Commercial Complex Shop'
  ],
  'office-space': [
    'Co-working Space',
    'Corporate Office',
    'IT Park Office',
    'Business Center',
    'Commercial Building Floor'
  ],
  'hospitality': [
    'Hotel',
    'Resort',
    'Service Apartment',
    'Guest House',
    'Motel'
  ],
  'industries': [
    'Manufacturing Unit',
    'Factory',
    'Industrial Shed',
    'Workshop',
    'Processing Unit'
  ]
};

interface PropertyDetailField {
  type: 'select' | 'number' | 'text' | 'checkbox';
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
  min?: number;
  step?: number;
}

interface PropertyDetailsConfig {
  mandatory: PropertyDetailField[];
  optional: PropertyDetailField[];
}

interface PropertyDetailsType {
  [key: string]: PropertyDetailsConfig;
}

// Property details configuration for each category
const propertyDetailsConfig: PropertyDetailsType = {
  'residential-plot': {
    mandatory: [
      { type: 'select', label: 'Facing', name: 'facing', options: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] },
      { type: 'number', label: 'Plot Area (in Sq. Ft.)', name: 'plotArea', placeholder: 'Enter plot area', min: 0 },
      { type: 'text', label: 'Dimensions (Length x Width)', name: 'dimensions', placeholder: 'e.g., 60x40 ft' },
      { type: 'select', label: 'Soil Type', name: 'soilType', options: ['Red Soil', 'Black Soil', 'Alluvial Soil', 'Laterite Soil', 'Sandy Soil'] },
      { type: 'number', label: 'Road Width (in Feet)', name: 'roadWidth', placeholder: 'Road width in front', min: 0 }
    ],
    optional: [
      { type: 'number', label: 'Number of Openings', name: 'openings', placeholder: 'Number of road openings', min: 0 },
      { type: 'checkbox', label: 'Corner Plot', name: 'cornerPlot' },
      { type: 'checkbox', label: 'Approved Layout', name: 'approvedLayout' },
      { type: 'checkbox', label: 'Has Old Buildings', name: 'hasOldBuildings' },
      { type: 'text', label: 'Survey Number', name: 'surveyNumber', placeholder: 'Survey number if any' },
      { type: 'text', label: 'Patta Number', name: 'pattaNumber', placeholder: 'Patta number if any' },
      { type: 'checkbox', label: 'Water Connection Available', name: 'waterConnection' },
      { type: 'checkbox', label: 'Electricity Connection Available', name: 'electricityConnection' },
      { type: 'select', label: 'Plot Type', name: 'plotType', options: ['Residential', 'Mixed Use', 'Commercial'] }
    ]
  },
  
  'farm-land': {
    mandatory: [
      { type: 'number', label: 'Total Land Area (in Acres)', name: 'totalArea', placeholder: 'Enter land area in acres', min: 0, step: 0.01 },
      { type: 'select', label: 'Land Type', name: 'landType', options: ['Agricultural', 'Plantation', 'Orchard', 'Barren', 'Cultivable'] },
      { type: 'select', label: 'Water Source', name: 'waterSource', options: ['Borewell', 'Well', 'Canal', 'River', 'Rain-fed'] },
      { type: 'number', label: 'Number of Wells/Borewells', name: 'wellsCount', placeholder: 'Number of water sources', min: 0 },
      { type: 'select', label: 'Soil Type', name: 'soilType', options: ['Red Soil', 'Black Soil', 'Alluvial Soil', 'Laterite Soil', 'Sandy Soil', 'Clay Soil'] }
    ],
    optional: [
      { type: 'checkbox', label: 'Has Farm House', name: 'hasFarmHouse' },
      { type: 'checkbox', label: 'Has Irrigation Facilities', name: 'hasIrrigation' },
      { type: 'checkbox', label: 'Has Fencing', name: 'hasFencing' },
      { type: 'text', label: 'Current Crop', name: 'currentCrop', placeholder: 'Current crop if any' },
      { type: 'text', label: 'Fruit Trees', name: 'fruitTrees', placeholder: 'Types of fruit trees' },
      { type: 'number', label: 'Distance from Main Road (in km)', name: 'distanceFromRoad', placeholder: 'Distance from main road', min: 0, step: 0.1 },
      { type: 'checkbox', label: 'Electricity Available', name: 'electricityAvailable' },
      { type: 'text', label: 'Survey Number', name: 'surveyNumber', placeholder: 'Survey number' },
      { type: 'text', label: 'Patta Number', name: 'pattaNumber', placeholder: 'Patta number' }
    ]
  },
  
  'commercial-plot': {
    mandatory: [
      { type: 'number', label: 'Plot Area (in Sq. Ft.)', name: 'plotArea', placeholder: 'Enter plot area', min: 0 },
      { type: 'select', label: 'Facing', name: 'facing', options: ['Main Road', 'Highway', 'Commercial Street', 'Industrial Area'] },
      { type: 'number', label: 'Road Width (in Feet)', name: 'roadWidth', placeholder: 'Road width in front', min: 0 },
      { type: 'number', label: 'FAR Permitted', name: 'farPermitted', placeholder: 'Floor Area Ratio', min: 0, step: 0.1 }
    ],
    optional: [
      { type: 'checkbox', label: 'Corner Plot', name: 'cornerPlot' },
      { type: 'checkbox', label: 'Has Old Structures', name: 'hasOldStructures' },
      { type: 'select', label: 'Zoning Type', name: 'zoningType', options: ['Commercial', 'Industrial', 'Mixed Use', 'IT Park'] },
      { type: 'checkbox', label: 'Water Connection Available', name: 'waterConnection' },
      { type: 'checkbox', label: 'Electricity Connection Available', name: 'electricityConnection' },
      { type: 'number', label: 'Number of Openings', name: 'openings', placeholder: 'Number of road openings', min: 0 }
    ]
  },
  
  'apartment': {
    mandatory: [
      { type: 'select', label: 'Floor Number', name: 'floorNumber', options: Array.from({length: 50}, (_, i) => (i + 1).toString()) },
      { type: 'select', label: 'Total Floors', name: 'totalFloors', options: Array.from({length: 50}, (_, i) => (i + 1).toString()) },
      { type: 'select', label: 'Facing', name: 'facing', options: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] },
      { type: 'number', label: 'Super Built-up Area (Sq. Ft.)', name: 'superBuiltUpArea', placeholder: 'Super built-up area', min: 0 },
      { type: 'number', label: 'Carpet Area (Sq. Ft.)', name: 'carpetArea', placeholder: 'Carpet area', min: 0 }
    ],
    optional: [
      { type: 'checkbox', label: 'Corner Apartment', name: 'cornerApartment' },
      { type: 'number', label: 'Balcony Count', name: 'balconyCount', placeholder: 'Number of balconies', min: 0 },
      { type: 'checkbox', label: 'Power Backup', name: 'powerBackup' },
      { type: 'checkbox', label: 'Lift Available', name: 'liftAvailable' },
      { type: 'select', label: 'Age of Property', name: 'propertyAge', options: ['New', '1-5 years', '5-10 years', '10-20 years', '20+ years'] }
    ]
  },
  
  'villa': {
    mandatory: [
      { type: 'number', label: 'Plot Area (in Sq. Ft.)', name: 'plotArea', placeholder: 'Plot area', min: 0 },
      { type: 'number', label: 'Built-up Area (Sq. Ft.)', name: 'builtUpArea', placeholder: 'Built-up area', min: 0 },
      { type: 'select', label: 'Facing', name: 'facing', options: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] },
      { type: 'number', label: 'Number of Floors', name: 'floorsCount', placeholder: 'Number of floors', min: 0 },
      { type: 'select', label: 'Compound Wall', name: 'compoundWall', options: ['Yes', 'No', 'Partial'] }
    ],
    optional: [
      { type: 'checkbox', label: 'Swimming Pool', name: 'swimmingPool' },
      { type: 'checkbox', label: 'Private Garden', name: 'privateGarden' },
      { type: 'checkbox', label: 'Servant Quarter', name: 'servantQuarter' },
      { type: 'number', label: 'Car Parking Count', name: 'carParkingCount', placeholder: 'Number of car parking', min: 0 },
      { type: 'checkbox', label: 'Security System', name: 'securitySystem' }
    ]
  },
  
  'independent-house': {
    mandatory: [
      { type: 'number', label: 'Plot Area (in Sq. Ft.)', name: 'plotArea', placeholder: 'Plot area', min: 0 },
      { type: 'number', label: 'Built-up Area (Sq. Ft.)', name: 'builtUpArea', placeholder: 'Built-up area', min: 0 },
      { type: 'select', label: 'Facing', name: 'facing', options: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'] },
      { type: 'select', label: 'House Type', name: 'houseType', options: ['Independent', 'Row House', 'Gated Community'] },
      { type: 'select', label: 'Compound Wall', name: 'compoundWall', options: ['Yes', 'No', 'Partial'] }
    ],
    optional: [
      { type: 'checkbox', label: 'Separate Pooja Room', name: 'poojaRoom' },
      { type: 'checkbox', label: 'Study Room', name: 'studyRoom' },
      { type: 'number', label: 'Store Room Count', name: 'storeRoomCount', placeholder: 'Number of store rooms', min: 0 },
      { type: 'checkbox', label: 'Separate Dining Area', name: 'separateDining' },
      { type: 'select', label: 'Age of Property', name: 'propertyAge', options: ['New', '1-5 years', '5-10 years', '10-20 years', '20+ years'] }
    ]
  },
  
  'warehouse': {
    mandatory: [
      { type: 'number', label: 'Total Area (Sq. Ft.)', name: 'totalArea', placeholder: 'Total area', min: 0 },
      { type: 'number', label: 'Clear Height (in Feet)', name: 'clearHeight', placeholder: 'Clear height inside', min: 0 },
      { type: 'select', label: 'Type', name: 'warehouseType', options: ['Industrial', 'Cold Storage', 'Logistics', 'Godown'] },
      { type: 'checkbox', label: 'Loading Dock Available', name: 'loadingDock' },
      { type: 'checkbox', label: 'Fire Safety System', name: 'fireSafety' }
    ],
    optional: [
      { type: 'number', label: 'Loading Dock Count', name: 'loadingDockCount', placeholder: 'Number of loading docks', min: 0 },
      { type: 'checkbox', label: 'CCTV Surveillance', name: 'cctv' },
      { type: 'checkbox', label: 'Security Personnel', name: 'securityPersonnel' },
      { type: 'checkbox', label: '24/7 Power Backup', name: 'powerBackup' },
      { type: 'select', label: 'Floor Type', name: 'floorType', options: ['Concrete', 'Epoxy', 'RCC', 'Others'] }
    ]
  },
  
  'retail-shop': {
    mandatory: [
      { type: 'number', label: 'Shop Area (Sq. Ft.)', name: 'shopArea', placeholder: 'Shop area', min: 0 },
      { type: 'select', label: 'Location Type', name: 'locationType', options: ['High Street', 'Mall', 'Market', 'Commercial Complex'] },
      { type: 'number', label: 'Frontage Width (in Feet)', name: 'frontageWidth', placeholder: 'Shop front width', min: 0 },
      { type: 'select', label: 'Floor Level', name: 'floorLevel', options: ['Ground Floor', 'First Floor', 'Basement', 'Other'] }
    ],
    optional: [
      { type: 'checkbox', label: 'Corner Shop', name: 'cornerShop' },
      { type: 'checkbox', label: 'Display Window', name: 'displayWindow' },
      { type: 'checkbox', label: 'Storage Area', name: 'storageArea' },
      { type: 'number', label: 'AC Units', name: 'acUnits', placeholder: 'Number of AC units', min: 0 },
      { type: 'checkbox', label: 'Fire Exit Available', name: 'fireExit' }
    ]
  },
  
  'office-space': {
    mandatory: [
      { type: 'number', label: 'Carpet Area (Sq. Ft.)', name: 'carpetArea', placeholder: 'Carpet area', min: 0 },
      { type: 'select', label: 'Office Type', name: 'officeType', options: ['Private Office', 'Co-working', 'Corporate', 'Startup Hub'] },
      { type: 'number', label: 'Floor Number', name: 'floorNumber', placeholder: 'Floor number', min: 0 },
      { type: 'number', label: 'Total Floors', name: 'totalFloors', placeholder: 'Total floors in building', min: 0 },
      { type: 'checkbox', label: 'Fully Furnished', name: 'fullyFurnished' }
    ],
    optional: [
      { type: 'number', label: 'Cabin Count', name: 'cabinCount', placeholder: 'Number of cabins', min: 0 },
      { type: 'number', label: 'Conference Rooms', name: 'conferenceRooms', placeholder: 'Number of conference rooms', min: 0 },
      { type: 'checkbox', label: 'Pantry Area', name: 'pantryArea' },
      { type: 'checkbox', label: 'Reception Area', name: 'receptionArea' },
      { type: 'checkbox', label: 'High Speed Internet', name: 'highSpeedInternet' }
    ]
  },
  
  'hospitality': {
    mandatory: [
      { type: 'number', label: 'Total Area (Sq. Ft.)', name: 'totalArea', placeholder: 'Total area', min: 0 },
      { type: 'select', label: 'Property Type', name: 'propertyType', options: ['Hotel', 'Resort', 'Guest House', 'Service Apartment'] },
      { type: 'number', label: 'Number of Rooms', name: 'roomsCount', placeholder: 'Total number of rooms', min: 0 },
      { type: 'checkbox', label: 'Restaurant Available', name: 'restaurantAvailable' },
      { type: 'checkbox', label: 'Swimming Pool', name: 'swimmingPool' }
    ],
    optional: [
      { type: 'number', label: 'Conference Hall Capacity', name: 'conferenceCapacity', placeholder: 'Conference hall capacity', min: 0 },
      { type: 'checkbox', label: 'Spa Facility', name: 'spaFacility' },
      { type: 'checkbox', label: 'Gym Facility', name: 'gymFacility' },
      { type: 'select', label: 'Star Rating', name: 'starRating', options: ['Unrated', '3 Star', '4 Star', '5 Star', '5 Star Deluxe'] },
      { type: 'checkbox', label: 'Banquet Hall', name: 'banquetHall' }
    ]
  },
  
  'industries': {
    mandatory: [
      { type: 'number', label: 'Total Area (Sq. Ft.)', name: 'totalArea', placeholder: 'Total area', min: 0 },
      { type: 'select', label: 'Industry Type', name: 'industryType', options: ['Manufacturing', 'Processing', 'Assembly', 'Packaging', 'Heavy Industry'] },
      { type: 'checkbox', label: 'Power Connection', name: 'powerConnection' },
      { type: 'checkbox', label: 'Water Connection', name: 'waterConnection' },
      { type: 'checkbox', label: 'Drainage System', name: 'drainageSystem' }
    ],
    optional: [
      { type: 'number', label: 'Power Load (in KVA)', name: 'powerLoad', placeholder: 'Power load capacity', min: 0 },
      { type: 'checkbox', label: 'Effluent Treatment Plant', name: 'etpPlant' },
      { type: 'checkbox', label: 'Fire NOC Available', name: 'fireNOC' },
      { type: 'checkbox', label: 'Pollution Clearance', name: 'pollutionClearance' },
      { type: 'select', label: 'Building Type', name: 'buildingType', options: ['RCC', 'Steel Structure', 'Pre-fab', 'Mixed'] }
    ]
  }
};

// Video format validation
const validateVideoFormat = (file: File): { isValid: boolean; error?: string } => {
  const validFormats = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
  const maxSize = 500 * 1024 * 1024; // 500MB

  if (!validFormats.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Invalid video format. Supported formats: MP4, WebM, OGG, MOV, AVI` 
    };
  }

  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `Video file too large. Maximum size is 500MB` 
    };
  }

  return { isValid: true };
};

// Image format validation
const validateImageFormat = (file: File): { isValid: boolean; error?: string } => {
  const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validFormats.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Invalid image format. Supported formats: JPEG, PNG, GIF, WebP` 
    };
  }

  if (file.size > maxSize) {
    return { 
      isValid: false, 
      error: `Image file too large. Maximum size is 10MB` 
    };
  }

  return { isValid: true };
};

const AddProperties = () => {
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'land'>('residential');
  const [propertyCategory, setPropertyCategory] = useState<string>('');
  const [propertySubCategory, setPropertySubCategory] = useState<string>('');
  const [propertyDetails, setPropertyDetails] = useState<Record<string, string | number | boolean>>({});
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [propertyVideos, setPropertyVideos] = useState<File[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<number, string>>({});
  const [videoErrors, setVideoErrors] = useState<Record<number, string>>({});
  const [priceValue, setPriceValue] = useState<string>('');
  const [priceUnit, setPriceUnit] = useState('lakh');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  
  // New state for contact validation
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({
    phone: '',
    email: ''
  });

  // Refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const districtRef = useRef<HTMLSelectElement>(null);
  const localityRef = useRef<HTMLInputElement>(null);
  const landmarkRef = useRef<HTMLInputElement>(null);
  const pincodeRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const contactPersonRef = useRef<HTMLInputElement>(null);
  const furnishingRef = useRef<HTMLSelectElement>(null);
  const parkingRef = useRef<HTMLSelectElement>(null);

  const imageUploadRef = useRef<HTMLInputElement>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);

  const handlePropertyTypeChange = (type: 'residential' | 'commercial' | 'land') => {
    setPropertyType(type);
    // Reset category and subcategory when property type changes
    setPropertyCategory('');
    setPropertySubCategory('');
    setPropertyDetails({});
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setPropertyCategory(category);
    // Reset subcategory and details when main category changes
    setPropertySubCategory('');
    setPropertyDetails({});
  };

  const handlePropertyDetailChange = (name: string, value: string | number | boolean) => {
    setPropertyDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderPropertyDetailField = (field: PropertyDetailField) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            className="form-select"
            value={propertyDetails[field.name] as string || ''}
            onChange={(e) => handlePropertyDetailChange(field.name, e.target.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            className="form-input"
            placeholder={field.placeholder}
            value={propertyDetails[field.name] as number || ''}
            onChange={(e) => handlePropertyDetailChange(field.name, e.target.value === '' ? '' : Number(e.target.value))}
            min={field.min || 0}
            step={field.step || 1}
          />
        );
      
      case 'text':
        return (
          <input
            type="text"
            className="form-input"
            placeholder={field.placeholder}
            value={propertyDetails[field.name] as string || ''}
            onChange={(e) => handlePropertyDetailChange(field.name, e.target.value)}
          />
        );
      
      case 'checkbox':
        return (
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={field.name}
              className="checkbox-input"
              checked={propertyDetails[field.name] as boolean || false}
              onChange={(e) => handlePropertyDetailChange(field.name, e.target.checked)}
            />
            <label htmlFor={field.name} className="checkbox-label">{field.label}</label>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImageErrors: Record<number, string> = {};
      const newUploadProgress: Record<number, number> = {};
      const validImages: File[] = [];
      
      files.forEach((file, index) => {
        const validation = validateImageFormat(file);
        const actualIndex = propertyImages.length + index;
        
        if (validation.isValid) {
          if (propertyImages.length + validImages.length >= 20) {
            newImageErrors[actualIndex] = 'Maximum 20 images allowed';
            return;
          }
          validImages.push(file);
          // Simulate upload progress
          newUploadProgress[actualIndex] = 0;
          simulateUploadProgress(actualIndex);
        } else {
          newImageErrors[actualIndex] = validation.error || 'Invalid image file';
        }
      });
      
      if (validImages.length > 0) {
        setPropertyImages(prev => [...prev, ...validImages]);
        setUploadProgress(prev => ({ ...prev, ...newUploadProgress }));
      }
      
      if (Object.keys(newImageErrors).length > 0) {
        setImageErrors(prev => ({ ...prev, ...newImageErrors }));
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newVideoErrors: Record<number, string> = {};
      const newUploadProgress: Record<number, number> = {};
      const validVideos: File[] = [];
      
      files.forEach((file, index) => {
        const validation = validateVideoFormat(file);
        const actualIndex = propertyVideos.length + index;
        
        if (validation.isValid) {
          if (propertyVideos.length + validVideos.length >= 5) {
            newVideoErrors[actualIndex] = 'Maximum 5 videos allowed';
            return;
          }
          validVideos.push(file);
          // Simulate upload progress
          newUploadProgress[actualIndex] = 0;
          simulateUploadProgress(actualIndex);
        } else {
          newVideoErrors[actualIndex] = validation.error || 'Invalid video file';
        }
      });
      
      if (validVideos.length > 0) {
        setPropertyVideos(prev => [...prev, ...validVideos]);
        setUploadProgress(prev => ({ ...prev, ...newUploadProgress }));
      }
      
      if (Object.keys(newVideoErrors).length > 0) {
        setVideoErrors(prev => ({ ...prev, ...newVideoErrors }));
      }
    }
  };

  const simulateUploadProgress = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [index]: progress }));
    }, 100);
  };

  const removeImage = (index: number) => {
    const newImages = [...propertyImages];
    newImages.splice(index, 1);
    setPropertyImages(newImages);
    
    // Remove any associated errors
    setImageErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
    
    // Remove upload progress
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const removeVideo = (index: number) => {
    const newVideos = [...propertyVideos];
    newVideos.splice(index, 1);
    setPropertyVideos(newVideos);
    
    // Remove any associated errors
    setVideoErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
    
    // Remove upload progress
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[index];
      return newProgress;
    });
  };

  const clearAllImages = () => {
    if (window.confirm('Are you sure you want to delete all images?')) {
      setPropertyImages([]);
      setImageErrors({});
    }
  };

  const clearAllVideos = () => {
    if (window.confirm('Are you sure you want to delete all videos?')) {
      setPropertyVideos([]);
      setVideoErrors({});
    }
  };

  const handleCounterChange = (
    type: 'bedroom' | 'bathroom',
    operation: 'increment' | 'decrement'
  ) => {
    if (type === 'bedroom') {
      setBedrooms(prev => {
        const newValue = operation === 'increment' ? prev + 1 : prev - 1;
        return Math.max(0, newValue);
      });
    } else {
      setBathrooms(prev => {
        const newValue = operation === 'increment' ? prev + 1 : prev - 1;
        return Math.max(0, newValue);
      });
    }
  };

  const handleCounterInputChange = (
    type: 'bedroom' | 'bathroom',
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    if (type === 'bedroom') {
      setBedrooms(Math.max(0, numValue));
    } else {
      setBathrooms(Math.max(0, numValue));
    }
  };

  // Phone number validation
  const validatePhoneNumber = (phone: string): string => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      return 'Phone number must be 10 digits';
    }
    
    const validFirstDigits = ['6', '7', '8', '9'];
    if (!validFirstDigits.includes(cleanPhone.charAt(0))) {
      return 'Please enter a valid Indian mobile number';
    }
    
    return '';
  };

  // Email validation
  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleanValue = value.replace(/\D/g, '').slice(0, 10);
    
    setContactInfo(prev => ({
      ...prev,
      phone: cleanValue
    }));
    
    if (validationErrors.phone) {
      setValidationErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setContactInfo(prev => ({
      ...prev,
      email: value
    }));
    
    if (validationErrors.email) {
      setValidationErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handlePhoneBlur = () => {
    const error = validatePhoneNumber(contactInfo.phone);
    setValidationErrors(prev => ({
      ...prev,
      phone: error
    }));
  };

  const handleEmailBlur = () => {
    const error = validateEmail(contactInfo.email);
    setValidationErrors(prev => ({
      ...prev,
      email: error
    }));
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return cleaned;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate phone and email
    const phoneError = validatePhoneNumber(contactInfo.phone);
    const emailError = validateEmail(contactInfo.email);
    
    setValidationErrors({
      phone: phoneError,
      email: emailError
    });
    
    if (!phoneError && !emailError) {
      const formData = new FormData();
      
      // Collect amenities from checkboxes
      const amenities: string[] = [];
      const amenityCheckboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]:checked');
      amenityCheckboxes.forEach((checkbox) => {
        const label = checkbox.closest('.checkbox-label')?.querySelector('.checkbox-text')?.textContent;
        if (label) {
          amenities.push(label);
        }
      });
      
      // Create property data object using refs
      const propertyData = {
        propertyType,
        propertyCategory,
        propertySubCategory,
        title: titleRef.current?.value || '',
        description: descriptionRef.current?.value || '',
        priceValue,
        priceUnit,
        location: {
          district: districtRef.current?.value || '',
          locality: localityRef.current?.value || '',
          landmark: landmarkRef.current?.value || '',
          pincode: pincodeRef.current?.value || '',
          fullAddress: addressRef.current?.value || ''
        },
        features: propertyType === 'residential' ? {
          bedrooms,
          bathrooms,
          builtUpArea: propertyDetails.builtUpArea || 0,
          carpetArea: propertyDetails.carpetArea || 0,
          furnishing: furnishingRef.current?.value || '',
          parking: parkingRef.current?.value || '',
          amenities
        } : null,
        propertyDetails,
        contactInfo: {
          phone: contactInfo.phone,
          email: contactInfo.email,
          contactPerson: contactPersonRef.current?.value || ''
        }
      };
      
      // Add property data as JSON
      formData.append('propertyData', JSON.stringify(propertyData));
      
      // Add images
      propertyImages.forEach((image) => {
        formData.append('images', image);
      });
      
      // Add videos
      propertyVideos.forEach((video) => {
        formData.append('videos', video);
      });
      
      // Send to backend
      fetch('https://realestatebackend-8adg.onrender.com/api/properties', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Property created successfully!', data);
          alert('Property published successfully!');
          // Reset form
          setPropertyType('residential');
          setPropertyCategory('');
          setPropertySubCategory('');
          setPropertyDetails({});
          setPropertyImages([]);
          setPropertyVideos([]);
          setPriceValue('');
          setPriceUnit('lakh');
          setBedrooms(2);
          setBathrooms(2);
          setContactInfo({ phone: '', email: '' });
          if (titleRef.current) titleRef.current.value = '';
          if (descriptionRef.current) descriptionRef.current.value = '';
          if (districtRef.current) districtRef.current.value = '';
          if (localityRef.current) localityRef.current.value = '';
          if (landmarkRef.current) landmarkRef.current.value = '';
          if (pincodeRef.current) pincodeRef.current.value = '';
          if (addressRef.current) addressRef.current.value = '';
          if (contactPersonRef.current) contactPersonRef.current.value = '';
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to create property');
      });
    } else {
      console.log('Form has validation errors');
    }
  };

  // Get current property details configuration
  const currentPropertyDetails = propertyCategory ? propertyDetailsConfig[propertyCategory] : null;

  return (
    <div className="add-properties">
      <div className="page-header">
        <div className="header-content">
          <h1>Add New Property</h1>
        </div>
        <div className="header-actions">
          <button className="save-draft-btn">Save as Draft</button>
          <button className="preview-btn">Preview Property</button>
        </div>
      </div>

      <div className="property-form-container">
        <div className="form-section">
          <div className="section-header">
            <h2>Basic Information</h2>
            <span className="required-badge">Required</span>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Property Title <span className="required">*</span>
              </label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., Luxury 3 BHK Apartment in Chennai"
                ref={titleRef}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Property Type <span className="required">*</span>
              </label>
              <div className="property-type-selector">
                <button 
                  className={`type-btn ${propertyType === 'residential' ? 'active' : ''}`}
                  onClick={() => handlePropertyTypeChange('residential')}
                  type="button"
                >
                  🏠 Residential
                </button>
                <button 
                  className={`type-btn ${propertyType === 'commercial' ? 'active' : ''}`}
                  onClick={() => handlePropertyTypeChange('commercial')}
                  type="button"
                >
                  🏢 Commercial
                </button>
                <button 
                  className={`type-btn ${propertyType === 'land' ? 'active' : ''}`}
                  onClick={() => handlePropertyTypeChange('land')}
                  type="button"
                >
                  🌳 Land
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Property Category <span className="required">*</span>
              </label>
              <select 
                className="form-select"
                value={propertyCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select category</option>
                {propertyCategories[propertyType]?.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Property Sub-category
              </label>
              <select 
                className="form-select"
                value={propertySubCategory}
                onChange={(e) => setPropertySubCategory(e.target.value)}
                disabled={!propertyCategory}
              >
                <option value="">Select sub-category</option>
                {propertyCategory && propertySubCategories[propertyCategory]?.map((subCategory) => (
                  <option key={subCategory} value={subCategory.toLowerCase().replace(/\s+/g, '-')}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Price <span className="required">*</span>
              </label>
              <div className="price-input-group">
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Enter price"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  min="0"
                />
                <select 
                  className="price-unit"
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                >
                  <option value="lakh">Lakh</option>
                  <option value="crore">Crore</option>
                  <option value="sqft">Per Sq. Ft.</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea 
                className="form-textarea"
                placeholder="Detailed description of the property..."
                rows={4}
                ref={descriptionRef}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Property Details Section */}
        {propertyCategory && currentPropertyDetails && (
          <div className="form-section">
            <div className="section-header">
              <h2>Property Details</h2>
              <span className="required-badge">Required</span>
            </div>
            
            <div className="property-details-section">
              <div className="details-section">
                <h3 className="details-subtitle">Mandatory Details</h3>
                <div className="form-grid">
                  {currentPropertyDetails.mandatory.map((field, index) => (
                    <div key={`mandatory-${index}`} className="form-group">
                      <label className="form-label">
                        {field.label} <span className="required">*</span>
                      </label>
                      {renderPropertyDetailField(field)}
                    </div>
                  ))}
                </div>
              </div>
              
              {currentPropertyDetails.optional.length > 0 && (
                <div className="details-section">
                  <h3 className="details-subtitle">Additional Details (Optional)</h3>
                  <div className="form-grid">
                    {currentPropertyDetails.optional.map((field, index) => (
                      <div key={`optional-${index}`} className="form-group">
                        <label className="form-label">
                          {field.label}
                        </label>
                        {renderPropertyDetailField(field)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="form-section">
          <div className="section-header">
            <h2>Location Details</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">District <span className="required">*</span></label>
              <select className="form-select" ref={districtRef}>
                <option value="">Select district</option>
                {tamilNaduDistricts.map((district) => (
                  <option key={district} value={district.toLowerCase()}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Area/Locality <span className="required">*</span></label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., T Nagar, Anna Nagar, Velachery"
                ref={localityRef}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Landmark</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Nearby landmark"
                ref={landmarkRef}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., 600001"
                maxLength={6}
                ref={pincodeRef}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Full Address</label>
              <textarea 
                className="form-textarea"
                placeholder="Complete postal address..."
                rows={3}
                ref={addressRef}
              />
            </div>
          </div>
        </div>

        {/* Property Specifications - Conditional based on type */}
        {propertyType === 'residential' && (
          <div className="form-section">
            <div className="section-header">
              <h2>Property Specifications</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Built-up Area (Sq. Ft.)</label>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Built-up area"
                  min="0"
                  onChange={(e) => handlePropertyDetailChange('builtUpArea', Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Carpet Area (Sq. Ft.)</label>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Carpet area"
                  min="0"
                  onChange={(e) => handlePropertyDetailChange('carpetArea', Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bedrooms</label>
                <div className="counter-group">
                  <button 
                    className="counter-btn" 
                    type="button"
                    onClick={() => handleCounterChange('bedroom', 'decrement')}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="counter-input"
                    value={bedrooms}
                    onChange={(e) => handleCounterInputChange('bedroom', e.target.value)}
                    min="0"
                  />
                  <button 
                    className="counter-btn" 
                    type="button"
                    onClick={() => handleCounterChange('bedroom', 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bathrooms</label>
                <div className="counter-group">
                  <button 
                    className="counter-btn" 
                    type="button"
                    onClick={() => handleCounterChange('bathroom', 'decrement')}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="counter-input"
                    value={bathrooms}
                    onChange={(e) => handleCounterInputChange('bathroom', e.target.value)}
                    min="0"
                  />
                  <button 
                    className="counter-btn" 
                    type="button"
                    onClick={() => handleCounterChange('bathroom', 'increment')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Furnishing</label>
                <select className="form-select" ref={furnishingRef}>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi">Semi-Furnished</option>
                  <option value="full">Fully Furnished</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Parking</label>
                <select className="form-select" ref={parkingRef}>
                  <option value="none">No Parking</option>
                  <option value="1">1 Vehicle</option>
                  <option value="2">2 Vehicles</option>
                  <option value="3">3+ Vehicles</option>
                </select>
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Swimming Pool</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Gym</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Security</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Power Backup</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Garden</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Club House</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Children's Play Area</span>
              </label>
            </div>
          </div>
        )}

        {/* Images Upload Section */}
        <div className="form-section">
          <div className="section-header">
            <div className="section-header-content">
              <h2>Property Images</h2>
              <div className="media-count-badge">
                {propertyImages.length}/20 images
              </div>
            </div>
            <div className="section-header-actions">
              {propertyImages.length > 0 && (
                <button 
                  className="clear-all-btn"
                  onClick={clearAllImages}
                  type="button"
                >
                  Clear All Images
                </button>
              )}
            </div>
          </div>
          
          <div className="image-upload-section">
            <div className="image-upload-box" onClick={() => imageUploadRef.current?.click()}>
              <div className="upload-icon">📷</div>
              <p className="upload-text">Click to upload images</p>
              <p className="upload-subtext">JPEG, PNG, GIF up to 10MB each</p>
              <input 
                ref={imageUploadRef}
                type="file" 
                id="image-upload"
                className="image-upload-input"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {propertyImages.length > 0 && (
              <>
                <div className="image-preview-grid">
                  {propertyImages.map((file, index) => {
                    const progress = uploadProgress[index] || 100;
                    const hasError = imageErrors[index];
                    
                    return (
                      <div key={index} className={`image-preview-item ${hasError ? 'error' : ''}`}>
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Property ${index + 1}`}
                          className="preview-image"
                        />
                        <button 
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                          type="button"
                          title="Delete image"
                        >
                          ✕
                        </button>
                        {progress < 100 && (
                          <div className="upload-progress">
                            <div 
                              className="progress-bar"
                              style={{ width: `${progress}%` }}
                            />
                            <span className="progress-text">{Math.round(progress)}%</span>
                          </div>
                        )}
                        <div className="image-info">
                          <div className="image-name">{file.name}</div>
                          <div className="image-details">
                            <span className="image-size">{formatFileSize(file.size)}</span>
                            <span className="image-format">{file.type.split('/')[1].toUpperCase()}</span>
                          </div>
                          {hasError && (
                            <div className="image-error">{imageErrors[index]}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="image-summary">
                  <p>{propertyImages.length} image{propertyImages.length !== 1 ? 's' : ''} uploaded</p>
                  <button 
                    className="add-more-btn"
                    onClick={() => imageUploadRef.current?.click()}
                    type="button"
                  >
                    + Add More Images
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Videos Upload Section */}
        <div className="form-section">
          <div className="section-header">
            <div className="section-header-content">
              <h2>Property Videos</h2>
              <div className="media-count-badge">
                {propertyVideos.length}/5 videos
              </div>
            </div>
            <div className="section-header-actions">
              {propertyVideos.length > 0 && (
                <button 
                  className="clear-all-btn"
                  onClick={clearAllVideos}
                  type="button"
                >
                  Clear All Videos
                </button>
              )}
            </div>
          </div>
          
          <div className="video-upload-section">
            <div className="video-upload-box" onClick={() => videoUploadRef.current?.click()}>
              <div className="upload-icon">🎥</div>
              <p className="upload-text">Click to upload videos</p>
              <p className="upload-subtext">MP4, WebM, OGG up to 500MB each</p>
              <input 
                ref={videoUploadRef}
                type="file" 
                id="video-upload"
                className="video-upload-input"
                multiple
                accept="video/*"
                onChange={handleVideoUpload}
              />
            </div>

            {propertyVideos.length > 0 && (
              <>
                <div className="video-preview-grid">
                  {propertyVideos.map((file, index) => {
                    const videoUrl = URL.createObjectURL(file);
                    const progress = uploadProgress[propertyImages.length + index] || 100;
                    const hasError = videoErrors[index];
                    
                    return (
                      <div key={index} className={`video-preview-item ${hasError ? 'error' : ''}`}>
                        <div className="video-preview-wrapper">
                          <video 
                            src={videoUrl}
                            className="preview-video"
                            controls
                            preload="metadata"
                          />
                          <button 
                            className="remove-video-btn"
                            onClick={() => removeVideo(index)}
                            type="button"
                            title="Delete video"
                          >
                            ✕
                          </button>
                          {progress < 100 && (
                            <div className="upload-progress">
                              <div 
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                              />
                              <span className="progress-text">{Math.round(progress)}%</span>
                            </div>
                          )}
                        </div>
                        <div className="video-info">
                          <div className="video-name">{file.name}</div>
                          <div className="video-details">
                            <span className="video-size">{formatFileSize(file.size)}</span>
                            <span className="video-format">{file.type.split('/')[1].toUpperCase()}</span>
                          </div>
                          {hasError && (
                            <div className="video-error">{videoErrors[index]}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="video-summary">
                  <p>{propertyVideos.length} video{propertyVideos.length !== 1 ? 's' : ''} uploaded</p>
                  <button 
                    className="add-more-btn"
                    onClick={() => videoUploadRef.current?.click()}
                    type="button"
                  >
                    + Add More Videos
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Contact Information</h2>
            <span className="required-badge">Required</span>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Name of contact person"
                ref={contactPersonRef}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input 
                type="tel" 
                className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                placeholder="Enter 10-digit mobile number"
                value={formatPhoneNumber(contactInfo.phone)}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                maxLength={12}
              />
              {validationErrors.phone && (
                <div className="error-message">{validationErrors.phone}</div>
              )}
              <div className="hint-text">Format: 98765 43210</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input 
                type="email" 
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                placeholder="contact@example.com"
                value={contactInfo.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {validationErrors.email && (
                <div className="error-message">{validationErrors.email}</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" type="button">Cancel</button>
          <button className="save-btn" type="button">Save as Draft</button>
          <button 
            className="submit-btn" 
            type="button"
            onClick={handleSubmit}
          >
            Publish Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProperties;