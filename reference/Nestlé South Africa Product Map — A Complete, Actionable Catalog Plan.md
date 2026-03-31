# Nestlé South Africa Product Map — A Complete, Actionable Catalog Plan

## Executive Summary

This report provides a comprehensive, SKU-level catalog plan for Nestlé South Africa, transforming raw product data into an actionable architecture for retail, B2B, and internal operations. 

**Key Strategic Insights:**
* **Portfolio concentration with breadth:** The catalog encompasses at least 117 named line items across 10+ distinct categories, ranging from coffee and confectionery to highly specialized medical nutrition [product_portfolio_summary[0]][1]. **Action:** Structure the master list by category and sub-line, expanding to the SKU level per pack size to reflect actual buying units.
* **Localization is a competitive anchor:** South Africa-specific items drive significant loyalty. Heritage products like Nescafé Ricoffy (launched as RICORY in 1952) and Peppermint Crisp (manufactured in East London) anchor the portfolio [south_africa_specific_brands.0.brand_name[0]][2] [south_africa_specific_brands.1.brand_name[1]][3]. **Action:** Tag "SA-core" attributes in the catalog to prioritize shelf-space and promotions for locally resonant SKUs.
* **Certification risk is SKU-level, not brand-level:** Halaal and Kosher status varies strictly by SKU and origin. While locally made KitKat is SANHA Halaal certified, imported variants may not be [certifications_overview[1]][4] [certifications_overview[2]][5]. **Action:** Add a mandatory "Certification" field per SKU, require on-pack logo verification, and insert standing disclaimers for imported items.
* **Infant/toddler nutrition is complex and regulated:** With over 29 items spanning infant formulas, cereals, and toddler milks, age-stage labeling is critical [product_portfolio_summary[8]][6] [product_portfolio_summary[9]][7]. **Action:** Maintain explicit attributes for Age Stage and Indication to ensure compliant messaging and prevent misplacement.
* **Lifecycle management requires strict tracking:** The portfolio is dynamic, featuring 2024–2026 innovations (e.g., unsweetened Cerelac, 2026 Easter KitKat eggs) and legacy discontinued items (e.g., Chocolate Log retired in 2020) [recent_innovations_and_limited_editions.0.product_name[0]][1] [recent_innovations_and_limited_editions.1.product_name[0]][8] [discontinued_products_list.0.product_name[0]][9]. **Action:** Implement "Status" (Active/Seasonal/Discontinued) and "Year" fields to manage quarterly reviews and search redirects.
* **Pack-size diversity drives price-point strategy:** Products like Cremora and MAGGI noodles span single-serve sachets to bulk foodservice formats [product_portfolio_summary[6]][10] [culinary_products_maggi.0.pack_sizes[0]][11]. **Action:** Expand each line item to discrete SKUs per pack size, capturing unit of measure and intended channel.

## Purpose & Deliverable

The objective of this initiative is to build a verified, channel-aware, and certification-ready product master catalog for Nestlé South Africa. This deliverable serves as the single source of truth for retail listings, B2B wholesale portals, and internal operations. 

### Scope and Success Criteria
Success is defined by achieving 100% coverage of all known active, seasonal, and discontinued product lines. The catalog must be expanded to the SKU level, capturing discrete pack sizes, exact flavor variants, and critical compliance data (such as age-stage appropriateness and Halaal/Kosher certification status).

### Master Data Schema
To prevent rework and ensure data integrity across platforms, the catalog must utilize a consistent schema. Required fields include: *Brand, Sub-brand/Product Line, Variant/Flavor, Format, Pack Size(s), Age Stage/Indication, Channel (Retail/Professional/Medical), Status (Active/Seasonal/Discontinued), Launch/Change Year, Key Claims, Certification (Type/Body/Origin), Verification Status, Notes,* and *Source*. Future validation passes must collect Barcodes and Case Sizes.

## Portfolio Architecture

The Nestlé South Africa portfolio is vast, covering at least 117 named lines. To match how South Africans shop and how distributors procure, the architecture is organized by category first, then expanded to SKUs per pack size.

