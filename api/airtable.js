import fetch from "node-fetch";

export default async function handler(req, res) {
  const { table, view } = req.query;

  if (!process.env.AIRTABLE_TOKEN || !process.env.BASE_ID) {
    return res.status(500).json({ error: "Variabili ambiente non trovate" });
  }

  const url = `https://api.airtable.com/v0/${process.env.BASE_ID}/${table}?view=${view || "Grid view"}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dati", details: error.message });
  }
}
