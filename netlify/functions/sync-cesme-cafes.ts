import type { Context, Config } from "@netlify/functions";

const SUPABASE_URL = "https://bztigwfnenwosulhxrxo.supabase.co";
const SUPABASE_KEY = "sb_publishable_P76ca2ta_N7PWpA_Wm6lTw__DEzK19l";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

async function placesTextSearch(query: string, pageToken?: string) {
  const key = Netlify.env.get("GOOGLE_MAPS_API_KEY") || process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("GOOGLE_MAPS_API_KEY Netlify ortam değişkeni eksik");

  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  url.searchParams.set("query", query);
  url.searchParams.set("language", "tr");
  url.searchParams.set("region", "tr");
  url.searchParams.set("key", key);
  if (pageToken) url.searchParams.set("pagetoken", pageToken);

  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || (data.status && !["OK", "ZERO_RESULTS"].includes(data.status))) {
    throw new Error(data.error_message || data.status || "Google Places hatası");
  }
  return data;
}

async function upsertPlace(place: any) {
  const loc = place.geometry?.location;
  if (!place.place_id || !loc?.lat || !loc?.lng) return null;

  const area = String(place.formatted_address || "")
    .split(",")
    .map((x) => x.trim())
    .find((x) => x && !x.includes("Türkiye") && !x.includes("İzmir")) || "Çeşme";

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/upsert_google_venue_v1`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      p_google_place_id: place.place_id,
      p_name: place.name,
      p_address: place.formatted_address || "",
      p_area: area,
      p_category: "Kafe",
      p_lat: loc.lat,
      p_lng: loc.lng,
      p_city: "cesme",
    }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Supabase upsert olmadı");
  return text ? JSON.parse(text) : null;
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") return json({ error: "POST kullan" }, 405);

  try {
    const queries = [
      "cafes in Çeşme İzmir",
      "kafe Çeşme İzmir",
      "coffee shop Çeşme İzmir",
      "Ilıca kafe Çeşme",
      "Alaçatı kafe Çeşme",
      "Şifne kafe Çeşme",
      "Dalyan kafe Çeşme",
      "Ildır kafe Çeşme",
    ];

    const seen = new Set<string>();
    let imported = 0;
    const results: any[] = [];

    for (const query of queries) {
      let pageToken: string | undefined;
      for (let page = 0; page < 3; page++) {
        if (pageToken) await new Promise((r) => setTimeout(r, 2200));
        const data = await placesTextSearch(query, pageToken);
        for (const place of data.results || []) {
          if (!place.place_id || seen.has(place.place_id)) continue;
          seen.add(place.place_id);
          const types = place.types || [];
          const isCafe = types.includes("cafe") || /cafe|kafe|coffee|kahve/i.test(place.name || "");
          const inCesme = /çeşme|cesme|alaçatı|alacati|ılıca|ilica|şifne|sifne|dalyan|ıldır|ildir/i.test(place.formatted_address || "");
          if (!isCafe || !inCesme) continue;
          const saved = await upsertPlace(place);
          imported++;
          results.push({ name: place.name, address: place.formatted_address, saved });
        }
        pageToken = data.next_page_token;
        if (!pageToken) break;
      }
    }

    return json({ ok: true, imported, scanned: seen.size, results });
  } catch (err: any) {
    return json({ ok: false, error: err.message || String(err) }, 500);
  }
};

export const config: Config = {
  path: "/api/sync-cesme-cafes",
  method: ["POST"],
};
