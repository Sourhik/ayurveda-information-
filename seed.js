const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Herb = require('./models/Herb');
const Treatment = require('./models/Treatment');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        // Clear DB
        await Admin.deleteMany();
        await Herb.deleteMany();
        await Treatment.deleteMany();

        // Admin setup
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        const admin = new Admin({ username: 'admin', password: hashedPassword });
        await admin.save();
        console.log('Default Admin Created: admin / admin123');

        // Herbs Setup
        const herbs = [
            {
                name: 'Tulsi (Holy Basil)',
                image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80',
                category: 'Immunity',
                benefits: 'Boosts immunity, relieves stress.',
                uses: 'Can be consumed as tea or chewed raw.',
                description: 'Tulsi is considered the "Queen of Herbs" and is widely used in Ayurvedic medicine for its numerous health benefits.'
            },
            {
                name: 'Ashwagandha',
                image: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&q=80',
                category: 'Stress',
                benefits: 'Reduces anxiety and stress, improves brain function.',
                uses: 'Used in powder form with warm milk.',
                description: 'An ancient medicinal herb known as an adaptogen, meaning it can help your body manage stress.'
            },
            {
                name: 'Turmeric',
                image: 'https://images.unsplash.com/photo-1615486171448-4df2a009aa58?auto=format&fit=crop&q=80',
                category: 'Immunity',
                benefits: 'Anti-inflammatory, powerful antioxidant.',
                uses: 'Used in cooking, as a supplement, or with warm milk.',
                description: 'Curcumin is the main active ingredient in turmeric. It has powerful anti-inflammatory effects and is a very strong antioxidant.'
            }
        ];
        await Herb.insertMany(herbs);
        console.log('Herbs Seeded');

        // Treatments Setup
        const treatments = [
            {
                name: 'Panchakarma',
                description: 'A comprehensive system of knowledge and practices to purify the body of toxins.'
            },
            {
                name: 'Abhyanga',
                description: 'An Ayurvedic massage using warm oil specifically tailored to your dosha.'
            },
            {
                name: 'Shirodhara',
                description: 'A form of Ayurveda therapy that involves gently pouring liquids over the forehead.'
            }
        ];
        await Treatment.insertMany(treatments);
        console.log('Treatments Seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