### Category Taxonomy
The taxonomy mirrors consumer and professional purchasing behavior:
1. Coffee & Hot Beverages
2. Creamers & Dairy Powders
3. Chocolate & Confectionery
4. Breakfast Cereals (General)
5. MAGGI Culinary
6. Infant & Baby Cereals
7. Infant Formula
8. Toddler & Growing-Up Milks
9. Health Science & Medical Nutrition
10. Ice Cream & Frozen
11. Professional Foodservice

### Channel Mapping Rules
A single product can live in multiple channels (Retail, Professional, Medical) but must be mapped with distinct SKUs to avoid duplication. For example, Milo exists as a retail powder and a Professional Bag-in-Box concentrate; these must be maintained as one "product line" master with distinct "SKU children" based on channel and pack size.

## Coffee & Hot Beverages

Nescafé dominates the South African hot beverage ecosystem, supported by premium expansions through Starbucks and capsule systems. The portfolio spans instant granules, indulgent sachets, capsules, and liquid concentrates.

| Brand | Product Line | Variant / Flavor | Format | Pack Sizes |
| :--- | :--- | :--- | :--- | :--- |
| Nescafé | Classic | Regular | Instant granules / Sachets | Retail jars, Sachets, 1kg jar |
| Nescafé | Classic | Decaf | Instant granules / Sachets | 200g jar, Bulk decaf sachets |
| Nescafé | GOLD | Arabica/Robusta Blends | Instant granules / Sachets | Retail jars, Sachets, Bulk buy |
| Nescafé | Cappuccino | Vanilla Latte, Salted Caramel, KitKat Mocha, Reduced Sugar | Sachet mixes | Retail multipacks (e.g., 10x18g) |
| Nescafé | Espresso Concentrate | Black, Sweet Vanilla | Bottled liquid concentrate | 500ml bottle |
| Nescafé | Ricoffy | Original | Instant granules | 750g tin, 1.5kg tin, 2.4kg tin |
| Nescafé | Ricoffy | Decaf | Instant granules | Retail tins/jars |
| Nescafé | Ricoffy | 3-in-1 | Sachets | Sachets |
| Starbucks | by Nespresso | Sumatra, Italian Roast, House Blend | Capsules | 10-capsule packs |
| Nescafé | Dolce Gusto | Various | Capsules | Standard retail packs |
| Nespresso | Original | Various | Capsules | Standard retail packs |
| Milo | Milo | Original | Powder / Sachets | Retail jars, sachets, single-serve |
| Nestlé | Hot Chocolate | Original | Powder / Sachets | Retail jars and sachets |

**System Compatibility Labels:** Capsule products must include explicit compatibility notes (e.g., "For Nespresso Original systems" vs. "For Dolce Gusto") to reduce customer confusion and retail returns.
**Professional Crossovers:** Items like Ricoffy 1.5kg/2.4kg tins and Classic 1kg jars cross over heavily into the Professional Foodservice channel and require dual-channel mapping [professional_foodservice_products.2.solution_or_brand[0]][12].

## Creamers & Dairy Powders

Cremora is a local staple for coffee and tea, while multi-size milk powders like Nespray, KLIM, and Nido anchor family nutritional use [product_portfolio_summary[9]][7].

| Brand | Product Name | Variant | Format | Pack Sizes | Key Claims |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Cremora | Coffee and Tea Creamer | Original | Sachet / Pouch / Box | 125g, 500g, 750g | Sweetened non-dairy creamer [creamers_and_dairy_products.0.brand[3]][10]. |
| Nespray | Nespray FortiGrow | FortiGrow | Pouch | 250g, 400g, 850g, 1.8kg | Blend of vitamins A, B-group, C, Iron, Zinc [creamers_and_dairy_products.1.brand[0]][13]. |
| Nespray | Nespray Milk Powder | Medium Cream | Pouch | 1.8kg, 2kg | Milk powder formulation. |
| KLIM | Full Cream Instant Milk Powder | Full Cream | Pouch / Tin | 250g, 400g, 500g, 900g, 1.8kg | Source of Protein, Vitamin D, Calcium, Iron, Vitamin A [creamers_and_dairy_products.3.brand[1]][7]. |
| Nido | NIDO 3+ | 3+ | Tin / Pouch | Various retail formats | Source of vitamins, Iron, Zinc, DHA, probiotic L. rhamnosus [creamers_and_dairy_products.4.brand[0]][14]. |

