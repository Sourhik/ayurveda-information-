const Herb = require('../models/Herb');

// Display list of all herbs (with pagination/search)
exports.getHerbsList = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const searchQuery = req.query.search || '';
        const categoryFilter = req.query.category || '';

        // Build query object
        let q = {};
        if (searchQuery) {
            const escapedSearch = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedSearch, 'i');
            q.$or = [
                { name: regex },
                { benefits: regex },
                { uses: regex },
                { description: regex }
            ];
        }
        if (categoryFilter) {
            q.category = categoryFilter;
        }

        const count = await Herb.countDocuments(q);
        const herbs = await Herb.find(q).skip(skip).limit(limit).sort({ createdAt: -1 });
        const totalPages = Math.ceil(count / limit);

        // API Fallback: If DB finds nothing, query Wikipedia for the Herb
        let wikiData = null;
        if (herbs.length === 0 && searchQuery) {
            try {
                const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(searchQuery)}&format=json`);
                const wikiJson = await wikiRes.json();
                const pages = wikiJson.query.pages;
                const pageId = Object.keys(pages)[0];
                if (pageId !== '-1') {
                    wikiData = {
                        name: pages[pageId].title,
                        description: pages[pageId].extract
                    };
                }
            } catch (err) {
                console.error("Wiki API Error:", err);
            }
        }

        res.render('herbs/index', {
            title: 'Ayurvedic Herbs - AyurVeda Wisdom',
            path: '/herbs',
            herbs,
            wikiData,
            currentPage: page,
            totalPages,
            searchQuery,
            categoryFilter
        });
    } catch (err) {
        console.error("Herb List Error:", err);
        res.status(500).render('error/500', { title: 'Server Error', path: req.path });
    }
};

// Display detail page for a specific herb.
exports.getHerbDetails = async (req, res) => {
    try {
        const herb = await Herb.findById(req.params.id);
        if (!herb) {
            return res.status(404).render('error/404', { title: 'Herb Not Found', path: req.path });
        }

        // Find 2 related herbs in same category
        const relatedHerbs = await Herb.find({
            category: herb.category,
            _id: { $ne: herb._id }
        }).limit(2);

        res.render('herbs/show', {
            title: `${herb.name} - AyurVeda Wisdom`,
            path: '/herbs',
            herb,
            relatedHerbs
        });
    } catch (err) {
        console.error("Herb Details Error:", err);
        res.status(500).render('error/500', { title: 'Server Error', path: req.path });
    }
};
