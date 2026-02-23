/**
 * Submit sitemap to Google Search Console (programmatic template)
 *
 * Requirements:
 *  - Node.js installed
 *  - `npm install googleapis` in the workspace (or globally)
 *  - A Google Cloud project with the Search Console API enabled
 *  - A service account with delegated access (or OAuth2 client) and the JSON key
 *  - Your site must be verified in Google Search Console for the exact siteUrl you pass
 *
 * Usage (example):
 *  export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
 *  node scripts/submit-sitemap.js https://duschteknik.se /sitemap.xml
 *
 * Note: Service accounts typically require domain-wide delegation or to be added as a user
 * to the Search Console property. If you prefer the OAuth flow, you can adapt this script
 * to use OAuth2 client credentials instead.
 */

const {google} = require('googleapis');

async function submitSitemap(siteUrl, sitemapPath) {
  // siteUrl must be the verified property in Search Console (exact match)
  // sitemapPath is the path to the sitemap, e.g. '/sitemap.xml' or full URL
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters']
  });

  const authClient = await auth.getClient();
  const webmasters = google.webmasters({version: 'v3', auth: authClient});

  try {
    const res = await webmasters.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapPath
    });
    console.log('Sitemap submitted:', siteUrl, sitemapPath, 'Response status:', res.status);
  } catch (err) {
    console.error('Failed to submit sitemap:', err.message || err);
    process.exitCode = 2;
  }
}

if (require.main === module) {
  const siteUrl = process.argv[2];
  const sitemapPath = process.argv[3];
  if (!siteUrl || !sitemapPath) {
    console.error('Usage: node scripts/submit-sitemap.js <siteUrl> <sitemapPath>');
    console.error('Example: node scripts/submit-sitemap.js https://duschteknik.se /sitemap.xml');
    process.exit(1);
  }
  submitSitemap(siteUrl, sitemapPath);
}