## Chocolate & Confectionery

The confectionery portfolio is anchored by strong local icons. Multiple pack sizes (from 17g singles to 400g sharing bags) enable a robust price-laddering strategy.

| Brand | Product Name | Format | Flavor / Variant | Pack Sizes |
| :--- | :--- | :--- | :--- | :--- |
| KitKat | 4 Finger | Countline / Slab | Milk, White, Dark, Gold | 41.5g |
| KitKat | 2 Finger | Countline | Milk | 20g |
| KitKat | Chunky | Countline | Milk, Gold, White, Peanut Butter | 40g, 42g |
| KitKat | Slab | Slab | Milk, White, Gold, Dark | 85g, 135g |
| KitKat | Minibag | Sharing bag / Minis | Milk | 180g |
| Bar One | BAR·ONE | Countline / Slab | Original | 21g, 52g, 84g |
| Bar One | BAR·ONE Mini bag | Sharing bag / Minis | Original | 189g |
| Aero | AERO | Slab | Milk, Duet, Dark, Mint | 40g, 85g, 135g |
| Aero | AERO Baking | Baking slab | Milk | 175g |
| Smarties | Smarties | Dragees / Sharing bag | Milk Chocolate | 17g, 40g, 70g, 135g, 400g |
| Smarties | Smarties Slab | Slab | Milk Chocolate | 80g |
| Milkybar | Milkybar | Countline / Slab | White Chocolate, Krackle, Coconut, Caramel Gold | 40g, 80g, 85g, 150g |
| Milkybar | Milkybar Minis | Sharing bag / Minis | White Chocolate | 160g |
| Peppermint Crisp | Peppermint Crisp | Countline | Peppermint | 49g |
| Tex | Tex | Countline | Original | 18g, 40g, 58g |
| Tex | Tex MiniBag | Sharing bag / Minis | Original | 130g, 182g, 200g |
| Rolo | Rolo | Countline / Multipack | Caramel | 50g, 150g |
| Quality Street | Quality Street | Gift Box / Sharing Bag | Assorted | 232g, 435g |
| Passions | Passions | Sharing bag | Assorted | 130g, 300g |

**Seasonal Note:** The catalog must accommodate seasonal SKUs, such as the KitKat Chunky Funky Incredible Egg and KitKat Crispy Egg launched for the Easter 2026 season [recent_innovations_and_limited_editions.1.product_name[0]][8].

## Breakfast Cereals (General)

Nestlé's mainstream breakfast cereal presence (via Cereal Partners Worldwide) focuses on whole grain and energy claims.

| Brand | Variant | Pack Size | Key Nutritional Claims |
| :--- | :--- | :--- | :--- |
| Cheerios | Honey Flavoured Cereal | 490g | Made with 3 whole grains (oats, wheat, barley), high fibre, fortified with 7 vitamins and 2 minerals [breakfast_cereals.0.brand[0]][15]. |
| Milo | Energy Cereal | 450g | Made with whole grain, source of 5 vitamins, iron, calcium, contains Activ-Go™ [breakfast_cereals.1.brand[0]][16]. |

## MAGGI Culinary

MAGGI is a cornerstone of South African culinary habits, offering quick meal solutions and flavor enhancements, including the highly localized Durban Curry flavor.

| Product Family | Flavor / Variant | Format | Pack Sizes |
| :--- | :--- | :--- | :--- |
| 2-Minute Noodles | Beef | Instant dry noodles | 68g single pack, 5 x 68g multipack [culinary_products_maggi.0.pack_sizes[0]][11] |
| 2-Minute Noodles | Cheese | Instant dry noodles | 68g single pack, 5 x 68g multipack |
| 2-Minute Noodles | Chicken | Instant dry noodles | 68g single pack, 5 x 68g multipack |
| 2-Minute Noodles | Durban Curry | Instant dry noodles | Multipack referenced |
| Stock Cubes | Beef | Cube | Various retail pack sizes |
| Stock Cubes | Chicken | Cube | Various retail pack sizes |
| Soups | Various | Powder | Various retail pack sizes |
| Sauces | Various Table Sauces | Liquid | Various retail pack sizes |
| Seasonings | Various Recipe Seasonings | Powder / paste | Various retail pack sizes |

