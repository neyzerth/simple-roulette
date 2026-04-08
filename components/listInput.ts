export const parseTextToList = (text: string): string[] => {
    return text
        .split('\n')
        .flatMap(line => line.split(','))
        .map(item => item.trim())
        .filter(item => item.length > 0);
};