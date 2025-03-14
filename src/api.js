const API_URL = "http://127.0.0.1:8000/api/";

export const fetchGenes = async () => {
    const response = await fetch(`${API_URL}genes/`);
    const data = await response.json();
    return data;
};

export const fetchMorphs = async () => {
    const response = await fetch(`${API_URL}morphs/`);
    const data = await response.json();
    return data;
};

export const fetchComboMorphs = async () => {
    const response = await fetch(`${API_URL}combo-morphs/`);
    const data = await response.json();
    return data;
};