## Infant & Baby Cereals

This category is highly regulated and stage-based. A major 2024 innovation was the launch of the unsweetened range in South Africa to address sugar concerns [recent_innovations_and_limited_editions.0.product_name[0]][1].

| Brand | Product Line | Age Stage | Variant | Pack Size |
| :--- | :--- | :--- | :--- | :--- |
| Cerelac | Cerelac Regular | Stage 1 (from 6 months) | Wheat | 200g, 500g, 1kg |
| Cerelac | Cerelac | From 6 months | Unsweetened Range | Various |
| Cerelac | Cerelac | 7 months | Various Flavours | Various |
| Cerelac | Cerelac | 9 months | Various Flavours | Various |
| Cerelac | Cerelac | 12+ months | Pieces & Textures | Various |
| Cerelac | Cerelac Organic Selection | 12-36 months | Wheat Oat & Banana | Various |
| Cerelac | Cerelac Puffs | 12+ months | Savoury Spinach, Savoury Tomato | Various [recent_innovations_and_limited_editions.4.product_name[0]][17] |
| Nestum | Nestum | From 6 months | Various Flavours | 200g, 500g, 1kg |
| Nestum | Nestum | From 7 months | Various Flavours | Various |
| Nestum | Nestum | From 9 months | Various Flavours | Various |
| Nestum | Nestum | From 6 months | Unsweetened Range | Various |

## Infant Formula

The NAN and Lactogen portfolios cover core nutritional needs alongside highly specialized indications (e.g., regurgitation, digestive comfort).

| Brand | Product Line | Age Stage | Variant / Indication | Pack Size |
| :--- | :--- | :--- | :--- | :--- |
| NAN | NAN OPTIPRO | Stage 1 (from birth) | Starter Infant Formula | 800g |
| NAN | NAN OPTIPRO | Stage 2 (6-12 months) | Follow-on Formula | 800g |
| NAN | NAN SUPREMEpro | Stage 1 (from birth) | Starter Infant Formula | 800g |
| NAN | NAN SUPREMEpro | Stage 2 (6-12 months) | Follow-on Formula | 800g |
| NAN | NAN A.R. | From birth | For Babies with Regurgitation | 800g [infant_and_baby_nutrition.4.brand[0]][18] |
| NAN | NAN A2 | Stage 1 (from birth) | Premium Baby Formula | 800g |
| NAN | NAN COMFORT | Stage 2 (6-12 months) | For digestive comfort | 800g |
| NAN | NAN CARE | Infant | Probiotic Drops (Immune Health) | 5mL |
| NAN | NAN CARE | Infant | Probiotic Drops (Gut Health) | 10mL |
| Lactogen | Lactogen | Starter/Follow-on | Infant/Child Milk Powder | Various (bag-in-box/tin) [infant_and_baby_nutrition.9.brand[0]][19] |

## Toddler & Growing-Up Milks

Targeting children aged 1 to 5 years, these milks bridge the gap between infant formula and standard dairy, featuring specific fortifications.

| Brand | Product Name | Target Age Group | Key Features | Pack Size |
| :--- | :--- | :--- | :--- | :--- |
| NAN | NAN OPTIPRO 3 | 1+ years | Toddler milk drink | 800g |
| NAN | NAN SUPREMEpro 3 | 1+ years | Fortified with iron and B12 | 800g |
| NAN | NAN SUPREMEpro 4 | 2+ years | Fortified with iron and B12 | 800g |
| NAN | NAN COMFORT 4 | 2+ years | For digestive comfort | 800g |
| Lactokid | Lactokid 4 | 3-5 years | Contains Comfortis probiotic | Various |
| Nankid | Nankid OPTIPRO 4 | From age 3 years | Premium drink for young children | Various |
| Nido | NIDO 3+ | 3-5 years | Source of vitamins, DHA, probiotics | Various [toddler_and_child_milk_drinks.6.brand[0]][6] |

## Health Science & Medical Nutrition

Nestlé Health Science provides specialized oral and enteral nutrition. Note that products like NAN A.R. and Lactokid overlap with infant/toddler categories but are managed here for medical indications.

