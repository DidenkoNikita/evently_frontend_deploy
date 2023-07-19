
export const cityList = async () => {
  const url: string = 'http://api.geonames.org/searchJSON?country=RU&lang=en&username=nikita_didenko';
  try {
    const response: Response =  await fetch(url);
    const data = await response.json();
    const cities = data.geonames.map((city: any) => ({ name: city.name }));
    return cities;
  } catch(e) {
    console.log(e);
    return [];
  }
}