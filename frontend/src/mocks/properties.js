export const LISTINGS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80',
    price: 389000,
    status: 'for sale',
    type: 'house',
    address: '142 Maple Ave',
    city: 'Royal Oak, MI',
    beds: 4, baths: 2, sqft: 2100,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    price: 275000,
    status: 'for sale',
    type: 'condo',
    address: '88 Oak Street, Unit 4B',
    city: 'Birmingham, MI',
    beds: 2, baths: 2, sqft: 1200,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    price: 520000,
    status: 'for sale',
    type: 'house',
    address: '310 Elm Drive',
    city: 'Troy, MI',
    beds: 5, baths: 3, sqft: 3200,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    price: 1950,
    status: 'for rent',
    type: 'condo',
    address: '55 W. 9 Mile Rd, Apt 12',
    city: 'Ferndale, MI',
    beds: 1, baths: 1, sqft: 780,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    price: 440000,
    status: 'for sale',
    type: 'townhouse',
    address: '77 Woodward Blvd',
    city: 'Bloomfield Hills, MI',
    beds: 3, baths: 3, sqft: 2400,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    price: 2800,
    status: 'for rent',
    type: 'house',
    address: '204 Cherry Lane',
    city: 'Clawson, MI',
    beds: 3, baths: 2, sqft: 1600,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    price: 619000,
    status: 'for sale',
    type: 'house',
    address: '19 Lakeview Dr',
    city: 'West Bloomfield, MI',
    beds: 5, baths: 4, sqft: 3800,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
    price: 310000,
    status: 'for sale',
    type: 'townhouse',
    address: '33 Park Blvd',
    city: 'Sterling Heights, MI',
    beds: 3, baths: 2, sqft: 1850,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80',
    price: 1650,
    status: 'for rent',
    type: 'condo',
    address: '101 Main St, Unit 7',
    city: 'Royal Oak, MI',
    beds: 2, baths: 1, sqft: 950,
  },
]

export const TYPE_LABELS = { house: 'House', condo: 'Condo', townhouse: 'Townhouse' }
export const STATUS_LABELS = { 'for sale': 'For Sale', 'for rent': 'For Rent' }

export function formatPrice(price, status) {
  return status === 'for rent'
    ? `$${price.toLocaleString()}/mo`
    : `$${price.toLocaleString()}`
}