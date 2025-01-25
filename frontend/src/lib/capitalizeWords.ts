export const capitalizeWords = (sentence: string | undefined) => {
    if (!sentence) return ""

    var trimmedSentence = sentence!.trim()
    var words = trimmedSentence.split(" ")

    if (words.length === 1) {
        // If it's a single word
        return trimmedSentence.charAt(0).toUpperCase() + trimmedSentence.substring(1).toLowerCase()
    } else {
        // If it's a sentence
        for (var i = 0; i < words.length; i++) {
            var word = words[i]
            words[i] = word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
        }
        return words.join(" ")
    }
}
