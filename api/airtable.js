export default async function handler(req, res) {
  const { table, view } = req.query;

  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.BASE_ID;

  if (!token || !base) {
    return res.status(500).json({ error: "Variabili ambiente mancanti" });
  }

  const url = `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?view=${view || "Grid view"}`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Errore Airtable: ${response.status} - ${text}`);
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Errore funzione Airtable:", error.message);
    res.status(500).json({ error: error.message });
  }
}
