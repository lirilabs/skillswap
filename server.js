const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Set EJS as the view engine for dynamic metadata injection (OpenGraph)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (including .well-known for App Links)
app.use(express.static(path.join(__dirname, 'public')));

// 1. Profile Deep Links
app.get('/profile/:uid', async (req, res) => {
    const uid = req.params.uid;
    const mockData = {
        title: `Check out my profile on SkillSwap!`,
        description: `I'm using SkillSwap to trade high-end skills. Let's connect!`,
        image: 'https://skillswap-alpha-eight.vercel.app/images/default_banner.png',
        url: `https://skillswap-alpha-eight.vercel.app/profile/${uid}`,
        appLink: `skillswap://profile/${uid}`
    };
    res.render('redirect', mockData);
});

// 2. Swap Request Deep Links
app.get('/swap/:swapId', async (req, res) => {
    const swapId = req.params.swapId;
    const mockData = {
        title: `I'm requesting a Swap!`,
        description: `Can we trade skills? Take a look at my request.`,
        image: 'https://skillswap-alpha-eight.vercel.app/images/default_banner.png',
        url: `https://skillswap-alpha-eight.vercel.app/swap/${swapId}`,
        appLink: `skillswap://swap/${swapId}`
    };
    res.render('redirect', mockData);
});

// 3. Fallback Route
app.get('*', (req, res) => {
    res.send("<h1>Welcome to SkillSwap API</h1><p>Ensure you are on a mobile device with SkillSwap installed.</p>");
});

// Only start the server if run directly (local dev)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 SkillSwap Deep Link Server is running on port ${PORT}`);
        console.log(`🌐 Test routing at: http://localhost:${PORT}/profile/test_uid`);
    });
}

// Export the Express app for Vercel serverless
module.exports = app;
