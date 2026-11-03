export interface SafetyPillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: "ShieldAlert" | "HeartPulse" | "Wrench" | "Truck" | "Radio" | "FileCheck";
  description: string;
  metric: string;
  specs: string[];
}

export const SAFETY_PILLARS: SafetyPillar[] = [
  {
    id: "medical-o2",
    title: "Continuous Medical O2 & Vitals Monitoring",
    subtitle: "Active AMS defense at extreme altitudes",
    iconName: "HeartPulse",
    description: "Every expedition vehicle carries medical-grade portable oxygen cylinders and clinical pulse oximeters. Vitals are checked every morning and evening.",
    metric: "0% Evacuations in 2025",
    specs: [
      "Portable 10-liter medical oxygen cylinders per convoy",
      "Pulse oximeters logging SpO2 & pulse for every traveler",
      "Expedition medical kit stocked with Diamox, anti-emetics & rehydration salts",
      "24/7 telephonic consultation with high-altitude military physicians in Leh & Shimla",
    ],
  },
  {
    id: "certified-wfr",
    title: "Certified Wilderness First Responders (WFR)",
    subtitle: "Local Himachali mountain leaders",
    iconName: "ShieldAlert",
    description: "Our expedition leads are certified by Nehru Institute of Mountaineering (NIM) and American Wilderness Medical Society standards.",
    metric: "12+ Years Avg Experience",
    specs: [
      "Native Himachali & Spitian leads who know every shepherd trail and river swell",
      "Certified in high-altitude trauma, hypothermia & frostbite management",
      "Immediate liaison with Indo-Tibetan Border Police (ITBP) border outposts",
      "Cultural translators for respectful local interactions in ancient gompas",
    ],
  },
  {
    id: "mechanical-swat",
    title: "Mobile Mechanical SWAT Support",
    subtitle: "Dedicated motorcycle chase vehicle",
    iconName: "Wrench",
    description: "For all two-wheeler expeditions, a backup utility vehicle trails the last rider carrying Royal Enfield OEM spares, tools, air compressors, and extra fuel.",
    metric: "100% Ride Completion",
    specs: [
      "Factory-trained Royal Enfield mechanics in the sweep vehicle",
      "Pre-stocked spare levers, tubes, brake pads, spark plugs & engine oil",
      "High-power tire inflator and puncture repair kits",
      "Emergency motorcycle recovery ramp if a machine fails on high passes",
    ],
  },
  {
    id: "rescue-4x4",
    title: "24/7 4x4 Heavy Rescue & Recovery Backup",
    subtitle: "Tough machines for unforgiving terrain",
    iconName: "Truck",
    description: "Whether navigating Malling Nallah torrents or winter black ice, our 4x4 convoy operates with low-range transfer cases, recovery straps, and snow chains.",
    metric: "15,000+ Kms Conquered",
    specs: [
      "Equipped with 9,500 lb electric winches and kinetic snatch straps",
      "Hardened steel tire snow chains for sub-zero passes",
      "Off-road high-lift jacks and sand ladders",
      "Experienced all-weather drivers with defensive driving certifications",
    ],
  },
  {
    id: "satellite-gps",
    title: "Satellite SOS & Offline Navigational Mesh",
    subtitle: "Unbroken connectivity beyond mobile networks",
    iconName: "Radio",
    description: "When cellular signals vanish past Rekong Peo and Losar, our convoy maintains connection with Garmin InReach satellite tracking and UHF radios.",
    metric: "Real-time convoy tracking",
    specs: [
      "Garmin InReach satellite communicators with SOS emergency uplink",
      "Multi-channel UHF two-way radios between lead and sweep vehicles",
      "Offline military-grade topographical maps with live route tracking",
      "Daily check-in transmissions with our base operations desk in Shimla",
    ],
  },
  {
    id: "permits-insurance",
    title: "Permit Clearance & Rapid Evacuation Protocol",
    subtitle: "Zero hassle documentation & emergency logistics",
    iconName: "FileCheck",
    description: "We handle all Inner Line Permits (ILP), Spiti Valley Green Tribunal cess, and protected area permits prior to arrival with seamless processing.",
    metric: "100% Legal & Green Certified",
    specs: [
      "Pre-approved Inner Line Permits for Indian & Foreign nationals",
      "National Park Wildlife entry clearance and environmental fees",
      "Immediate emergency airlift and ground ambulance dispatch protocols",
      "Comprehensive traveler adventure trip insurance guidance",
    ],
  },
];
