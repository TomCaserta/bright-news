import Sentiment = require('sentiment');

// For now lets just do english.
const analyzer = new Sentiment();

export function getPositivity(
    content: string
) {
    const results = analyzer.analyze(content);
    return results.comparative;    
}