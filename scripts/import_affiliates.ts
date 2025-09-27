// import fs from "fs";
// import csv from "csv-parser";
// import { PrismaClient } from "@prisma/client";
// const db = new PrismaClient();

// async function run() {
//   const rows: any[] = [];

//   fs.createReadStream("affiliate_products.csv")
//     .pipe(csv())
//     .on("data", (r) => {
//       // pass decimals as strings; leave empties as null
//       rows.push({
//         aw_deep_link: empty(r.aw_deep_link),
//         product_name: empty(r.product_name),
//         aw_product_id: empty(r.aw_product_id),
//         merchant_product_id: empty(r.merchant_product_id),
//         merchant_image_url: empty(r.merchant_image_url),
//         description: empty(r.description),
//         merchant_category: empty(r.merchant_category),

//         search_price: numOrNull(r.search_price),
//         store_price: numOrNull(r.store_price),
//         delivery_cost: numOrNull(r.delivery_cost),

//         merchant_name: empty(r.merchant_name),
//         merchant_id: empty(r.merchant_id),
//         category_name: empty(r.category_name),
//         category_id: empty(r.category_id),
//         aw_image_url: empty(r.aw_image_url),
//         currency: empty(r.currency),
//         merchant_deep_link: empty(r.merchant_deep_link),

//         last_updated: empty(r.last_updated),
//         display_price: empty(r.display_price),
//         data_feed_id: empty(r.data_feed_id),
//       });
//     })
//     .on("end", async () => {
//       // Insert in batches to avoid oversized payloads
//       const BATCH = 1000;
//       for (let i = 0; i < rows.length; i += BATCH) {
//         const chunk = rows.slice(i, i + BATCH);
//         await db.affiliateProduct.createMany({
//           data: chunk,
//           skipDuplicates: true, // safe if you later add a unique constraint
//         });
//         console.log(
//           `Inserted ${Math.min(i + BATCH, rows.length)} / ${rows.length}`
//         );
//       }
//       await db.$disconnect();
//       console.log("Import complete.");
//     });
// }

// function empty(v: any) {
//   return v === undefined || v === null || String(v).trim() === ""
//     ? null
//     : String(v);
// }
// function numOrNull(v: any) {
//   const s = String(v ?? "").trim();
//   if (s === "") return null;

//   // Remove currency symbols and non-numeric characters (except . and -)
//   const cleaned = s.replace(/[^0-9.-]/g, "");
//   return cleaned === "" ? null : cleaned;
// }
// run().catch(async (e) => {
//   console.error(e);
//   await db.$disconnect();
//   process.exit(1);
// });

