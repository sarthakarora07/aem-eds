# Carousel

Author as a table in Google Docs / Word. First row is the block name (spans both columns). Every row after that is one slide, with two cells: an image and a text cell (heading, description, link). Add or remove rows to add or remove slides.

| Carousel |  |
| --- | --- |
| ![Woman relaxing by a river](./media_1.jpeg) | ## WKND Adventures<br>Join us on one of our next adventures. Browse our list of curated experiences and sign up for one when you're ready to explore with us.<br>[View Trips](/us/en/adventures.html) |
| ![Beach walking](./media_2.jpeg) | ## San Diego Surf Spots<br>From the hippie beaches of Ocean Beach to the ritzy shores of La Jolla and everywhere in between. Discover the San Diego surf scene.<br>[Full Article](/us/en/magazine/san-diego-surf.html) |
| ![Skier on a mountain](./media_3.jpeg) | ## Downhill Skiing Wyoming<br>A skiers paradise far from crowds and close to nature with terrain so vast it appears uncharted.<br>[View Trip](/us/en/adventures/downhill-skiing-wyoming.html) |

Notes:
- Text cell can hold any mix of heading, paragraphs and a link — same as the `cards` block, a cell is only treated as the image when it contains just a picture.
- The CTA link on its own line is auto-wrapped as a button (`.button-wrapper`/`.button`) by the standard docx/gdoc conversion.
- Autoplay defaults to 5s, pauses on hover/focus, and is disabled automatically for `prefers-reduced-motion`.
