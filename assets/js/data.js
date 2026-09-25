/* ============================================================
   SITE DATA
   ------------------------------------------------------------
   Two things live here, both meant to be edited freely:

   1. HERO_IMAGES - the photos that rotate behind the hero quote.
      Three original generated backgrounds ship as defaults.
      TO ADD YOUR OWN PHOTOS:
        a) drop the image file into assets/images/hero/
        b) add its filename to the HERO_IMAGES array below
        c) delete lines you don't want (the defaults are safe
           to remove once you have real photos)
      Use wide/landscape photos, ideally 1900px+ wide, so they
      stay sharp on large screens.

   2. QUOTES - one is chosen at random on every page load and
      shown over the hero image. Add / remove / edit freely -
      keep "text" and "author" as separate fields.
============================================================ */


const HERO_IMAGES = [
  'assets/images/hero/hero-1.svg',
  'assets/images/hero/hero-2.svg',
  'assets/images/hero/hero-3.svg',
];


/*
const HERO_IMAGES = [
  'assets/images/hero/hero-background.jpg',
];
*/

const QUOTES = [
  {
    text: "The task is not so much to see what no one has yet seen, but to think what nobody has yet thought, about that which everybody sees.",
    author: "Erwin Schrödinger"
  },
  {
    text: "My goal is simple. It is a complete understanding of the universe, why it is as it is and why it exists at all.",
    author: "Stephen Hawking"
  },
];

// Exposed on window so main.js can read them without a bundler/import step.
window.SITE_DATA = { HERO_IMAGES, QUOTES };
