export interface Company {
    name: string
}

export interface Synonym {
    company_name: string
    name: string
}

export interface News {
    news_ID: number
    text: string
    title: string
    link: string
    sentiment: number
    date: string
}

export interface SustainabilityIndicator {
    name: string
}

export interface NewsIndicator {
    news_ID: number
    sustainability_indicator_name: string
    probability: number
}

export interface IndicatorStats {
    indicator_name: string
    indicator_min: number
    indicator_avg: number
    indicator_max: number
}