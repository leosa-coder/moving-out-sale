import { normalizeRows, type RawRow } from "./catalog";

export const rawRows = [
  {
    "Items": "Living Room",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "Samsung TV",
    "Description": "8K Mini-LED 85” QN800D\nhttps://www.harveynorman.com.au/samsung-85-inch-qn800d-neo-qled-8k-mini-led-smart-ai-tv.html?srsltid=AfmBOoqaeB0v9TsTP3vOS5x5SkZTzjHr2PsOEky-CryxTqP0CdNzmbHw",
    "Selling for": 4500
  },
  {
    "Items": "Sony TV with wall mount brackets",
    "Description": "OLED 65”",
    "Selling for": 500
  },
  {
    "Items": "Samsung soundbar + 2 rear speakers all with wall mount brackets + Subwoofer",
    "Description": "Samsung Q Series Q930C 9.1.4 Channel Soundbar with Wireless Subwoofer [2023]",
    "Selling for": 400
  },
  {
    "Items": "Adsila 2.4m Buffet Unit in NZ Natural Ash",
    "Description": "Adsila 2.4m Buffet Unit - NZ Natural Ash | Interior Secrets\n($1640)",
    "Selling for": 1000
  },
  {
    "Items": "Loft Mini Right Corner Sofa with chaise in Florence White + Guardsman 5 year warranty expiring on 26 Jan 2030",
    "Description": "https://www.loungelovers.com.au/loft-mini-right-corner-sofa-florence-natural?kw=&cpn=23599867353&gad_source=1&gad_campaignid=23605390460&gbraid=0AAAAADo9YFjdKO3mX2rRONa5dwDs5NnPh&gclid=Cj0KCQjwrs7RBhDuARIsAIVfBD0id2nGnF07aDvBFusk7IkEd2li91pHvnjkaQrPvZAhjyymFC3LJggaAk2YEALw_wcB\n($2799)",
    "Selling for": 1900
  },
  {
    "Items": "Koala 2-3 seater sofa bed",
    "Description": null,
    "Selling for": 500,
    "Sold": true
  },
  {
    "Items": "2 Ottoman (Grey)",
    "Description": null,
    "Selling for": 10
  },
  {
    "Items": "Kitchen & Dining Room",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "6 seater dining table with 6 chairs",
    "Description": "Olivia Dining Table - 180 x 100cm in Solid American Oak\n($1673)\n\nhttps://www.iconbydesign.com.au/products/nestor-dining-chair-oak-pewter-grey-fabric\n($354 each)",
    "Selling for": 1900
  },
  {
    "Items": "Water filter",
    "Description": "https://purewatersystems.com.au/products/ro-5u-reverse-osmosis-water-purifier-system-only",
    "Selling for": 900
  },
  {
    "Items": "Laundry",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "Washing machine",
    "Description": "Haier\nCurrect cheapest online: \nhttps://appliancesdeals.com.au/products/haier-8-5kg-front-load-washer-hwf85an1?variant=41033796255807&country=AU&currency=AUD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorTKhB5zYUhwRK7UQv-l1psIhKzgacHIoWzcH3fIIkkgdkAI40LRe8 ($499)",
    "Selling for": 200
  },
  {
    "Items": "Ironing board with Iron",
    "Description": "Hills ironing board\nPhilips iron",
    "Selling for": 60
  },
  {
    "Items": "Bedroom",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "King single bed frame with mattress (and pillow)",
    "Description": "Emma\nDec 2022",
    "Selling for": 500
  },
  {
    "Items": "Double foldable foam mattress",
    "Description": "Zinus Trifold Folding Foam Mattress Foldable Topper | Portable Travel Camping Trailer Folded Bed Mat Pad ($139)",
    "Selling for": 50
  },
  {
    "Items": "Study",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "Gaming/Computer desk",
    "Description": null,
    "Selling for": 150
  },
  {
    "Items": "Desky Electric standing desk + Desky computer chair\n(comes with 2 grommet holes, heavy duty ultrawide monitor arm and integrated cable & power channel)",
    "Description": "https://desky.com.au/products/dual-hardwood-stand-up-desk?variant=41196523192476\n\nhttps://desky.com.au/products/desky-pro-ergonomic-chair?variant=40639321112732",
    "Selling for": 1000
  },
  {
    "Items": "Secret Lab Dark Knight Edition Gaming Chair",
    "Description": "https://secretlabchairs.com.au/products/titan-evo-2022-series?sku=M07-E24PU-BATMN1R",
    "Selling for": 300
  },
  {
    "Items": "Sound Blaster Katana V1 soundbar + subwoofer virtual 5.1 surround",
    "Description": "https://www.centrecom.com.au/creative-katana-v2x-tri-amplified-multi-channel-super-x-fi-gaming-soundbar-with-compact-subwoofer?gad_source=1&gad_campaignid=17423751068&gbraid=0AAAAADrCcHoIyFKmSjkOuwcm_-RxVzZbb&gclid=Cj0KCQjwrs7RBhDuARIsAIVfBD2X94usTE-GR87lDBMNfzqh6GrRRXTWwSLHyDVdStLhRnGcYmkKRMcaAkUbEALw_wcB",
    "Selling for": 150
  },
  {
    "Items": "Printer & Scanner",
    "Description": "https://www.officeworks.com.au/shop/officeworks/p/canon-pixma-ts8360bka-multifunction-home-printer-cats8360an",
    "Selling for": 40,
    "Sold": true
  },
  {
    "Items": "Entertainment & Toys",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "PS 5 console + extra controller\n+ 3 games",
    "Description": "2020-2021\nCurrect cheapest online: https://www.woolworths.com.au/shop/productdetails/1116439429?srsltid=AfmBOoq0BzWJ9UPB2i8Kd8WE1P7v0oBgQEfBazi86zsmUk6_C9n-sP02kr0 ($899)",
    "Selling for": 500,
    "Sold": true
  },
  {
    "Items": "Yamaha digital piano with stand and pedal + bench",
    "Description": "Yamaha P-145",
    "Selling for": 400,
    "Sold": true
  },
  {
    "Items": "Toy storage unit (Ikea - Trofast)",
    "Description": "https://www.ikea.com/au/en/p/trofast-storage-combination-with-boxes-light-white-stained-pine-grey-s39606814/",
    "Selling for": 60,
    "Sold": true
  },
  {
    "Items": "Kids tent (Ikea-Cirkustalt)\nFolding gym mat (Ikea - Passbit)",
    "Description": "CIRKUSTÄLT children's tent, red/blue white - IKEA\n\nPASSBIT folding gym mat, green, 120x225 cm - IKEA",
    "Selling for": 30
  },
  {
    "Items": "Kids table with 2 chairs (plastic)",
    "Description": "https://www.babybunting.com.au/product/4baby-plastic-table-ice-pink-122478?cq_src=google_ads&cq_cmp=23193713688&cq_con=&cq_term=&cq_med=pla&cq_plac=&cq_net=x&cq_pos=&cq_plt=gdp&gad_source=1&gad_campaignid=23203169227&gbraid=0AAAAADvv_-A23ZZ5C_QImRahKaX00a89U&gclid=Cj0KCQjwrs7RBhDuARIsAIVfBD2wpJZlVETYuRlX5oPvBd6zD82WrhNK2FCJxwrQ35GcJQ6_2Tkj2ykaAl0kEALw_wcB",
    "Selling for": 75
  },
  {
    "Items": "Kaitlin’s balance bike",
    "Description": "Little Nation",
    "Selling for": 30
  },
  {
    "Items": "Kamilah’s balance bike",
    "Description": "Little Nation",
    "Selling for": 30
  },
  {
    "Items": "Kids bike with balancers",
    "Description": null,
    "Selling for": 40,
    "Sold": true
  },
  {
    "Items": "Kids bike with balancers",
    "Description": null,
    "Selling for": 40
  },
  {
    "Items": "Outdoor",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "Ziegler & Brown BBQ",
    "Description": null,
    "Selling for": 100
  },
  {
    "Items": "Outdoor lounge",
    "Description": null,
    "Selling for": 200,
    "Sold": true
  },
  {
    "Items": "Others",
    "Description": null,
    "Selling for": null
  },
  {
    "Items": "Christmas tree + Christmas decorations",
    "Description": null,
    "Selling for": 50
  },
  {
    "Items": "Samsung Air purifier",
    "Description": null,
    "Selling for": 120,
    "Sold": true
  },
  {
    "Items": "Dehumidifier 1",
    "Description": "Ausclimate",
    "Selling for": 60
  },
  {
    "Items": "Dehumidifier 2",
    "Description": "Ausclimate",
    "Selling for": 60
  },
  {
    "Items": "Pram and capsule bundle and rumble seat",
    "Description": "Uppababy Vista V2\nMelange - Stella\nCurrent cheapest online on V3 ($1499)\n\nRumble seat ($349)",
    "Selling for": 700
  },
  {
    "Items": "Car seat (Kaitlin’s)",
    "Description": "Britax Safe N Sound B-Grow ClickTight+ Car Seat Black Opal - $649",
    "Selling for": 250
  }
] satisfies RawRow[];

export const items = normalizeRows(rawRows);

export const categories = Array.from(new Set(items.map((item) => item.category)));
