import type {Company, SustainabilityIndicator} from "./DBItems";

const BASE_URL = "http://127.0.0.1:8000"; // Base URL of FastAPI, should be changed in production
const COMPANY_NAME = "company_name";
const INDICATOR_NAME = "indicator_name";
const DATE_RANGE = "date_range";
const SYNONYM_NAME = "synonym_name";
const MAX_SENTIMENT = "max_sentiment";

async function fetchWithSearchParams(endpoint: string, params: Record<string, string>): Promise<any> {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value));
    const requestOptions: RequestInit = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.detail);
    return json;
}

export async function fetchCompanies() {
    const result = await fetchWithSearchParams("companies", {});
    return result.map((company: Company) => company.name);
}

export async function fetchIndicators() {
    const result = await fetchWithSearchParams("sustainability_indicators", {});
    return result.map((indicator: SustainabilityIndicator) => indicator.name);
}

export async function fetchIndicatorStats(companyName: string, dateRange: string, maxSentiment: number, indicatorName: string = "") {
    return fetchWithSearchParams("indicator_stats", {
        [COMPANY_NAME]: companyName,
        [INDICATOR_NAME]: indicatorName,
        [DATE_RANGE]: dateRange,
        [MAX_SENTIMENT]: maxSentiment.toString()
    });
}

export async function doNewsExist(companyName: string, dateRange: string, indicatorName: string, maxSentiment: number) {
    return fetchWithSearchParams("do_news_exist", {
        [COMPANY_NAME]: companyName,
        [DATE_RANGE]: dateRange,
        [INDICATOR_NAME]: indicatorName,
        [MAX_SENTIMENT]: maxSentiment.toString()
    });
}

export async function fetchLowestSentimentNewsItemOfCompany(companyName: string, selectedIndicator: string, dateRange: string) {
    return fetchWithSearchParams("news_minimum", {
        [COMPANY_NAME]: companyName,
        [INDICATOR_NAME]: selectedIndicator,
        [DATE_RANGE]: dateRange
    });
}

export async function fetchNewsOfIndicator(companyName: string, indicatorName: string, dateRange: string, maxSentiment: number) {
    return fetchWithSearchParams("news", {
        [COMPANY_NAME]: companyName,
        [INDICATOR_NAME]: indicatorName,
        [DATE_RANGE]: dateRange,
        [MAX_SENTIMENT]: maxSentiment.toString()
    });
}

export async function fetchNewsOfEachIndicator(companyName: string, dateRange: string, maxSentiment: number) {
    let indicators = await fetchIndicators();

    const newsByIndicator = {};

    await Promise.all(indicators.map(async (indicator: string) => {
        try {
            const response = await fetchNewsOfIndicator(companyName, indicator, dateRange, maxSentiment);
            if (response.length > 0) newsByIndicator[indicator] = response;
        } catch (error) {
            if (!(error.message && error.message === "Zu diesen Kriterien konnte kein Ergebnis gefunden werden.")) {
                throw error;
            }
        }
    }));

    return Object.keys(newsByIndicator)
        .sort((a, b) => a.localeCompare(b))
        .reduce((sortedObj, indicator) => {
            sortedObj[indicator] = newsByIndicator[indicator];
            return sortedObj;
        }, {});
}

export async function saveCompany(companyName: string) {
    const url = new URL(`${BASE_URL}/companies`);
    url.searchParams.append(COMPANY_NAME, companyName);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.detail);
}

export async function saveSynonym(companyName: string, synonymName: string) {
    const url = new URL(`${BASE_URL}/synonyms`);
    url.searchParams.append(COMPANY_NAME, companyName);
    url.searchParams.append(SYNONYM_NAME, synonymName);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.detail);
}

export async function deleteCompany(companyName: string) {
    const url = new URL(`${BASE_URL}/companies`);
    url.searchParams.append(COMPANY_NAME, companyName);
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.detail);
}

export async function deleteSynonym(companyName: string, synonymName: string) {
    const url = new URL(`${BASE_URL}/synonyms`);
    url.searchParams.append(COMPANY_NAME, companyName);
    url.searchParams.append(SYNONYM_NAME, synonymName);
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.detail);
}