const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Disease = require('./models/Disease');

const data1 = require('./data/data1.js');
const data2 = require('./data/data2.js');
const data3 = require('./data/data3.js');
const data4 = require('./data/data4.js');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ayurveda_wisdom')
.then(() => console.log('MongoDB Connected for Disease Seeding'))
.catch(err => console.error(err));

const seedDiseases = async () => {
    try {
        await Disease.deleteMany();
        console.log('Cleared existing diseases...');

        const allData = data1 + '\n' + data2 + '\n' + data3 + '\n' + data4;
        const lines = allData.split('\n');
        
        const diseasesToInsert = [];
        const seen = new Set();

        for (let line of lines) {
            line = line.trim();
            if (/^\d+\t/.test(line)) {
                const parts = line.split('\t');
                if (parts.length >= 6) {
                    const no = parseInt(parts[0], 10);
                    if (!seen.has(no)) {
                        seen.add(no);
                        diseasesToInsert.push({
                            no: no,
                            commonName: parts[1].trim(),
                            ayurvedicName: parts[2].trim(),
                            description: parts[3].trim(),
                            medicines: parts[4].trim(),
                            medicineInfo: parts[5].trim()
                        });
                    }
                }
            }
        }

        console.log(`Parsed ${diseasesToInsert.length} unique diseases from chunks.`);
        if (diseasesToInsert.length > 0) {
            await Disease.insertMany(diseasesToInsert);
            console.log('Successfully inserted into DB!');
        } else {
            console.log('No diseases found! Check parsing logic or spacing.');
        }
        process.exit(0);
    } catch (err) {
        console.error('Error seeding diseases:', err);
        process.exit(1);
    }
};

seedDiseases();
