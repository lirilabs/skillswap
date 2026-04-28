const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Set EJS as the view engine for dynamic metadata injection (OpenGraph)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (including .well-known for App Links)
app.use(express.static('public'));

// 1. Profile Deep Links
app.get('/profile/:uid', async (req, res) => {
    const uid = req.params.uid;
    // (Optional) Here you would fetch the user's data from Firebase Admin SDK
    // to populate dynamic OpenGraph tags with their real display name & photo.
    const mockData = {
        title: `Check out my profile on SkillSwap!`,
        description: `I'm using SkillSwap to trade high-end skills. Let's connect!`,
        image: 'https://skillswap.app/images/default_banner.png',
        url: `https://skillswap.app/profile/${uid}`,
        appLink: `skillswap://profile/${uid}` // Custom URI fallback
    };
    res.render('redirect', mockData);
});

// 2. Swap Request Deep Links
app.get('/swap/:swapId', async (req, res) => {
    const swapId = req.params.swapId;
    const mockData = {
        title: `I'm requesting a Swap!`,
        description: `Can we trade skills? Take a look at my request.`,
        image: 'https://skillswap.app/images/default_banner.png',
        url: `https://skillswap.app/swap/${swapId}`,
        appLink: `skillswap://swap/${swapId}`
    };
    res.render('redirect', mockData);
});

// 3. Fallback Route
app.get('*', (req, res) => {
    res.send("<h1>Welcome to SkillSwap API</h1><p>Ensure you are on a mobile device with SkillSwap installed.</p>");
});

// Only start the server if run directly (allows local testing)
// Vercel Serverless instances will just import 'app' and handle routing internally.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 SkillSwap Deep Link Server is running on port ${PORT}`);
        console.log(`🌐 Test routing at: http://localhost:${PORT}/profile/test_uid`);
    });
}

// Export the Express API for Vercel
module.exports = app;
