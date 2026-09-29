# Teaser

Author as a table in Google Docs / Word. First row is the block name (spans both columns). One row with two cells: an image and a text cell. The text cell can hold an optional pretitle line, a heading, description text and a link — add or drop any of them as needed.

| Teaser |  |
| --- | --- |
| ![The Lennard River carving a canyon in Western Australia](./media_1.jpeg) | Featured Article<br>## Camping in Western Australia<br>The Australian West coast is a camper's heaven. Endless miles of desert roads leading to secret beaches, vast canyons and crystal clear rivers, and the very few people you are likely to meet on your journey will be some of the most easy-going characters you'll find anywhere in the world.<br>[Full Article](/us/en/magazine/western-australia.html) |

Notes:
- The first line ("Featured Article") is optional — include it only when you want the small eyebrow label above the heading; leave it out for a plain teaser.
- The CTA link on its own line is auto-wrapped as a button (`.button-wrapper`/`.button`) by the standard docx/gdoc conversion.
- Add `reverse` next to the block name (`Teaser (reverse)`) to flip the image to the right on desktop.