| Brand | Product Name | Format | Primary Indication |
| :--- | :--- | :--- | :--- |
| Peptamen | Peptamen (Standard) | Enteral formula | Impaired GI function |
| Peptamen | Peptamen AF | Enteral formula | High protein/energy with fish oil |
| Peptamen | Peptamen HN | Enteral formula | High-nitrogen for impaired GI |
| Peptamen | Peptamen Junior | Enteral formula | Children 1-10 years with impaired GI |
| Peptamen | Peptamen Junior Advance | Ready-to-Hang | Advanced formula for children 1-10 |
| Peptamen | Peptamen with Prebio | Ready-to-Drink 250mL | Oral/tube feeding with prebiotics |
| Nutren | Nutren Fibre | Oral supplement | Supplement with added fiber [health_science_and_medical_nutrition.6.brand[0]][20] |
| Resource | Resource Support Plus | Oral supplement | Targeted at oncology patients [health_science_and_medical_nutrition.7.brand[0]][21] |
| Resource | Resource Refresh | Oral supplement | For patients with dysgeusia/mucositis |
| Resource | Resource Fruit Beverage | Oral supplement | Fruit-flavored clear fluid |
| Resource | Resource Whey Protein | Powder | Additional protein needs |
| Nestlé Nutrition | Materna | Vitamins / Gummies | Prenatal supplement with DHA |

## Ice Cream & Frozen

The frozen footprint is currently narrow in the documented dataset.

| Brand | Flavor | Format |
| :--- | :--- | :--- |
| Bar One | Bar One | Tub |
| Rolo | Rolo | Tub |

*Action:* Verify with Nestlé SA or distributors if additional SKUs (e.g., stick ice creams, multipacks) exist before finalizing the "all products" claim for this category.

## Professional Foodservice

Nestlé Professional caters to out-of-home channels with bulk and specialized formats, including the Starbucks partnership.

| Solution / Brand | Product Type | Format | Specific Example |
| :--- | :--- | :--- | :--- |
| We Proudly Serve Starbucks | Coffee beans | Whole beans | Starbucks Blonde Espresso Roast [professional_foodservice_products.0.solution_or_brand[0]][22] |
| We Proudly Serve Starbucks | Single-serve coffee | Capsules | Starbucks by Nespresso Italian Roast |
| Nescafé Professional | Instant coffee | Bulk tin / jar | Nescafé Classic 1kg |
| Nescafé Professional | Instant coffee blend | Bulk tin | Nescafé Ricoffy 1.5kg / 2.4kg |
| Nescafé Professional | Vending powder | Bag-in-box / sachet | Nescafé GOLD Sachets |
| Maggi Professional | Culinary base | Bulk powder | Maggi chicken & beef bases [professional_foodservice_products.5.solution_or_brand[0]][23] |
| Maggi Professional | Sauce / Seasoning | Bulk paste / liquid | Maggi Seasoning |
| MILO | Beverage concentrate | Bag-in-Box | MILO concentrate (2 x 4 L) |
| Nestlé Beverage Solutions | Creamer | Bulk powder | Nestlé Cremora wholesale |
| Nestlé Beverage Solutions | Hot Chocolate | Bulk powder | Nestlé Hot Chocolate |

## SA-Specific Brands & Localization

Local heritage drives immense brand loyalty in South Africa. These items require prominent placement and availability assurance.

| Brand Name | Category | Localization Notes |
| :--- | :--- | :--- |
| Nescafé Ricoffy | Instant Coffee | Launched as RICORY in 1952; locally formulated chicory blend [south_africa_specific_brands.0.brand_name[0]][2]. |
| Peppermint Crisp | Confectionery | Iconic SA product; local manufacturing at the East London factory [south_africa_specific_brands.1.brand_name[1]][3]. |
| Cremora | Creamer | The 125g sachet is a core local SKU tailored to the SA market [south_africa_specific_brands.2.brand_name[0]][10]. |
| Maggi 2-Minute Noodles | Culinary | "Durban Curry" is a regional flavor unique to SA culinary tastes. |

## Innovations 2024–2026

Tracking new launches is vital for promotional planning and capturing early market share.

