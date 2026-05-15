const mongoose = require('mongoose');
const Herb = require('./models/Herb');

mongoose.connect('mongodb://localhost:27017/ayurveda_wisdom')
    .then(async () => {
        console.log("Connected to MongoDB for Mass 50-Herb Seeding...");

        const herbData = [
            // General
            { name: "Aloe Vera (Ghrita Kumari)", cat: "Skin", ben: "Heals skin, aids digestion.", use: "Gel applied to skin or ingested." },
            { name: "Bitter Melon (Karela)", cat: "General", ben: "Regulates blood sugar.", use: "Juiced daily." },
            { name: "Shatavari", cat: "Immunity", ben: "Female reproductive tonic.", use: "Powder with milk." },
            { name: "Mulethi (Licorice)", cat: "Immunity", ben: "Soothes throat, treats ulcers.", use: "Chewed or boiled as tea." },
            { name: "Arjuna", cat: "General", ben: "Cardiovascular health.", use: "Bark decoction." },
            { name: "Guggul", cat: "Digestion", ben: "Cholesterol management.", use: "Tablet form." },
            { name: "Pippali (Long Pepper)", cat: "Digestion", ben: "Respiratory health.", use: "Powder with honey." },
            { name: "Cinnamon", cat: "Digestion", ben: "Metabolism booster.", use: "Tea or spice." },
            { name: "Cardamom", cat: "Digestion", ben: "Freshens breath, settles stomach.", use: "Chewed or crushed." },
            { name: "Fennel (Saunf)", cat: "Digestion", ben: "Reduces bloating.", use: "Chewed after meals." },
            
            // Immunity & Fever
            { name: "Kalmegh", cat: "Immunity", ben: "Liver protector, treats fever.", use: "Capsule or extract." },
            { name: "Tulsi (Rama)", cat: "Immunity", ben: "Daily immunity booster.", use: "Tea." },
            { name: "Tulsi (Krishna)", cat: "Immunity", ben: "Resperatory health.", use: "Extract." },
            { name: "Haritaki", cat: "Digestion", ben: "Detoxification.", use: "Powder before bed." },
            { name: "Bibhitaki", cat: "Digestion", ben: "Clears congestion.", use: "Paste or powder." },
            { name: "Gokshura", cat: "General", ben: "Kidney and urinary health.", use: "Powder with water." },
            { name: "Punarnava", cat: "General", ben: "Diuretic, kidney function.", use: "Decoction." },
            
            // Stress & Mind
            { name: "Jatamansi", cat: "Stress", ben: "Deep sleep and relaxation.", use: "Oil or powder." },
            { name: "Shankhpushpi", cat: "Stress", ben: "Enhances intellect, memory.", use: "Syrup or powder." },
            { name: "Vacha (Calamus)", cat: "Stress", ben: "Mental clarity.", use: "Nasal administration or powder." },
            { name: "Gotu Kola", cat: "Stress", ben: "Heals nerve damage, calms mind.", use: "Tea or tincture." },
            { name: "Tagar", cat: "Stress", ben: "Treats insomnia.", use: "Capsule." },
            { name: "Jyotishmati", cat: "Stress", ben: "Cognitive enhancer.", use: "Seed oil." },

            // Skin & Hair
            { name: "Manjistha", cat: "Skin", ben: "Ultimate blood purifier.", use: "Powder paste or decoction." },
            { name: "Bhringraj", cat: "Skin", ben: "Promotes hair growth, reverses graying.", use: "Hair oil." },
            { name: "Shikakai", cat: "Skin", ben: "Natural shampoo, dandruff control.", use: "Powder paste for hair." },
            { name: "Reetha", cat: "Skin", ben: "Gentle natural cleanser.", use: "Soap nut liquid." },
            { name: "Khadira", cat: "Skin", ben: "Treats skin conditions like eczema.", use: "Bark decoction." },
            { name: "Sandalwood", cat: "Skin", ben: "Cools body, reduces acne.", use: "Paste applied to face." },
            { name: "Turmeric (Kasturi)", cat: "Skin", ben: "Glowing skin, removes tan.", use: "Face mask." },

            // Digestion & Spices
            { name: "Cumin (Jeera)", cat: "Digestion", ben: "Enhances nutrient absorption.", use: "Spices in boiling water." },
            { name: "Ajwain (Carom)", cat: "Digestion", ben: "Instant relief from indigestion.", use: "Chewed with warm water." },
            { name: "Clove (Laung)", cat: "General", ben: "Toothache relief.", use: "Chewed slowly or oil applied." },
            { name: "Black Pepper", cat: "Digestion", ben: "Bioenhancer, weight loss.", use: "Powder in food." },
            { name: "Asafoetida (Hing)", cat: "Digestion", ben: "Removes trapped gas.", use: "Pinch in warm water." },
            { name: "Ginger (Dry/Sonth)", cat: "Digestion", ben: "Reduces joint pain.", use: "Powder in milk." },
            { name: "Coriander", cat: "Digestion", ben: "Cools the digestive tract.", use: "Seed water in morning." },

            // Miscellaneous Advanced
            { name: "Safed Musli", cat: "General", ben: "Vitality and strength.", use: "Powder." },
            { name: "Shilajit", cat: "General", ben: "Anti-aging, severe fatigue recovery.", use: "Resin melted in warm milk." },
            { name: "Bala", cat: "General", ben: "Muscular strength.", use: "Massage oil or decoction." },
            { name: "Ashwagandha (KSM-66)", cat: "Stress", ben: "Maximum stress relief.", use: "Extract." },
            { name: "Moringa", cat: "Immunity", ben: "Multivitamin superfood.", use: "Leaf powder in smoothies." },
            { name: "Amalaki", cat: "Immunity", ben: "Pitta dosha balancing.", use: "Raw." }
        ];

        let docs = [];
        for(let h of herbData) {
            docs.push({
                name: h.name,
                category: h.cat,
                benefits: h.ben,
                uses: h.use,
                description: `Traditional Ayurveda utilizes ${h.name} for its incredible properties. ${h.ben}`,
                image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80'
            });
        }

        await Herb.insertMany(docs);
        console.log(`Successfully seeded ${docs.length} new amazing herbs!`);
        process.exit(0);
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
