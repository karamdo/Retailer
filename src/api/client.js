const API_BASE_URL = "http://localhost:8000/api";

export function getAuthHeaders(token) {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
}

export async function apiPost(path, body, token = "") {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(body || {}),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        let message = data?.message || "Request failed";
        if (data?.errors && typeof data.errors === "object") {
            const firstKey = Object.keys(data.errors)[0];
            const firstErr = Array.isArray(data.errors[firstKey])
                ? data.errors[firstKey][0]
                : String(data.errors[firstKey]);
            message = firstErr || message;
        }
        throw new Error(message);
    }
    return data;
}

export async function apiPostForm(path, formFields, token = "") {
    const form = new FormData();
    Object.entries(formFields || {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null) form.append(k, v);
    });
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: token
            ? { Authorization: `Bearer ${token}`, Accept: "application/json" }
            : { Accept: "application/json" },
        body: form,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        let message = data?.message || "Request failed";
        if (data?.errors && typeof data.errors === "object") {
            const firstKey = Object.keys(data.errors)[0];
            const firstErr = Array.isArray(data.errors[firstKey])
                ? data.errors[firstKey][0]
                : String(data.errors[firstKey]);
            message = firstErr || message;
        }
        throw new Error(message);
    }
    return data;
}

export async function apiGet(path, token = "") {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: getAuthHeaders(token),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data?.message || "Request failed";
        throw new Error(message);
    }
    return data;
}