| Product Name | Innovation Type | Launch Year | Description |
| :--- | :--- | :--- | :--- |
| Unsweetened Cerelac/Nestum | New range | 2024 | Unsweetened infant cereals launched in SA [recent_innovations_and_limited_editions.0.product_name[0]][1]. |
| Cerelac Organic Selection | New range | 2024 | Organic baby cereals (e.g., Wheat Oat & Banana). |
| Cerelac Puffs | New range | 2024 | Savoury snack puffs for toddlers (Spinach/Tomato) [recent_innovations_and_limited_editions.4.product_name[0]][17]. |
| MAGGI 2-Minute Noodles | Reformulation | 2024 | Improved chicken and beef flavors. |
| Nescafé Cappuccino KitKat Mocha | New flavor | 2025 | Co-branded sachet combining cappuccino and KitKat. |
| Nescafé Espresso Concentrate | New range | 2025 | Bottled coffee concentrate (Black, Sweet Vanilla). |
| KitKat Chunky Funky Incredible Egg | Seasonal edition | 2026 | Easter 2026 limited-edition chocolate egg [recent_innovations_and_limited_editions.1.product_name[0]][8]. |
| KitKat Crispy Egg | Seasonal edition | 2026 | Easter 2026 limited-edition crispy egg. |

## Discontinued & Rationalization

Maintaining a "discontinued" list handles shopper queries gracefully and prevents erroneous B2B ordering.

| Product Name | Brand | Discontinuation Year |
| :--- | :--- | :--- |
| Nestlé Chocolate Log | Nestlé | 2020 [discontinued_products_list.0.product_name[0]][9] |
| Bar One Peanut | Bar One | 2020 |
| Milkybar Peanut | Milkybar | 2020 |
| Milkybar Double | Milkybar | 2020 |
| Milo 8 | Milo | 2020 |
| Milkybar 8 | Milkybar | 2020 |

## Certification & Compliance

There is no blanket Halaal or Kosher certification for Nestlé brands in South Africa; certification is strictly SKU-level [certifications_overview[0]][24]. For example, while KitKat products manufactured in South Africa are certified Halaal by SANHA, imported variants of the same brand may not be [certifications_overview[1]][4] [certifications_overview[2]][5]. 

**Process Implementation:** 
Add specific Certification fields to the database. Store pack art to verify on-pack logos (e.g., SANHA). Maintain a contact log with Nestlé Consumer Services to verify the status of imported SKUs, and display a standing disclaimer on e-commerce platforms advising consumers to check physical packaging.

## Data Gaps & Verification Plan

Before publishing the catalog as v1.0, several data loops must be closed:
* **Barcode Capture:** Collect GTIN/EAN barcodes for all retail SKUs.
* **Pack Size Verification:** Replace "Various" entries (especially in infant nutrition and Maggi products) with exact grammage/volume metrics.
* **Origin Check:** Document local vs. imported status to clarify certification risks.
* **Frozen & Professional Confirmation:** Verify with distributors if additional ice cream tubs or professional bulk items exist.

## Build Plan & Timeline

A 2-week sprint is recommended to push this catalog to v1.0:
* **Days 1–3:** Normalize all 117+ lines into the master schema.
* **Days 4–7:** Expand product lines into discrete SKUs based on pack sizes.
* **Days 8–10:** Execute the certification and channel verification plan (flagging imported vs. local).
* **Days 11–14:** QA review, publish v1.0, and establish the quarterly change-log cadence.

## Appendices

* **Appendix A:** Master SKU schema (field dictionary for database ingestion).
* **Appendix B:** Source mapping to research entries.
* **Appendix C:** Verification checklist (pack photos, cert body, origin).
* **Appendix D:** Known seasonal calendar (e.g., Easter 2026 KitKat examples).

## References

