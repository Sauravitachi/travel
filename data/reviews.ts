export interface Review {
  id: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  expeditionTaken: string;
  batchDate: string;
  rating: number;
  quote: string;
  fullReview: string;
  expeditionPhoto: string;
  verifiedExplorer: boolean;
  tag: "Biker" | "4x4 Overlander" | "Solo Traveler" | "Photographer" | "Winter Adventurer";
}

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Rohan Malhotra",
    role: "Adventure Motorcyclist",
    location: "Bangalore, India",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    expeditionTaken: "Spiti High-Pass Motorcycle Odyssey",
    batchDate: "July 2025 Batch",
    rating: 5,
    quote: "The lead mechanic and backup pickup truck gave me 100% confidence to conquer Kunzum Pass and Malling Nallah without fear.",
    fullReview: "I had ridden across South India, but Spiti was a beast I always respected and feared. Into The Wild Miles executed this like clockwork. When my Himalayan 450 blew a rear tube near Batal in freezing rain, the sweep vehicle was right behind us with the spare and tools. In 15 minutes, we were rolling again. Truly unmatched safety standards.",
    expeditionPhoto: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    verifiedExplorer: true,
    tag: "Biker",
  },
  {
    id: "rev-2",
    author: "Dr. Ananya Sen",
    role: "Physician & Landscape Photographer",
    location: "Kolkata / London",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    expeditionTaken: "Spiti Valley Grand High-Pass Circuit",
    batchDate: "September 2025 Batch",
    rating: 5,
    quote: "As a doctor, their gradual Kinnaur acclimatization protocol was pure medical genius. Zero headaches, 100% pure Himalayan bliss.",
    fullReview: "Most budget operators rush straight up via Manali and travelers suffer severe Acute Mountain Sickness (AMS). Into The Wild Miles took us through the slow climb of Shimla, Sangla, and Kalpa. Pulse oximeter checks were done twice every single day. I captured 4,000+ photos, saw the Milky Way at Chandratal, and felt completely safe every second.",
    expeditionPhoto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    verifiedExplorer: true,
    tag: "Photographer",
  },
  {
    id: "rev-3",
    author: "Vikram & Neha Rathore",
    role: "4x4 Enthusiasts",
    location: "Chandigarh, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    expeditionTaken: "Winter Spiti: The White Expedition",
    batchDate: "January 2026 Batch",
    rating: 5,
    quote: "Minus 22°C outside, but warm wood bukharis and hot ginger soup inside. Spotting two snow leopards in Kibber was life-altering.",
    fullReview: "Winter Spiti is not for the faint-hearted. It requires snow chains, seasoned drivers who understand black ice, and genuine mountain contacts. Our Thar had heavy-duty chains, and the homestays had heated rooms with thick yak blankets. We spotted an ibex herd and two snow leopards through the spotting scopes. Incredible crew!",
    expeditionPhoto: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    verifiedExplorer: true,
    tag: "Winter Adventurer",
  },
  {
    id: "rev-4",
    author: "Kabir Nambiar",
    role: "Solo Tech Founder",
    location: "Gurugram, India",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    expeditionTaken: "Sacred Chandratal & Pin Valley Stargazing Retreat",
    batchDate: "August 2025 Batch",
    rating: 5,
    quote: "Stargazing at Chandratal with their 8-inch telescope felt like floating in deep outer space. The Swiss tents were spotless.",
    fullReview: "I joined as a solo traveler knowing nobody. By night two around the campfire, we were a brotherhood. The telescope view of Jupiter's Galilean moons and the ring of Saturn at 14,000 ft gave me goosebumps. Clean sleeping bags, boiling hot water buckets, and delicious local food in the middle of nowhere.",
    expeditionPhoto: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    verifiedExplorer: true,
    tag: "Solo Traveler",
  },
  {
    id: "rev-5",
    author: "Devika & Samarth Goel",
    role: "Overland Travelers",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    expeditionTaken: "The Great Zanskar & Ladakh High-Pass Traverse",
    batchDate: "July 2025 Batch",
    rating: 5,
    quote: "Crossing Shinku La Pass and waking up in front of the sacred Gonbo Rangjon rock is something you never forget.",
    fullReview: "This was our third trip with Into The Wild Miles. The Zanskar sector is as raw as Ladakh was 30 years ago. No cellphone signal, pure glacial rivers, and Phuktal monastery tucked into a cliff cave. Our driver Tenzin was a rockstar who knew every stone on the trail.",
    expeditionPhoto: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    verifiedExplorer: true,
    tag: "4x4 Overlander",
  },
  {
    id: "rev-6",
    author: "Tanvi Deshpande",
    role: "Architect & Heritage Traveler",
    location: "Pune, India",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    expeditionTaken: "Kinnaur Orchards & Baspa Valley Overlanding",
    batchDate: "October 2025 Batch",
    rating: 5,
    quote: "The wooden dragon carvings of Chitkul and the sheer drop at Roghi Suicide Point took my breath away.",
    fullReview: "The colors of Kinnaur in autumn are golden and surreal. Fresh apples everywhere, warm Kinnauri hospitality, and comfortable luxury wooden cottages. Into The Wild Miles handled all permits effortlessly. Highly recommend for families and couples!",
    expeditionPhoto: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    verifiedExplorer: true,
    tag: "Solo Traveler",
  },
];
