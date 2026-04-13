// lib/properties.ts

export interface Plot {
  size: string;
  type: string;
  price: number;
}

export interface Property {
  title: string;
  location: string;
  image: string;
  color: string;
  deadline?: string;
  plots: Plot[];
}

// The [key: string] part here is what fixes your Vercel Build Error
export const propertyList: { [key: string]: Property } = {
  "solar-city": {
    title: "Solar City Apo",
    location: "Apo, Burum West District",
    image: "/solarcityapo.jpg",
    color: "green",
    plots: [
      { size: "170SQM", type: "3 Bed Terrace", price: 4500000 },
      { size: "250SQM", type: "4 Bed Semi Detached", price: 6700000 },
      { size: "350SQM", type: "4 Bed Full Detached", price: 9500000 },
      { size: "450SQM", type: "5 Bed Full Detached + BQ", price: 12000000 },
      { size: "600SQM", type: "6 Bed Mansionate + BQ", price: 15900000 },
      { size: "1000SQM", type: "Block of Flats", price: 27000000 },
    ]
  }
};