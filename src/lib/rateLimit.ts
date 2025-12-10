// Client-side rate limiting utility to prevent hitting API limits

interface RateLimitState {
    lastRequestTime: number;
    requestCount: number;
    resetTime: number;
}

const RATE_LIMIT_STORAGE_KEY = "gemini_rate_limit_state";
// Using gemini-2.5-flash-lite which has:
// - 10 RPM (requests per minute) = 1 request per 6 seconds
// - 20 RPD (requests per day)
const MIN_DELAY_BETWEEN_REQUESTS = 6000; // 6 seconds between requests (10 RPM = 1 per 6 seconds)
const DAILY_LIMIT = 18; // Leave some buffer (20 - 2 for safety)

function getRateLimitState(): RateLimitState {
    if (typeof window === "undefined") {
        return {
            lastRequestTime: 0,
            requestCount: 0,
            resetTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        };
    }

    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (stored) {
        const state = JSON.parse(stored);
        // Reset if it's been more than 24 hours
        if (Date.now() > state.resetTime) {
            return {
                lastRequestTime: 0,
                requestCount: 0,
                resetTime: Date.now() + 24 * 60 * 60 * 1000,
            };
        }
        return state;
    }

    return {
        lastRequestTime: 0,
        requestCount: 0,
        resetTime: Date.now() + 24 * 60 * 60 * 1000,
    };
}

function saveRateLimitState(state: RateLimitState): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(state));
    }
}

export function canMakeRequest(): { allowed: boolean; waitTime?: number; reason?: string } {
    const state = getRateLimitState();
    const now = Date.now();

    // Check daily limit
    if (state.requestCount >= DAILY_LIMIT) {
        const waitTime = state.resetTime - now;
        return {
            allowed: false,
            waitTime,
            reason: `Daily limit reached (${DAILY_LIMIT} requests). Please try again later.`,
        };
    }

    // Check minimum delay between requests
    const timeSinceLastRequest = now - state.lastRequestTime;
    if (timeSinceLastRequest < MIN_DELAY_BETWEEN_REQUESTS) {
        const waitTime = MIN_DELAY_BETWEEN_REQUESTS - timeSinceLastRequest;
        return {
            allowed: false,
            waitTime,
            reason: `Please wait ${Math.ceil(waitTime / 1000)} seconds before making another request.`,
        };
    }

    return { allowed: true };
}

export function recordRequest(): void {
    const state = getRateLimitState();
    state.lastRequestTime = Date.now();
    state.requestCount += 1;
    saveRateLimitState(state);
}

export function getRemainingRequests(): number {
    const state = getRateLimitState();
    return Math.max(0, DAILY_LIMIT - state.requestCount);
}

export function getTimeUntilReset(): number {
    const state = getRateLimitState();
    return Math.max(0, state.resetTime - Date.now());
}

