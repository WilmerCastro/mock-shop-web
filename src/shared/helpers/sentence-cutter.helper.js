export const sentenceCutterHelper = (sentence, limit) => {
    if (sentence?.length > limit) {
        return sentence.slice(0, limit) + "...";
    } else {
        return sentence;
    }
}