import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function run() {
  const rows: any[] = [];

  fs.createReadStream("affiliate_products.csv")
    .pipe(csv({ separator: "," }))
    .on("data", (r) => {
      rows.push({
        aw_deep_link: empty(r.aw_deep_link),
        product_name: empty(r.product_name),
        aw_product_id: empty(r.aw_product_id), // @id
        merchant_product_id: empty(r.merchant_product_id),
        merchant_image_url: empty(r.merchant_image_url),
        description: empty(r.description),
        merchant_category: empty(r.merchant_category),

        search_price: numOrNull(r.search_price),
        merchant_id: empty(r.merchant_id),
        merchant_name: empty(r.merchant_name),
        category_name: empty(r.category_name),
        sub_category: empty(r.sub_category),
        category_id: empty(r.category_id),
        aw_image_url: empty(r.aw_image_url),
        currency: empty(r.currency),
        store_price: numOrNull(r.store_price),
        merchant_deep_link: empty(r.merchant_deep_link),
        language: empty(r.language),
        display_price: empty(r.display_price),
        data_feed_id: empty(r.data_feed_id),
        savings_percent: numOrNull(r.savings_percent),
        saving: numOrNull(r.saving),
        base_price: numOrNull(r.base_price),
        base_price_amount: numOrNull(r.base_price_amount),
        parent_product_id: empty(r.parent_product_id),
        brand_name: empty(r.brand_name),
        colour: empty(r.colour),
        brand_id: empty(r.brand_id),
        product_short_description: empty(r.product_short_description),
        specifications: empty(r.specifications),
        dimensions: empty(r.dimensions),
        product_type: empty(r.product_type),
        product_model: empty(r.product_model),
        model_number: empty(r.model_number),
        commission_group: empty(r.commission_group),
        rrp_price: numOrNull(r.rrp_price),
        base_price_text: empty(r.base_price_text),
        product_price_old: numOrNull(r.product_price_old),
        merchant_thumb_url: empty(r.merchant_thumb_url),
        large_image: empty(r.large_image),
        alternate_image: empty(r.alternate_image),
        aw_thumb_url: empty(r.aw_thumb_url),
        alternate_image_two: empty(r.alternate_image_two),
        alternate_image_three: empty(r.alternate_image_three),
        alternate_image_four: empty(r.alternate_image_four),
        reviews: empty(r.reviews),
        average_rating: numOrNull(r.average_rating),
        rating: numOrNull(r.rating),
        number_available: intOrNull(r.number_available),
        ean: empty(r.ean),
        isbn: empty(r.isbn),
        upc: empty(r.upc),
        mpn: empty(r.mpn),
        product_gtin: empty(r.product_gtin),
        fashion_suitable_for: empty(r.fashion_suitable_for),
        fashion_category: empty(r.fashion_category),
        fashion_size: empty(r.fashion_size),
        fashion_material: empty(r.fashion_material),
        fashion_pattern: empty(r.fashion_pattern),
        fashion_swatch: empty(r.fashion_swatch),

        travel_check_in_date: dateOrNull(r.travel_check_in_date),
        travel_check_in_time: empty(r.travel_check_in_time),
        travel_check_out_date: dateOrNull(r.travel_check_out_date),
        travel_duration: empty(r.travel_duration),
        travel_guests_per_room: intOrNull(r.travel_guests_per_room),
        travel_hotel_name: empty(r.travel_hotel_name),
        travel_hotel_address: empty(r.travel_hotel_address),
        travel_hotel_stars: intOrNull(r.travel_hotel_stars),
        travel_hotel_features: empty(r.travel_hotel_features),
        travel_child_policy: empty(r.travel_child_policy),
        travel_room_type: empty(r.travel_room_type),
        travel_room_description: empty(r.travel_room_description),
        travel_availability: empty(r.travel_availability),
        travel_board_basis: empty(r.travel_board_basis),
        travel_latitude: numOrNull(r.travel_latitude),
        travel_departure_code: empty(r.travel_departure_code),
        travel_arrival_code: empty(r.travel_arrival_code),
        travel_departure_date: dateOrNull(r.travel_departure_date),
        travel_return_date: dateOrNull(r.travel_return_date),
        travel_inbound_duration: empty(r.travel_inbound_duration),
        travel_starting_from_price: numOrNull(r.travel_starting_from_price),
        travel_check_out_time: empty(r.travel_check_out_time),
        travel_ticket_type: empty(r.travel_ticket_type),
        travel_cancellation_policy: empty(r.travel_cancellation_policy),
        travel_room_amenities: empty(r.travel_room_amenities),
        travel_destination_name: empty(r.travel_destination_name),
        travel_destination_address: empty(r.travel_destination_address),
        travel_destination_zipcode: empty(r.travel_destination_zipcode),
        travel_destination_city: empty(r.travel_destination_city),
        travel_destination_region: empty(r.travel_destination_region),
        travel_destination_country: empty(r.travel_destination_country),
        travel_destination_coordinates: empty(r.travel_destination_coordinates),
        travel_destination_type: empty(r.travel_destination_type),
        travel_travel_rating: numOrNull(r.travel_travel_rating),
        travel_travel_transport: empty(r.travel_travel_transport),
        travel_travel_pax_min: intOrNull(r.travel_travel_pax_min),
        travel_travel_pax_max: intOrNull(r.travel_travel_pax_max),
        travel_travel_type: empty(r.travel_travel_type),
        travel_price_per_person: numOrNull(r.travel_price_per_person),

        tickets_primary_artist: empty(r.tickets_primary_artist),
        tickets_second_artist: empty(r.tickets_second_artist),
        tickets_event_date: dateOrNull(r.tickets_event_date),
        tickets_event_name: empty(r.tickets_event_name),
        tickets_venue_name: empty(r.tickets_venue_name),
        tickets_venue_address: empty(r.tickets_venue_address),
        tickets_available_from: dateOrNull(r.tickets_available_from),
        tickets_genre: empty(r.tickets_genre),
        tickets_min_price: numOrNull(r.tickets_min_price),
        tickets_max_price: numOrNull(r.tickets_max_price),
        tickets_event_location_address: empty(r.tickets_event_location_address),
        tickets_longitude: numOrNull(r.tickets_longitude),
        travel_longitude: numOrNull(r.travel_longitude),
        tickets_event_location_region: empty(r.tickets_event_location_region),
        tickets_event_location_coordinates: empty(
          r.tickets_event_location_coordinates
        ),
        tickets_event_location_city: empty(r.tickets_event_location_city),
        tickets_event_location_country: empty(r.tickets_event_location_country),
        tickets_event_duration: empty(r.tickets_event_duration),
        travel_location: empty(r.travel_location),
      });
    })
    .on("end", async () => {
      const BATCH = 1000; // adjust batch size if needed
      for (let i = 0; i < rows.length; i += BATCH) {
        const chunk = rows.slice(i, i + BATCH);
        await db.affiliateProduct.createMany({
          data: chunk,
          skipDuplicates: true,
        });
        console.log(
          `Inserted ${Math.min(i + BATCH, rows.length)} / ${rows.length}`
        );
      }
      await db.$disconnect();
      console.log(`✅ Import complete. Total rows: ${rows.length}`);
    });
}

// Helpers
function empty(v: any) {
  return v === undefined || v === null || String(v).trim() === ""
    ? null
    : String(v);
}
function numOrNull(v: any) {
  const s = String(v ?? "").trim();
  if (s === "") return null;
  const cleaned = s.replace(/[^0-9.-]/g, "");
  return cleaned === "" ? null : parseFloat(cleaned);
}
function intOrNull(v: any) {
  const s = String(v ?? "").trim();
  return s === "" ? null : parseInt(s, 10);
}
function dateOrNull(v: any) {
  const s = String(v ?? "").trim();
  if (s === "") return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

run().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
