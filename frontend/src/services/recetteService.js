const API_URL = "http://localhost:8080/api/recette";

export async function searchRecettes(keyWords = "", tags = []) {
    const params = new URLSearchParams();
    if (keyWords) params.append("keyWords", keyWords);
    tags.forEach(tag => params.append("tags", tag));

    let b = false;

    if (params.size === 0) {
        b = true;
    }

    const response = await fetch(b ? `${API_URL}/all` : `${API_URL}/search?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des recettes");
    }

    return await response.json();
}
