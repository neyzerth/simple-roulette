export const parseTextToList = (text: string): string[] => {
    return text
        .split(/[\n,]+/)
        .map(item => item.trim())
        .filter(Boolean);
};