export const cityList = async () => {
  const url: string | undefined = process.env.CITY_URL;
  try {
    const response: Response =  await fetch(String(url));
    const data = await response.json();
    const cities = data.geonames.map((city: any) => ({ name: city.name }));
    return cities;
  } catch(e) {
    return [];
  }
}