import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiKey = process.env.SHELTERLUV_API_KEY;
  const shelterId = process.env.SHELTERLUV_SHELTER_ID;

  try {
    const response = await fetch(
      `https://api.shelterluv.com/v1/animals?species=guinea pig&status=adoptable`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const data = await response.json();
    const animals = data.animals;
    const randomAnimals = animals.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.status(200).json(randomAnimals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch animals' });
  }
}
