import type { Token } from '$types/api';

function marketRank(token: Token) {
    return token.quote?.rank ?? token.rank ?? Number.POSITIVE_INFINITY;
}

export function compareTokensByPopularity(a: Token, b: Token) {
    const aRank = marketRank(a);
    const bRank = marketRank(b);
    return aRank === bRank
        ? a.name.localeCompare(b.name, 'id')
        : aRank - bRank;
}