1. *NESTLÉ EAST AND SOUTHERN AFRICA REGION (ESAR)*. https://www.nestle-esar.com/sites/g/files/pydnoa441/files/2025-04/Nestle-CSV-Publication-2024.pdf
2. *Nescafe RICOFFY | Nescafe | Nescafe South Africa*. https://www.nescafe.com/za/coffees/nescafe-ricoffy
3. *What happened to all the Peppermint Crisp bars? Nestlé apologises for chocolate shortage after factory ‘breakdown’*. https://iol.co.za/lifestyle/food-and-restaurants/2021-09-29-what-happened-to-all-the-peppermint-crisp-bars-nestl-apologises-for-chocolate-shortage-after-factory-breakdown/
4. *Wslm. Nestle Kit Kat products manufactured in South Africa ...*. https://x.com/SANHA_Halaal/status/1551875626516234241
5. *Frequently Asked Questions - South African National Halaal Authority*. https://sanha.org.za/frequently-asked-questions/
6. *Nestle | Shop Nestle Products  | Dis-Chem*. https://www.dischem.co.za/shop-by-department/brands/brands-n/nestle?srsltid=AfmBOopfrxRPDbRjBCJIKS3ZZNzdmBfDWJzJ58QY3921EnoWEmAb4do_
7. *Get to know our ESAR Dairy products | Nestlé ESAR*. https://www.nestle-esar.com/dairy
8. *Nestle launches 2026 Easter range alongside new Polos*. https://www.confectionerynews.com/Article/2026/02/18/nestle-launches-2026-easter-range-alongside-new-polos/
9. *Nestle's Good Bye to Chocolate Log | Nestle ESAR*. https://www.nestle-esar.com/press/nestl%C3%A9-bar%C2%B7one-quality-street-peppermint-crisp-here-stay-while-we-say-goodbye
10. *Checkers Sixty60 | Nestlé Cremora Coffee and Tea Creamer 125g*. https://www.checkers.co.za/product/nestle-cremora-coffee-and-tea-creamer-125g-5ff7278398a16f86212c613a?srsltid=AfmBOoo_6xwHuDgjDKTpW2-I9gx7PX1_iTi1xx52aAJHjctM0JiTuQmq
11. *MAGGI 2 Minute Beef Noodles Pack of 5 x 68g | Instant Noodles | Richer and Bolder Taste Noodles | Multipack Noodles : Amazon.co.za*. https://www.amazon.co.za/Minute-Noodles-Instant-Richer-Multipack/dp/B0DXPCC2T3
12. *Coffee Wholesale & Hot Beverage Solutions | Nestlé Professional*. https://www.nestleprofessional.co.za/za/coffee-beverages/hot-beverages-coffee-solutions
13. *Nestle Nespray Fortigrow | Nestle ESAR*. https://www.nestle-esar.com/brands/dairy/nespray
14. *Powdered Drink for Growing Children | Nido ZA*. https://www.nidokids.co.za/
15. *Fetched web page*. https://www.nestle-cereals.com/global/cereals/cheerios
16. *Nestlé Milo Energy Cereal 450 g | Woolworths.co.za*. https://www.woolworths.co.za/prod/_/A-6009188000752?srsltid=AfmBOoo6jjCLEgVGyy2SmrKejSY4jLyg4Y97TtPUUEPa7vX8kyPsgRTf
17. *
		Baby formula & Food | Nestle | Clicks*. https://clicks.co.za/brands/nestle-baby?srsltid=AfmBOorkQ3qCUQ-M0TtZ9lHjBWpjLgJlUkpP125GPWaM4a0-Ejk0wR3V
18. *NAN Baby Food & Formula Price  | Dis-Chem*. https://www.dischem.co.za/shop-by-department/brands/brands-n/nan?srsltid=AfmBOoqiodafHIlwh0G_9eLM5io6nU4j7PJJRWzhFAeLJUEL2N2nfKsT
19. *Baby Formula | Shop Newborn Formula Online*. https://www.dischem.co.za/shop-by-department/baby-child/formula?srsltid=AfmBOoovfu834tsBBfFv-4odcOd3k2QNCe8h8aKWW0zQffUgiYgBo2R6
20. *Nutren | Nestlé Health Science South Africa*. https://www.nestlehealthscience.co.za/brands/nutren
21. *Resource | Nestlé Health Science South Africa*. https://www.nestlehealthscience.co.za/brands/resource
22. *Nestlé Professional Products & Solutions | Nestlé Professional*. https://www.nestleprofessional.co.za/za/nestle-professional-products
23. *Maggi Professional | Nestlé Professional South Africa*. https://www.nestleprofessional.co.za/za/brands/maggi
24. *Ricoffy Coffee Products & Solutions | Nestlé Professional*. https://www.nestleprofessional.co.za/za/brands/nescafe-ricoffy