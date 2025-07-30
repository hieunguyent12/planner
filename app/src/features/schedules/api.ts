const BASE_URL = `http://localhost:8080`;

export async function fetchCourseSections(code: string): Promise<any> {
  try {
    const res = await fetch(`${BASE_URL}/soc/searchByCode?code=${code}`);

    if (!res.ok) {
      throw new Error("Failed to fetch course sections");
    }

    return await res.json();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
